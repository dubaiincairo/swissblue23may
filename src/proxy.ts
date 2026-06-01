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

  // --- Locale routing + tagging ---
  // The Arabic site is the root tree (also reachable at /ar/*); English lives under /en.
  // Tag every page request with `x-locale` so the shared root layout can emit the correct
  // <html lang/dir> during SSR (important for accessibility and SEO). Admin/api keep the
  // English default (their UI is LTR) to avoid any change to existing behavior.
  if (pathname === "/") {
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }

  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const isAdmin =
    pathname.startsWith("/secretpanel") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/api");
  const locale = isEnglish || isAdmin ? "en" : "ar";
  const localeHeaders = new Headers(request.headers);
  localeHeaders.set("x-locale", locale);

  if (pathname === "/ar") {
    url.pathname = "/";
    return NextResponse.rewrite(url, { request: { headers: localeHeaders } });
  }

  if (pathname.startsWith("/ar/")) {
    url.pathname = pathname.replace(/^\/ar/, "") || "/";
    return NextResponse.rewrite(url, { request: { headers: localeHeaders } });
  }

  return NextResponse.next({ request: { headers: localeHeaders } });
}

export const config = {
  matcher: [
    // All page routes (Arabic root tree + /en) so the layout can tag <html lang/dir>.
    // Excludes Next internals, static files, and /api (API auth handled by the entries below).
    "/((?!api/|_next/|.*\\..*).*)",
    // Admin + content API authentication (unchanged).
    "/secretpanel",
    "/secretpanel/:path*",
    "/studio",
    "/studio/:path*",
    "/api/site-content",
    "/api/site-content/:path*",
  ],
};
