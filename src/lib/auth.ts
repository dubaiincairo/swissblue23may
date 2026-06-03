/**
 * Session auth for the CMS (/secretpanel + /studio + admin APIs).
 *
 * The session cookie is an HMAC-signed token that now carries the signed-in
 * identity AND its authorities, so the edge proxy can authorise a request with
 * NO datastore lookup. Two kinds of principal:
 *   - the env "owner" (ADMIN_USERNAME/PASSWORD) — a permanent super-admin that
 *     needs no datastore and can never be locked out;
 *   - managed users — stored encrypted in Sanity (see admin-users.ts).
 *
 * Runtime-agnostic (Web Crypto + btoa/atob) so it works in middleware and route
 * handlers. Fails CLOSED: without ADMIN_SESSION_SECRET nothing can be minted or
 * verified, so the panel stays locked.
 *
 * Revocation: the signature folds in ADMIN_SESSION_VERSION (global kill-switch)
 * and, for the env owner, ADMIN_PASSWORD (password change → all owner sessions
 * die). Managed users additionally carry a per-user `tv` (tokenVersion); editing
 * a user bumps it, and freshness-checked routes (see admin-session.ts) reject a
 * token whose `tv` no longer matches the stored record.
 */

import { ALL_AUTHORITY_IDS, sanitizeAuthorities } from "@/lib/authorities";

export const SESSION_COOKIE = "sb_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days (seconds)

export const ENV_OWNER_UID = "env";

export type SessionInfo = {
  uid: string; // "env" for the owner, else the user's userKey
  role: string;
  perms: string[];
  tv: number; // per-user tokenVersion (0 for the env owner)
};

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

export function getAdminUsername(): string {
  return process.env.ADMIN_USERNAME ?? "admin";
}

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

/** True only when both a password and a session secret are configured. */
export function isAuthConfigured(): boolean {
  return Boolean(getAdminPassword() && getSecret());
}

/** Authorities granted to the permanent env owner — everything. */
export function ownerPerms(): string[] {
  return [...ALL_AUTHORITY_IDS];
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function encodeStringB64Url(value: string): string {
  return toBase64Url(new TextEncoder().encode(value));
}

function decodeStringB64Url(value: string): string {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

async function sign(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return toBase64Url(new Uint8Array(signature));
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/** Constant-time-ish credential check for the env owner. */
export function verifyCredentials(username: string, password: string): boolean {
  if (!isAuthConfigured()) return false;
  const userOk = timingSafeEqual(username, getAdminUsername());
  const passOk = timingSafeEqual(password, getAdminPassword());
  return userOk && passOk;
}

/** Optional kill-switch: bump ADMIN_SESSION_VERSION to invalidate every session. */
function getSessionVersion(): string {
  return process.env.ADMIN_SESSION_VERSION ?? "1";
}

/**
 * Extra binding folded into the signature. The env owner binds to the password
 * (so a password change revokes owner tokens), exactly as the old scheme did.
 * Managed users bind to nothing here — their revocation runs through `tv` +
 * the freshness check, since the edge can't read their hash.
 */
function bindingFor(uid: string): string {
  return uid === ENV_OWNER_UID ? getAdminPassword() : "";
}

function signedMessage(payloadJson: string, uid: string): string {
  return `${payloadJson}:${getSessionVersion()}:${bindingFor(uid)}`;
}

type SessionPayload = { uid: string; role: string; perms: string[]; tv: number; exp: number };

/** Mint a signed session token of the form `<payloadB64Url>.<signature>`. */
export async function createSessionToken(input: {
  uid: string;
  role: string;
  perms: string[];
  tv?: number;
}): Promise<string> {
  const payload: SessionPayload = {
    uid: input.uid,
    role: input.role,
    perms: input.perms,
    tv: input.tv ?? 0,
    exp: Date.now() + SESSION_MAX_AGE * 1000,
  };
  const payloadJson = JSON.stringify(payload);
  const signature = await sign(signedMessage(payloadJson, payload.uid));
  return `${encodeStringB64Url(payloadJson)}.${signature}`;
}

/**
 * Verify a session cookie and return the principal, or null. Checks signature,
 * expiry, and (via the signed message) the global session version + owner
 * password binding. Does NOT touch the datastore — callers that need instant
 * per-user revocation re-check freshness against the store.
 */
export async function readSession(token: string | undefined | null): Promise<SessionInfo | null> {
  if (!token || !getSecret()) return null;
  const dot = token.indexOf(".");
  if (dot <= 0) return null;
  const payloadB64 = token.slice(0, dot);
  const signature = token.slice(dot + 1);

  let payloadJson: string;
  try {
    payloadJson = decodeStringB64Url(payloadB64);
  } catch {
    return null;
  }

  let payload: Partial<SessionPayload>;
  try {
    payload = JSON.parse(payloadJson) as Partial<SessionPayload>;
  } catch {
    return null;
  }

  const uid = typeof payload.uid === "string" ? payload.uid : "";
  const exp = Number(payload.exp);
  if (!uid || !Number.isFinite(exp) || exp < Date.now()) return null;

  const expected = await sign(signedMessage(payloadJson, uid));
  if (!timingSafeEqual(signature, expected)) return null;

  return {
    uid,
    role: typeof payload.role === "string" ? payload.role : "custom",
    perms: sanitizeAuthorities(payload.perms),
    tv: Number.isFinite(Number(payload.tv)) ? Number(payload.tv) : 0,
  };
}

/** Back-compat boolean check (does a valid session exist?). */
export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  return (await readSession(token)) !== null;
}

// --- Password-reset tokens (the "forgot password" owner-recovery flow) ---

const RESET_MAX_AGE = 30 * 60 * 1000; // 30 minutes (ms)

type ResetPayload = { p: "reset"; rv: number; exp: number };

function resetMessage(payloadJson: string): string {
  return `reset:${payloadJson}:${getSessionVersion()}`;
}

/** Mint a short-lived signed reset token bound to the current owner reset version. */
export async function createResetToken(resetVersion: number): Promise<string> {
  const payload: ResetPayload = { p: "reset", rv: resetVersion, exp: Date.now() + RESET_MAX_AGE };
  const payloadJson = JSON.stringify(payload);
  const signature = await sign(resetMessage(payloadJson));
  return `${encodeStringB64Url(payloadJson)}.${signature}`;
}

/** Verify a reset token; returns its bound reset version, or null if invalid/expired. */
export async function readResetToken(token: string | undefined | null): Promise<{ rv: number } | null> {
  if (!token || !getSecret()) return null;
  const dot = token.indexOf(".");
  if (dot <= 0) return null;
  const payloadB64 = token.slice(0, dot);
  const signature = token.slice(dot + 1);

  let payloadJson: string;
  try {
    payloadJson = decodeStringB64Url(payloadB64);
  } catch {
    return null;
  }

  let payload: Partial<ResetPayload>;
  try {
    payload = JSON.parse(payloadJson) as Partial<ResetPayload>;
  } catch {
    return null;
  }

  if (payload.p !== "reset") return null;
  const exp = Number(payload.exp);
  if (!Number.isFinite(exp) || exp < Date.now()) return null;

  const expected = await sign(resetMessage(payloadJson));
  if (!timingSafeEqual(signature, expected)) return null;

  return { rv: Number(payload.rv) || 0 };
}
