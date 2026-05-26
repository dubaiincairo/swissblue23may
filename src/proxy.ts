import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (url.pathname === "/") {
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }

  if (url.pathname === "/ar") {
    url.pathname = "/";
    return NextResponse.rewrite(url);
  }

  if (url.pathname.startsWith("/ar/")) {
    url.pathname = url.pathname.replace(/^\/ar/, "") || "/";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/ar/:path*"],
};
