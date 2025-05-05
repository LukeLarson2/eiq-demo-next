// templates/next/certificate.template.ts
import { getAvalaraCredentials } from "@/vendor/exemption-iq/dist/server/helpers/getAvalaraCredentials";

import { NextRequest, NextResponse } from "next/server";

export function readEnv(name: string): string | undefined {
  if (typeof process !== "undefined" && process.env?.[name]) {
    return process.env[name];
  }

  if (typeof import.meta !== "undefined" && (import.meta as any).env?.[name]) {
    return (import.meta as any).env[name];
  }

  return undefined;
}

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id: certificateId } = context.params;

  if (!certificateId) {
    return new Response("Missing certificate ID", { status: 400 });
  }

  const sessionToken = req.cookies.get("eiq_session_token")?.value;

  if (!sessionToken) {
    return new Response("Missing session token", { status: 401 });
  }

  try {
    const credentials = await getAvalaraCredentials({ token: sessionToken });

    const basicAuth = Buffer.from(
      `${credentials.username}:${credentials.password}`
    ).toString("base64");

    const baseUrl =
      readEnv("AVATAX_API_BASE") || "https://sandbox-rest.avatax.com/api/v2";
    const url = `${baseUrl}/companies/${credentials.companyId}/certificates/${certificateId}/attachment`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "X-Avalara-Client": credentials.clientId,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(errorText, { status: response.status });
    }

    const stream = response.body;
    if (!stream) {
      return new Response("Missing PDF stream", { status: 500 });
    }

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="certificate-${certificateId}.pdf"`,
      },
    });
  } catch (err: any) {
    console.error("Certificate PDF fetch error:", err);
    return new Response("Failed to fetch certificate", { status: 500 });
  }
}
