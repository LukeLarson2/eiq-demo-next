import { NextRequest } from "next/server";
// templates/next/certificate.template.ts
import { getAvalaraCredentials } from "@/vendor/exemption-iq/dist/server/helpers/getAvalaraCredentials";

export async function POST(request: NextRequest) {
  function readEnv(name: string): string | undefined {
    if (typeof process !== "undefined" && process.env?.[name]) {
      return process.env[name];
    }

    if (
      typeof import.meta !== "undefined" &&
      (import.meta as any).env?.[name]
    ) {
      return (import.meta as any).env[name];
    }

    return undefined;
  }
  try {
    const { customerCode, state } = await request.json();

    if (!customerCode || !state) {
      return new Response("Missing customerCode or state", { status: 400 });
    }

    const token = request.cookies.get("eiq_session_token")?.value;
    if (!token) {
      return new Response("Missing session token", { status: 401 });
    }

    const credentials = await getAvalaraCredentials({ token });

    const auth = Buffer.from(
      `${credentials.username}:${credentials.password}`
    ).toString("base64");

    const baseUrl =
      readEnv("AVATAX_API_BASE") || "https://rest.avatax.com/api/v2";

    const url = `${baseUrl}/companies/${credentials.companyId}/customers/${customerCode}?$include=active_certificates`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
        "X-Avalara-Client": credentials.clientId,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Avalara validation failed:", res.status, errorText);
      return new Response("Avalara validation failed", { status: res.status });
    }

    const data = await res.json();
    const certs = data?.activeCertificates || [];

    const validCerts = certs.filter(
      (cert: any) =>
        cert.exposureZone?.name?.toLowerCase() === state.toLowerCase() &&
        cert.certificate?.valid
    );

    return Response.json({
      status: validCerts.length > 0 ? "valid" : "invalid",
      certificates: validCerts,
    });
  } catch (err: any) {
    console.error("❌ Uncaught error in validate route:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Unknown error" }),
      { status: 500 }
    );
  }
}
