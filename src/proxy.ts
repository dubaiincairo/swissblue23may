import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

const LOGIN_PATH = "/secretpanel/login";

/** Admin areas that require a valid session (login page itself is exempt). */
function needsAuth(pathname: string): boolean {
  if (pathname === LOGIN_PATH) return false;
  return (
    pathname === "/secretpanel" ||
    pathname.startsWith("/secretpanel/") ||
    pathname === "/studio" ||
    pathname.startsWith("/studio/") ||
    pathname.startsWith("/api/site-content")
  );
}

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // --- Admin authentication gate ---
  if (needsAuth(pathname)) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const authed = await verifySessionToken(token);
    if (!authed) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = LOGIN_PATH;
      loginUrl.search = "";
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // --- Locale routing ---
  if (pathname === "/") {
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }

  if (pathname === "/ar") {
    url.pathname = "/";
    return NextResponse.rewrite(url);
  }

  if (pathname.startsWith("/ar/")) {
    url.pathname = pathname.replace(/^\/ar/, "") || "/";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/ar/:path*",
    "/secretpanel",
    "/secretpanel/:path*",
    "/studio",
    "/studio/:path*",
    "/api/site-content",
    "/api/site-content/:path*",
  ],
};
