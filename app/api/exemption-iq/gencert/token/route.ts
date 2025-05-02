import { NextRequest } from "next/server";
// templates/next/certificate.template.ts
import { getAvalaraCredentials } from "@/vendor/exemption-iq/dist/server/helpers/getAvalaraCredentials";

export async function POST(request: NextRequest) {
  try {
    const { customerCode, ...customerInfo } = await request.json();

    if (!customerCode) {
      return Response.json(
        { error: "Customer code is required" },
        { status: 400 }
      );
    }

    // 🔐 Get token from cookie
    const token = request.cookies.get("eiq_session_token")?.value;

    if (!token) {
      return Response.json({ error: "Missing session token" }, { status: 401 });
    }

    const credentials = await getAvalaraCredentials({ token });

    const auth = Buffer.from(
      `${credentials.username}:${credentials.password}`
    ).toString("base64");

    const baseUrl =
      typeof process !== "undefined"
        ? process.env.AVATAX_API_BASE
        : "https://sandbox-rest.avatax.com/api/v2";

    const fetchCustomer = async () => {
      const res = await fetch(
        `${baseUrl}/companies/${credentials.companyId}/customers/${customerCode}`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
            "X-Avalara-Client": credentials.clientId,
          },
        }
      );
      return res.status === 404 ? null : await res.json();
    };

    const createCustomer = async () => {
      const payload = {
        companyId: credentials.companyId,
        customerCode,
        name: customerInfo.name,
        emailAddress: customerInfo.emailAddress,
        line1: customerInfo.addressLine1 || "",
        line2: customerInfo.addressLine2 || "",
        city: customerInfo.city || "",
        postalCode: customerInfo.postalCode || "",
        phoneNumber: customerInfo.phoneNumber || "",
        faxNumber: customerInfo.faxNumber || "",
        country: customerInfo.country || "US",
        region: customerInfo.region || "",
      };

      const res = await fetch(
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

      return res.json();
    };

    const customer = (await fetchCustomer()) || (await createCustomer());

    const tokenRes = await fetch(
      `${baseUrl}/companies/${credentials.companyId}/ecommercetokens`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "X-Avalara-Client": credentials.clientId,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerNumber: customerCode,
          ...customerInfo,
        }),
      }
    );

    const { token: ecommerceToken } = await tokenRes.json();
    return Response.json({ token: ecommerceToken, customer });
  } catch (err: any) {
    console.error("Customer token generation error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
