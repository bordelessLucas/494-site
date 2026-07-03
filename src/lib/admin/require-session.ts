import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function getSessionFromCookies(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = await getSessionFromCookies();
  return verifySessionToken(token);
}

export async function requireAdminApiSession(): Promise<NextResponse | null> {
  const token = await getSessionFromCookies();
  const isValid = await verifySessionToken(token);

  if (!isValid) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  return null;
}
