// /api/exemption-iq/session/route.ts

import { NextResponse } from "next/server";
import { getSessionToken } from "@/vendor/exemption-iq/dist/server/helpers/getSessionToken";

export function readEnv(name: string): string | undefined {
  if (typeof process !== "undefined" && process.env?.[name]) {
    return process.env[name];
  }

  if (typeof import.meta !== "undefined" && (import.meta as any).env?.[name]) {
    return (import.meta as any).env[name];
  }

  return undefined;
}

export async function GET() {
  const username = readEnv("EIQ_USERNAME");
  const password = readEnv("EIQ_PASSWORD");

  if (!username || !password) {
    return NextResponse.json({
      error: "Failed to get EIQ_USERNAME and/or PASSWORD",
      status: 400,
    });
  }
  const sessionToken = await getSessionToken({ username, password });

  const response = NextResponse.json({ token: sessionToken.token });
  response.headers.set(
    "Set-Cookie",
    `eiq_session_token=${sessionToken.token}; Path=/; Max-Age=3600; HttpOnly; SameSite=Lax`
  );

  return response;
}
