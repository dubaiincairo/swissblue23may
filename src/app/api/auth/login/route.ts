import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  isAuthConfigured,
  verifyCredentials,
} from "@/lib/auth";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const TOO_MANY = { error: "Too many attempts. Please try again later." };

export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return NextResponse.json(
      { error: "Admin login is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET." },
      { status: 503 },
    );
  }

  // Throttle brute-force / credential-stuffing by source IP before any work.
  const ip = getClientIp(request);
  if (!(await rateLimit("login-ip", ip, 10, 600)).success) {
    console.warn(`[auth] login rate-limited for ip=${ip}`);
    return NextResponse.json(TOO_MANY, { status: 429 });
  }

  let body: { username?: unknown; password?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username : "";
  const password = typeof body.password === "string" ? body.password : "";

  // Also throttle per-username so one account can't be hammered from many IPs.
  const userKey = username.toLowerCase().slice(0, 64) || "blank";
  if (!(await rateLimit("login-user", userKey, 5, 600)).success) {
    console.warn(`[auth] login rate-limited for user=${userKey}`);
    return NextResponse.json(TOO_MANY, { status: 429 });
  }

  if (!verifyCredentials(username, password)) {
    console.warn(`[auth] failed login attempt ip=${ip} user=${userKey}`);
    return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 });
  }

  const token = await createSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
