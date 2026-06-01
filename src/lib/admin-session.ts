/**
 * Server-only session helpers for admin pages and admin API routes.
 *
 * Kept separate from auth.ts (which the edge proxy imports) because this module
 * pulls in next/headers + next/navigation + the Sanity-backed user store, none
 * of which belong in the edge bundle.
 *
 * `getFreshAdminSession` upgrades the token's embedded authorities to the LIVE
 * stored ones for managed users (and rejects deactivated / superseded sessions),
 * so authority edits and deactivations take effect on the next request — without
 * waiting for the token to expire.
 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, ENV_OWNER_UID, readSession, ownerPerms, type SessionInfo } from "@/lib/auth";
import { getUserByKey } from "@/lib/admin-users";
import { firstAllowedPath, hasAnyContentAuthority, hasAuthority, type AuthorityId } from "@/lib/authorities";

/** Read + verify the cookie token only (no datastore). */
export async function getSessionFromCookies(): Promise<SessionInfo | null> {
  const store = await cookies();
  return readSession(store.get(SESSION_COOKIE)?.value);
}

/**
 * Verify the token, then for managed users re-read the stored record: reject if
 * the user is gone, deactivated, or the token's tokenVersion is stale; otherwise
 * return the session with LIVE role + authorities. The env owner is always fresh.
 */
export async function getFreshAdminSession(): Promise<SessionInfo | null> {
  const session = await getSessionFromCookies();
  if (!session) return null;
  if (session.uid === ENV_OWNER_UID) return { ...session, perms: ownerPerms(), role: "owner" };

  const stored = await getUserByKey(session.uid);
  if (!stored || !stored.secret.active) return null;
  if ((stored.secret.tokenVersion || 1) !== session.tv) return null;

  return {
    uid: session.uid,
    role: stored.secret.role,
    perms: stored.secret.authorities,
    tv: stored.secret.tokenVersion || 1,
  };
}

export type RequiredAuthority = AuthorityId | "content-any";

export function sessionHas(session: SessionInfo, required: RequiredAuthority): boolean {
  return required === "content-any"
    ? hasAnyContentAuthority(session.perms)
    : hasAuthority(session.perms, required);
}

/**
 * Page guard: ensure a fresh session with the given authority, or redirect.
 * `redirect()` throws, so the return type is a guaranteed non-null session.
 */
export async function requireAuthority(required: RequiredAuthority): Promise<SessionInfo> {
  const session = await getFreshAdminSession();
  if (!session) redirect("/secretpanel/login");
  if (!sessionHas(session, required)) {
    redirect(firstAllowedPath(session.perms) ?? "/secretpanel/login?denied=1");
  }
  return session;
}
