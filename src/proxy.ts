import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, readSession, type SessionInfo } from "@/lib/auth";
import {
  firstAllowedPath,
  hasAnyContentAuthority,
  hasAuthority,
  type AuthorityId,
} from "@/lib/authorities";

const LOGIN_PATH = "/admin/login";

// Public admin pages reachable without a session: login + the password-recovery flow.
const PUBLIC_ADMIN_PATHS = new Set([LOGIN_PATH, "/admin/forgot", "/admin/reset"]);

/** Admin areas that require a valid session (login + recovery pages are exempt). */
function needsAuth(pathname: string): boolean {
  if (PUBLIC_ADMIN_PATHS.has(pathname)) return false;
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/studio" ||
    pathname.startsWith("/studio/") ||
    pathname.startsWith("/api/site-content") ||
    pathname.startsWith("/api/admin/")
  );
}

/**
 * Authority a path requires. Order matters: the specific /admin/* areas
 * are matched before the generic English-content fallback. "content-any" means
 * any content authority (the content API writes the whole {ar,en} tree).
 */
function requiredAuthority(pathname: string): AuthorityId | "content-any" | null {
  if (pathname === "/admin/users" || pathname.startsWith("/admin/users/")) return "users";
  if (pathname.startsWith("/api/admin/users")) return "users";
  if (pathname === "/admin/overview" || pathname.startsWith("/admin/overview/")) return "analytics";
  if (pathname.startsWith("/api/admin/overview")) return "analytics";
  if (pathname.startsWith("/api/admin/chat-knowledge")) return "content-any";
  if (pathname === "/admin/reservation-layouts" || pathname.startsWith("/admin/reservation-layouts/")) return "content-any";
  if (pathname === "/admin/submissions" || pathname.startsWith("/admin/submissions/")) return "submissions";
  if (pathname === "/studio" || pathname.startsWith("/studio/")) return "studio";
  if (pathname.startsWith("/api/site-content")) return "content-any";
  if (pathname === "/admin/ar" || pathname.startsWith("/admin/ar/")) return "content.ar";
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return "content.en";
  return null;
}

function authorized(session: SessionInfo, required: AuthorityId | "content-any"): boolean {
  return required === "content-any"
    ? hasAnyContentAuthority(session.perms)
    : hasAuthority(session.perms, required);
}

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // /admin is the canonical CMS address. Preserve old deep links while moving
  // users onto the new route before doing any auth decisions.
  if (pathname === "/secretpanel" || pathname.startsWith("/secretpanel/")) {
    url.pathname = pathname.replace(/^\/secretpanel(?=\/|$)/, "/admin");
    const legacyFrom = url.searchParams.get("from");
    if (legacyFrom === "/secretpanel" || legacyFrom?.startsWith("/secretpanel/")) {
      url.searchParams.set("from", legacyFrom.replace(/^\/secretpanel(?=\/|$)/, "/admin"));
    }
    return NextResponse.redirect(url, 308);
  }

  // --- Admin authentication + authorization gate ---
  if (needsAuth(pathname)) {
    const isApi = pathname.startsWith("/api/");
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const session = await readSession(token);

    if (!session) {
      if (isApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = LOGIN_PATH;
      loginUrl.search = "";
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const required = requiredAuthority(pathname);
    if (required && !authorized(session, required)) {
      if (isApi) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      // Authenticated but unauthorized: send them somewhere they CAN go.
      const dest = firstAllowedPath(session.perms);
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.search = "";
      if (dest && dest !== pathname) {
        redirectUrl.pathname = dest;
      } else {
        redirectUrl.pathname = LOGIN_PATH;
        redirectUrl.searchParams.set("denied", "1");
      }
      return NextResponse.redirect(redirectUrl);
    }
  }

  // --- Locale routing + tagging ---
  // The Arabic site is the root tree (also reachable at /ar/*); English lives under /en.
  // Tag every page request with `x-locale` so the shared root layout can emit the correct
  // <html lang/dir> during SSR (important for accessibility and SEO). Admin/api keep the
  // English default (their UI is LTR) to avoid any change to existing behavior.
  const isArabicHomeRewrite = pathname === "/" && url.searchParams.get("__sb_locale") === "ar";
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const isAdmin =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/api");
  const publicPathname =
    isArabicHomeRewrite || pathname === "/ar"
      ? "/"
      : pathname.startsWith("/ar/")
        ? pathname.replace(/^\/ar/, "") || "/"
        : pathname;
  const locale = isArabicHomeRewrite || (!isEnglish && !isAdmin) ? "ar" : "en";
  const localeHeaders = new Headers(request.headers);
  localeHeaders.set("x-locale", locale);
  // Tag the page path so the root layout can emit per-page SEO metadata.
  localeHeaders.set("x-pathname", publicPathname);

  // Let the /ar compatibility rewrite render the Arabic root without falling
  // through to the public English-root redirect below.
  if (pathname === "/" && isArabicHomeRewrite) {
    return NextResponse.next({ request: { headers: localeHeaders } });
  }

  if (pathname === "/ar") {
    url.pathname = "/";
    url.searchParams.set("__sb_locale", "ar");
    return NextResponse.rewrite(url, { request: { headers: localeHeaders } });
  }

  if (pathname.startsWith("/ar/")) {
    url.pathname = publicPathname;
    return NextResponse.rewrite(url, { request: { headers: localeHeaders } });
  }

  if (pathname === "/" && !isArabicHomeRewrite) {
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }

  return NextResponse.next({ request: { headers: localeHeaders } });
}

export const config = {
  matcher: [
    // All page routes (Arabic root tree + /en) so the layout can tag <html lang/dir>.
    // Excludes Next internals, static files, and /api (API auth handled by the entries below).
    "/((?!api/|_next/|.*\\..*).*)",
    // Canonical admin + legacy redirect handling, plus content API authentication.
    "/admin",
    "/admin/:path*",
    "/secretpanel",
    "/secretpanel/:path*",
    "/studio",
    "/studio/:path*",
    "/api/site-content",
    "/api/site-content/:path*",
    "/api/admin/:path*",
  ],
};
