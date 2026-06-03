import { NextResponse } from "next/server";
import { readResetToken } from "@/lib/auth";
import { getOwnerResetVersion, isOwnerResetConfigured, setOwnerOverride } from "@/lib/admin-owner";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!(await rateLimit("reset-ip", ip, 10, 900)).success) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }

  if (!isOwnerResetConfigured()) {
    return NextResponse.json({ error: "Password reset is not configured." }, { status: 503 });
  }

  let body: { token?: unknown; password?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const token = typeof body.token === "string" ? body.token : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  const parsed = await readResetToken(token);
  if (!parsed) {
    return NextResponse.json(
      { error: "This reset link is invalid or has expired. Request a new one." },
      { status: 400 },
    );
  }

  // Single-use: the token was minted against a reset version; a prior successful
  // reset bumps it, so a replayed link no longer matches.
  const current = await getOwnerResetVersion();
  if (parsed.rv !== current) {
    return NextResponse.json(
      { error: "This reset link has already been used. Request a new one." },
      { status: 400 },
    );
  }

  try {
    await setOwnerOverride(password);
  } catch (error) {
    console.error("[auth] reset-password failed", error);
    return NextResponse.json({ error: "Could not reset the password. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
