/**
 * Managed admin-user store, backed by Sanity.
 *
 * Each user is one `adminUser` document. Everything sensitive (credentials +
 * authorities) lives inside an AES-GCM `secret` blob, because the dataset is
 * public-read; the only plaintext fields are the keyed `userKey`, `updatedAt`,
 * and `lastLoginAt` (low sensitivity, kept plain so a login can stamp the time
 * without rewriting — and racing — the encrypted blob).
 *
 * `adminUser` is intentionally NOT registered in the Studio schema
 * (src/sanity/schemaTypes/index.ts) so it never appears in the Studio desk.
 * Documents are still created/read here via the API + token, which doesn't
 * require a registered schema.
 */

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import {
  decryptJson,
  encryptJson,
  hashPassword,
  isEncryptionConfigured,
  usernameKey,
} from "@/lib/admin-crypto";
import { type AdminRole, type AuthorityId, sanitizeAuthorities } from "@/lib/authorities";

const DOC_PREFIX = "adminUser.";

/** Plaintext shape of the user once decrypted. Never returned to the client as-is. */
export type AdminUserSecret = {
  username: string;
  displayName: string;
  role: AdminRole;
  authorities: AuthorityId[];
  passwordHash: string;
  passwordSalt: string;
  iterations: number;
  active: boolean;
  tokenVersion: number;
  createdAt: string;
  createdBy?: string;
};

/** Safe, secret-free projection sent to the management UI. */
export type AdminUserView = {
  id: string; // userKey
  username: string;
  displayName: string;
  role: AdminRole;
  authorities: AuthorityId[];
  active: boolean;
  tokenVersion: number;
  createdAt: string;
  lastLoginAt?: string;
  updatedAt?: string;
  isEnvOwner: boolean;
};

function writeToken(): string | undefined {
  return process.env.SANITY_API_WRITE_TOKEN;
}

function readTokenValue(): string | undefined {
  return process.env.SANITY_READ ?? process.env.SANITY_API_READ_TOKEN ?? process.env.SANITY_API_WRITE_TOKEN;
}

function client(token?: string): ReturnType<typeof createClient> | null {
  if (!projectId || !dataset || !token) return null;
  return createClient({ projectId, dataset, apiVersion, token, useCdn: false });
}

/** Creating/editing users needs a write token AND a configured encryption key. */
export function isUserStoreConfigured(): boolean {
  return Boolean(projectId && dataset && writeToken() && isEncryptionConfigured());
}

function viewFromSecret(userKey: string, secret: AdminUserSecret, doc?: { updatedAt?: string; lastLoginAt?: string }): AdminUserView {
  return {
    id: userKey,
    username: secret.username,
    displayName: secret.displayName,
    role: secret.role,
    authorities: sanitizeAuthorities(secret.authorities),
    active: secret.active,
    tokenVersion: secret.tokenVersion || 1,
    createdAt: secret.createdAt,
    lastLoginAt: doc?.lastLoginAt,
    updatedAt: doc?.updatedAt,
    isEnvOwner: false,
  };
}

type RawDoc = { _id: string; userKey?: string; secret?: string; updatedAt?: string; lastLoginAt?: string };

export type StoredUser = { userKey: string; secret: AdminUserSecret; updatedAt?: string; lastLoginAt?: string };

async function fetchByKey(userKey: string, token = readTokenValue()): Promise<StoredUser | null> {
  const c = client(token);
  if (!c) return null;
  const doc = await c.fetch<RawDoc | null>(
    `*[_id == $id][0]{ _id, userKey, secret, updatedAt, lastLoginAt }`,
    { id: DOC_PREFIX + userKey },
    { cache: "no-store" },
  );
  if (!doc?.secret) return null;
  const secret = await decryptJson<AdminUserSecret>(doc.secret);
  if (!secret) return null;
  return { userKey, secret, updatedAt: doc.updatedAt, lastLoginAt: doc.lastLoginAt };
}

/** Look a user up at login. Returns the decrypted record (caller verifies password). */
export async function getUserByUsername(username: string): Promise<StoredUser | null> {
  return fetchByKey(await usernameKey(username));
}

export async function getUserByKey(userKey: string): Promise<StoredUser | null> {
  return fetchByKey(userKey);
}

