// app/api/exemption-iq/certificate/[id]/route.ts

import type { NextRequest } from "next/server";
import { getAvalaraCredentials } from "@/vendor/exemption-iq/dist/server/helpers/getAvalaraCredentials";

// Ensure Node.js runtime for Buffer and Node APIs
export const runtime = "nodejs";

const AVATAX_DEFAULT_BASE = "https://rest.avatax.com/api/v2";

function readEnv(name: string): string | undefined {
  if (typeof process !== "undefined" && process.env?.[name]) {
    return process.env[name];
  }
  return undefined;
}

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/exemption-iq/certificate/[id]">
) {
  const { id: certificateId } = await ctx.params;

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

    const baseUrl = readEnv("AVATAX_API_BASE") || AVATAX_DEFAULT_BASE;
    const url = `${baseUrl}/companies/${credentials.companyId}/certificates/${certificateId}/attachment`;

    const upstream = await fetch(url, {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "X-Avalara-Client": credentials.clientId,
      },
    });

    if (!upstream.ok) {
      const errorText = await upstream.text();
      return new Response(errorText || "Upstream error", {
        status: upstream.status,
      });
    }

    const body = upstream.body;
    if (!body) {
      return new Response("Missing PDF stream", { status: 500 });
    }

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="certificate-${certificateId}.pdf"`,
      },
    });
  } catch (err) {
    console.error("Certificate PDF fetch error:", err);
    return new Response("Failed to fetch certificate", { status: 500 });
  }
}
