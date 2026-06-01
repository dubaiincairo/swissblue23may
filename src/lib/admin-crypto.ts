/**
 * Crypto primitives for managed admin users — Web Crypto only, no dependencies.
 *
 * Runs only in Node route handlers / server components (login + user-management
 * APIs, admin pages). Three jobs:
 *   1. hashPassword/verifyPassword — PBKDF2-HMAC-SHA-256 password hashing.
 *   2. encryptJson/decryptJson — AES-256-GCM at-rest encryption of the user
 *      record. The Sanity dataset is public-read, so the sensitive payload is
 *      stored as an authenticated-encrypted blob; without the key it's useless.
 *   3. usernameKey — deterministic keyed hash used as the document id, so login
 *      can look a user up by id without the dataset revealing usernames.
 *
 * Fails CLOSED: with no secret configured, no record can be made or read.
 */

const PBKDF2_ITERATIONS = 210_000;
const ENC_SALT = "sb-admin-users-v1"; // domain-separation salt for the AES key
const ENC_ITERATIONS = 100_000;

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function timingSafeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) mismatch |= a[i] ^ b[i];
  return mismatch === 0;
}

/** Prefer a dedicated key; fall back to the session secret (matches forms-token idiom). */
function encSecret(): string {
  return process.env.ADMIN_USERS_ENC_KEY || process.env.ADMIN_SESSION_SECRET || "";
}

/** True only when there is a secret to derive the encryption key from. */
export function isEncryptionConfigured(): boolean {
  return Boolean(encSecret() && process.env.ADMIN_SESSION_SECRET);
}

// --- Password hashing (PBKDF2) ---

export type PasswordHash = { hash: string; salt: string; iterations: number };

async function deriveBits(password: string, salt: Uint8Array<ArrayBuffer>, iterations: number): Promise<Uint8Array> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    keyMaterial,
    256,
  );
  return new Uint8Array(bits);
}

export async function hashPassword(password: string): Promise<PasswordHash> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const derived = await deriveBits(password, salt, PBKDF2_ITERATIONS);
  return { hash: toBase64Url(derived), salt: toBase64Url(salt), iterations: PBKDF2_ITERATIONS };
}

export async function verifyPassword(password: string, stored: PasswordHash | null | undefined): Promise<boolean> {
  if (!stored?.hash || !stored?.salt) return false;
  const iterations = Number(stored.iterations) || PBKDF2_ITERATIONS;
  const derived = await deriveBits(password, fromBase64Url(stored.salt), iterations);
  return timingSafeEqualBytes(derived, fromBase64Url(stored.hash));
}

// --- Record encryption (AES-256-GCM) ---

async function getAesKey(): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(encSecret()),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: new TextEncoder().encode(ENC_SALT), iterations: ENC_ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

/** Encrypt any JSON-serialisable value to a `<ivB64Url>.<ciphertextB64Url>` string. */
export async function encryptJson(value: unknown): Promise<string> {
  const key = await getAesKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plaintext = new TextEncoder().encode(JSON.stringify(value));
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext);
  return `${toBase64Url(iv)}.${toBase64Url(new Uint8Array(ciphertext))}`;
}

/** Decrypt a blob produced by encryptJson. Returns null on any tampering/format/key error. */
export async function decryptJson<T>(blob: string): Promise<T | null> {
  try {
    const dot = blob.indexOf(".");
    if (dot <= 0) return null;
    const iv = fromBase64Url(blob.slice(0, dot));
    const ciphertext = fromBase64Url(blob.slice(dot + 1));
    const key = await getAesKey();
    const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
    return JSON.parse(new TextDecoder().decode(plaintext)) as T;
  } catch {
    return null;
  }
}

// --- Username → document key (keyed, deterministic) ---

/**
 * HMAC-SHA-256(secret, lowercased username) → base64url. Deterministic so login
 * can fetch the doc by id; keyed with the session secret so the public dataset
 * never exposes a plain username↔hash mapping.
 */
export async function usernameKey(username: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET ?? ""),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(username.trim().toLowerCase()));
  return toBase64Url(new Uint8Array(signature));
}
