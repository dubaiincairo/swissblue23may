import { NextResponse, after } from "next/server";
import {
  ENV_OWNER_UID,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  getAdminUsername,
  isAuthConfigured,
  ownerPerms,
  verifyCredentials,
} from "@/lib/auth";
import { verifyOwnerOverride } from "@/lib/admin-owner";
import { getUserByUsername, recordLogin } from "@/lib/admin-users";
import { verifyPassword } from "@/lib/admin-crypto";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const TOO_MANY = { error: "Too many attempts. Please try again later." };
const BAD_CREDS = { error: "Incorrect username or password." };

function setSessionCookie(token: string) {
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

  // 1) Permanent env owner — works with no datastore, full authorities.
  if (verifyCredentials(username, password)) {
    return setSessionCookie(
      await createSessionToken({ uid: ENV_OWNER_UID, role: "owner", perms: ownerPerms(), tv: 0 }),
    );
  }

  // 1b) Owner override — an extra owner password set via the forgot-password
  // reset flow (the env password can't be rewritten by the app, so a reset adds
  // an alternate one here). Same full-owner authorities.
  if (username === getAdminUsername() && (await verifyOwnerOverride(password))) {
    return setSessionCookie(
      await createSessionToken({ uid: ENV_OWNER_UID, role: "owner", perms: ownerPerms(), tv: 0 }),
    );
  }

  // 2) Managed user — look up, verify password, must be active.
  const stored = await getUserByUsername(username).catch(() => null);
  if (stored && stored.secret.active) {
    const ok = await verifyPassword(password, {
      hash: stored.secret.passwordHash,
      salt: stored.secret.passwordSalt,
      iterations: stored.secret.iterations,
    });
    if (ok) {
      const token = await createSessionToken({
        uid: stored.userKey,
        role: stored.secret.role,
        perms: stored.secret.authorities,
        tv: stored.secret.tokenVersion || 1,
      });
      const response = setSessionCookie(token);
      after(() => recordLogin(stored.userKey));
      return response;
    }
  }

  console.warn(`[auth] failed login attempt ip=${ip} user=${userKey}`);
  return NextResponse.json(BAD_CREDS, { status: 401 });
}
