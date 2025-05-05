import { NextRequest } from "next/server";
// templates/next/certificate.template.ts
import { getAvalaraCredentials } from "@/vendor/exemption-iq/dist/server/helpers/getAvalaraCredentials";

export function readEnv(name: string): string | undefined {
  if (typeof process !== "undefined" && process.env?.[name]) {
    return process.env[name];
  }

  if (typeof import.meta !== "undefined" && (import.meta as any).env?.[name]) {
    return (import.meta as any).env[name];
  }

  return undefined;
}

export async function POST(req: NextRequest) {
  const { customerCode } = await req.json();

  if (!customerCode) {
    return new Response("Missing customer code", { status: 400 });
  }

  // Extract session token from cookie
  const sessionToken = req.cookies.get("eiq_session_token")?.value;

  if (!sessionToken) {
    return new Response("Missing session token", { status: 401 });
  }

  try {
    const credentials = await getAvalaraCredentials({ token: sessionToken });

    const auth = Buffer.from(
      `${credentials.username}:${credentials.password}`
    ).toString("base64");

    const baseUrl =
      readEnv("AVATAX_API_BASE") || "https://sandbox-rest.avatax.com/api/v2";
    const url = `${baseUrl}/companies/${credentials.companyId}/customers/${customerCode}?$include=active_certificates`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
        "X-Avalara-Client": credentials.clientId,
      },
    });

    if (!res.ok) {
      const err = await res.text();
      return new Response(err, { status: res.status });
    }

    const data = await res.json();
    const certs = data.activeCertificates || [];

    const formatted = certs.map((cert: any) => ({
      id: String(cert.id),
      signedDate: new Date(cert.certificate.signedDate).toLocaleDateString(),
      expirationDate: cert.certificate.expirationDate
        ? new Date(cert.certificate.expirationDate).toLocaleDateString()
        : "N/A",
      exposureZone: cert.exposureZone?.name || "Unknown",
      exemptionReason: cert?.actualTaxCode?.name || "",
      status: cert.certificate.valid ? "valid" : "invalid",
      pdfUrl: `/api/exemption-iq/certificate/${cert.id}`,
    }));

    return Response.json(formatted);
  } catch (error: any) {
    console.error("Certificate fetch failed:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
