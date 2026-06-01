import { NextResponse } from "next/server";
import { ENV_OWNER_UID, getAdminUsername, ownerPerms } from "@/lib/auth";
import { getFreshAdminSession } from "@/lib/admin-session";
import {
  UserExistsError,
  createUser,
  isUserStoreConfigured,
  listUsers,
  type AdminUserView,
} from "@/lib/admin-users";
import { hasAuthority, isAdminRole, sanitizeAuthorities } from "@/lib/authorities";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const USERNAME_RE = /^[a-zA-Z0-9._-]{3,64}$/;
const MIN_PASSWORD = 10;
const MAX_PASSWORD = 200;

/** Require a fresh session that still holds the `users` authority, or null. */
async function requireUsersSession() {
  const session = await getFreshAdminSession();
  if (!session || !hasAuthority(session.perms, "users")) return null;
  return session;
}

/** Synthetic, read-only row representing the permanent env owner. */
function envOwnerRow(): AdminUserView & { editable: false } {
  return {
    id: ENV_OWNER_UID,
    username: getAdminUsername(),
    displayName: "Owner (environment account)",
    role: "owner",
    authorities: ownerPerms() as AdminUserView["authorities"],
    active: true,
    tokenVersion: 0,
    createdAt: "",
    isEnvOwner: true,
    editable: false,
  };
}

export async function GET() {
  const session = await requireUsersSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const users = isUserStoreConfigured() ? await listUsers() : [];
  return NextResponse.json(
    {
      configured: isUserStoreConfigured(),
      currentUid: session.uid,
      ownerUsername: getAdminUsername(),
      users: [envOwnerRow(), ...users],
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const session = await requireUsersSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  if (!isUserStoreConfigured()) {
    return NextResponse.json(
      { error: "User store is not configured. Set SANITY_API_WRITE_TOKEN and ADMIN_SESSION_SECRET." },
      { status: 503 },
    );
  }

  if (!(await rateLimit("admin-users-write", getClientIp(request), 30, 600)).success) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const displayName = typeof body.displayName === "string" ? body.displayName.trim() : "";
  const role = body.role;
  const active = typeof body.active === "boolean" ? body.active : true;

  if (!USERNAME_RE.test(username)) {
    return NextResponse.json(
      { error: "Username must be 3–64 characters: letters, numbers, dot, dash, or underscore." },
      { status: 400 },
    );
  }
  if (username.toLowerCase() === getAdminUsername().toLowerCase()) {
    return NextResponse.json({ error: "That username is reserved for the owner account." }, { status: 409 });
  }
  if (password.length < MIN_PASSWORD || password.length > MAX_PASSWORD) {
    return NextResponse.json({ error: `Password must be at least ${MIN_PASSWORD} characters.` }, { status: 400 });
  }
  if (!isAdminRole(role)) {
    return NextResponse.json({ error: "Unknown role." }, { status: 400 });
  }

  try {
    const created = await createUser({
      username,
      displayName,
      password,
      role,
      authorities: sanitizeAuthorities(body.authorities),
      active,
      createdBy: session.uid,
    });
    return NextResponse.json({ user: created }, { status: 201 });
  } catch (error) {
    if (error instanceof UserExistsError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    console.error("[admin-users] create failed", error);
    return NextResponse.json({ error: "Could not create the user." }, { status: 502 });
  }
}