/** All users, decrypted then stripped of secrets, newest activity first. */
export async function listUsers(): Promise<AdminUserView[]> {
  const c = client(readTokenValue());
  if (!c) return [];
  const docs = await c.fetch<RawDoc[]>(
    `*[_type == "adminUser"]|order(coalesce(updatedAt, createdAt) desc){ _id, userKey, secret, updatedAt, lastLoginAt }`,
    {},
    { cache: "no-store" },
  );
  const views: AdminUserView[] = [];
  for (const doc of docs) {
    if (!doc.secret) continue;
    const secret = await decryptJson<AdminUserSecret>(doc.secret);
    if (!secret) continue;
    const key = doc.userKey ?? doc._id.replace(DOC_PREFIX, "");
    views.push(viewFromSecret(key, secret, doc));
  }
  return views;
}

export type CreateUserInput = {
  username: string;
  displayName: string;
  password: string;
  role: AdminRole;
  authorities: AuthorityId[];
  active: boolean;
  createdBy?: string;
};

export class UserExistsError extends Error {}

export async function createUser(input: CreateUserInput): Promise<AdminUserView> {
  const c = client(writeToken());
  if (!c) throw new Error("User store is not configured.");
  const userKey = await usernameKey(input.username);
  if (await fetchByKey(userKey, writeToken())) {
    throw new UserExistsError("A user with that username already exists.");
  }
  const now = new Date().toISOString();
  const pw = await hashPassword(input.password);
  const secret: AdminUserSecret = {
    username: input.username.trim(),
    displayName: input.displayName.trim() || input.username.trim(),
    role: input.role,
    authorities: sanitizeAuthorities(input.authorities),
    passwordHash: pw.hash,
    passwordSalt: pw.salt,
    iterations: pw.iterations,
    active: input.active,
    tokenVersion: 1,
    createdAt: now,
    createdBy: input.createdBy,
  };
  await c.create({
    _id: DOC_PREFIX + userKey,
    _type: "adminUser",
    userKey,
    updatedAt: now,
    secret: await encryptJson(secret),
  });
  return viewFromSecret(userKey, secret, { updatedAt: now });
}

export type UpdateUserPatch = {
  displayName?: string;
  role?: AdminRole;
  authorities?: AuthorityId[];
  active?: boolean;
  password?: string; // only set when resetting
};

/**
 * Apply an edit and bump tokenVersion — invalidating that user's existing
 * sessions for any freshness-checked (sensitive) action on their next request.
 */
export async function updateUser(userKey: string, patch: UpdateUserPatch): Promise<AdminUserView | null> {
  const c = client(writeToken());
  if (!c) throw new Error("User store is not configured.");
  const existing = await fetchByKey(userKey, writeToken());
  if (!existing) return null;

  const secret: AdminUserSecret = { ...existing.secret };
  if (typeof patch.displayName === "string") secret.displayName = patch.displayName.trim() || secret.username;
  if (patch.role) secret.role = patch.role;
  if (patch.authorities) secret.authorities = sanitizeAuthorities(patch.authorities);
  if (typeof patch.active === "boolean") secret.active = patch.active;
  if (patch.password) {
    const pw = await hashPassword(patch.password);
    secret.passwordHash = pw.hash;
    secret.passwordSalt = pw.salt;
    secret.iterations = pw.iterations;
  }
  secret.tokenVersion = (secret.tokenVersion || 1) + 1;

  const now = new Date().toISOString();
  await c
    .patch(DOC_PREFIX + userKey)
    .set({ secret: await encryptJson(secret), updatedAt: now })
    .commit({ visibility: "sync" });
  return viewFromSecret(userKey, secret, { updatedAt: now, lastLoginAt: existing.lastLoginAt });
}

export async function deleteUser(userKey: string): Promise<boolean> {
  const c = client(writeToken());
  if (!c) throw new Error("User store is not configured.");
  await c.delete(DOC_PREFIX + userKey);
  return true;
}

/** Stamp last-login time on a plain field — no blob rewrite, so it can't race an edit. */
export async function recordLogin(userKey: string): Promise<void> {
  const c = client(writeToken());
  if (!c) return;
  try {
    await c.patch(DOC_PREFIX + userKey).set({ lastLoginAt: new Date().toISOString() }).commit({ visibility: "async" });
  } catch {
    // best-effort; never block login on this
  }
}
