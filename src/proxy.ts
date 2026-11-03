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
  if (
    process.env.NODE_ENV === "development" &&
    pathname === "/admin/loyalty-layouts"
  ) {
    return false;
  }
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
  if (pathname === "/admin/loyalty-layouts" || pathname.startsWith("/admin/loyalty-layouts/")) return "content-any";
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

  return NextResponse.next();
}

export const config = {
  // Only session-gated surfaces run the proxy. Public pages are served from the
  // cache without it: locale/direction come from the (ar)/(en) route groups and
  // the "/" -> "/en" redirect and legacy "/ar/*" rewrites live in next.config.ts.
  matcher: [
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
