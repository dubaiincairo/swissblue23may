/**
 * Minimal shared-admin authentication for the CMS (/secretpanel + /studio).
 *
 * A single set of credentials lives in env vars; a successful login sets an
 * HMAC-signed, httpOnly session cookie that middleware (proxy.ts) verifies.
 * Runtime-agnostic: uses Web Crypto + btoa/atob so it works in middleware and
 * route handlers alike. Fails CLOSED — if the env is not configured, no token
 * can be minted or verified, so the panel stays locked.
 */

export const SESSION_COOKIE = "sb_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days (seconds)

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

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
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

/** Constant-time-ish credential check against the configured env values. */
export function verifyCredentials(username: string, password: string): boolean {
  if (!isAuthConfigured()) return false;
  const userOk = timingSafeEqual(username, getAdminUsername());
  const passOk = timingSafeEqual(password, getAdminPassword());
  return userOk && passOk;
}

/** Optional kill-switch: bump ADMIN_SESSION_VERSION to invalidate all sessions. */
function getSessionVersion(): string {
  return process.env.ADMIN_SESSION_VERSION ?? "1";
}

/**
 * The message we actually HMAC. Binding the signature to the current password
 * and session version means a password change OR a version bump invalidates
 * every existing token — revocation without a server-side session store. The
 * password is only ever hashed, never placed in the token itself.
 */
function signedMessage(expiry: number): string {
  return `${expiry}:${getSessionVersion()}:${getAdminPassword()}`;
}

/** Mint a signed session token of the form `<expiryMs>.<signature>`. */
export async function createSessionToken(): Promise<string> {
  const expiry = Date.now() + SESSION_MAX_AGE * 1000;
  const signature = await sign(signedMessage(expiry));
  return `${expiry}.${signature}`;
}

/** Verify a session cookie value: valid signature, bound creds, not expired. */
export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token || !getSecret()) return false;
  const dot = token.indexOf(".");
  if (dot <= 0) return false;
  const signature = token.slice(dot + 1);
  const expiry = Number(token.slice(0, dot));
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;
  const expected = await sign(signedMessage(expiry));
  return timingSafeEqual(signature, expected);
}
