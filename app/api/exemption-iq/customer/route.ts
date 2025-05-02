import { NextRequest } from "next/server";
// templates/next/certificate.template.ts
import { getAvalaraCredentials } from "@/vendor/exemption-iq/dist/server/helpers/getAvalaraCredentials";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { customerCode, customerInfo } = body;

  if (!customerCode) {
    return new Response("Missing customerCode", { status: 400 });
  }

  // 🔑 Extract session token from cookies
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
      typeof process !== "undefined"
        ? process.env.AVATAX_API_BASE
        : "https://sandbox-rest.avatax.com/api/v2";

    // Try to fetch the customer first
    const getRes = await fetch(
      `${baseUrl}/companies/${credentials.companyId}/customers/${customerCode}`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "X-Avalara-Client": credentials.clientId,
        },
      }
    );

    if (getRes.ok) {
      const existing = await getRes.json();
      return Response.json(existing);
    }

    // Create customer if not found
    const payload = {
      companyId: credentials.companyId,
      customerCode,
      ...customerInfo,
    };

    const createRes = await fetch(
      `${baseUrl}/companies/${credentials.companyId}/customers`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "X-Avalara-Client": credentials.clientId,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!createRes.ok) {
      const err = await createRes.text();
      return new Response(`Create failed: ${err}`, { status: 500 });
    }

    const newCustomer = await createRes.json();
    return Response.json(newCustomer);
  } catch (err: any) {
    console.error("Create/fetch customer error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}
