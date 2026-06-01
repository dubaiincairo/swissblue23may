import { NextResponse } from "next/server";
import { ENV_OWNER_UID } from "@/lib/auth";
import { getFreshAdminSession } from "@/lib/admin-session";
import {
  deleteUser,
  isUserStoreConfigured,
  updateUser,
  type UpdateUserPatch,
} from "@/lib/admin-users";
import { hasAuthority, isAdminRole, sanitizeAuthorities } from "@/lib/authorities";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const MIN_PASSWORD = 10;
const MAX_PASSWORD = 200;

async function requireUsersSession() {
  const session = await getFreshAdminSession();
  if (!session || !hasAuthority(session.perms, "users")) return null;
  return session;
}

function guard(request: Request, id: string) {
  if (id === ENV_OWNER_UID) {
    return NextResponse.json({ error: "The owner account is managed via environment variables." }, { status: 400 });
  }
  if (!isUserStoreConfigured()) {
    return NextResponse.json({ error: "User store is not configured." }, { status: 503 });
  }
  return null;
}

export async function PATCH(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireUsersSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await ctx.params;
  const blocked = guard(request, id);
  if (blocked) return blocked;

  if (!(await rateLimit("admin-users-write", getClientIp(request), 30, 600)).success) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const patch: UpdateUserPatch = {};

  if (typeof body.displayName === "string") patch.displayName = body.displayName.trim();
  if (typeof body.active === "boolean") patch.active = body.active;
  if (body.role !== undefined) {
    if (!isAdminRole(body.role)) return NextResponse.json({ error: "Unknown role." }, { status: 400 });
    patch.role = body.role;
  }
  if (body.authorities !== undefined) {
    patch.authorities = sanitizeAuthorities(body.authorities);
  }
  if (typeof body.password === "string" && body.password.length > 0) {
    if (body.password.length < MIN_PASSWORD || body.password.length > MAX_PASSWORD) {
      return NextResponse.json({ error: `Password must be at least ${MIN_PASSWORD} characters.` }, { status: 400 });
    }
    patch.password = body.password;
  }

  // Don't let an admin strip their OWN user-management authority and lock the
  // page behind them (the env owner is still a backstop, but avoid the foot-gun).
  if (id === session.uid && patch.authorities && !patch.authorities.includes("users")) {
    return NextResponse.json(
      { error: "You can't remove your own user-management authority." },
      { status: 400 },
    );
  }
  if (id === session.uid && patch.active === false) {
    return NextResponse.json({ error: "You can't deactivate your own account." }, { status: 400 });
  }

  try {
    const updated = await updateUser(id, patch);
    if (!updated) return NextResponse.json({ error: "User not found." }, { status: 404 });
    return NextResponse.json({ user: updated });
  } catch (error) {
    console.error("[admin-users] update failed", error);
    return NextResponse.json({ error: "Could not update the user." }, { status: 502 });
  }
}

export async function DELETE(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireUsersSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await ctx.params;
  const blocked = guard(request, id);
  if (blocked) return blocked;

  if (id === session.uid) {
    return NextResponse.json({ error: "You can't delete your own account." }, { status: 400 });
  }

  if (!(await rateLimit("admin-users-write", getClientIp(request), 30, 600)).success) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  try {
    await deleteUser(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin-users] delete failed", error);
    return NextResponse.json({ error: "Could not delete the user." }, { status: 502 });
  }
}
