import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const isAuthenticated = await verifySessionToken(session);

  if (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth")) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/demos", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
