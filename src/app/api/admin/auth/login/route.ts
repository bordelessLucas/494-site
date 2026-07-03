import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createSessionToken,
  getAdminPassword,
} from "@/lib/admin/session";
import { adminLoginSchema } from "@/lib/validation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = adminLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Informe a senha de acesso" },
        { status: 400 },
      );
    }

    const expectedPassword = getAdminPassword();
    if (parsed.data.password !== expectedPassword) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    const token = await createSessionToken();
    const response = NextResponse.json({ success: true });

    response.cookies.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ADMIN_SESSION_MAX_AGE,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Erro ao autenticar" },
      { status: 500 },
    );
  }
}
