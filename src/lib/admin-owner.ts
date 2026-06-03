/**
 * Owner password "override", backed by Sanity — powers the forgot-password flow.
 *
 * The permanent env owner (ADMIN_USERNAME/ADMIN_PASSWORD) can't have its password
 * rewritten by the app (it's a Vercel env var). So a reset instead stores an
 * ADDITIONAL owner password here, as an AES-GCM-encrypted PBKDF2 hash in a single
 * `adminOwnerOverride` document, which login also accepts for the owner account.
 *
 * A monotonic `resetVersion` invalidates reset links once one has been used: the
 * reset token carries the version it was minted against, and a successful reset
 * bumps it — so the link is effectively single-use.
 *
 * Fails CLOSED: needs a write token + encryption key, exactly like admin-users.
 */

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import {
  decryptJson,
  encryptJson,
  hashPassword,
  isEncryptionConfigured,
  type PasswordHash,
  verifyPassword,
} from "@/lib/admin-crypto";

const DOC_ID = "adminOwnerOverride";

type RawDoc = { _id: string; secret?: string; resetVersion?: number };

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

/** Storing/reading an override needs a write token AND an encryption key. */
export function isOwnerResetConfigured(): boolean {
  return Boolean(projectId && dataset && writeToken() && isEncryptionConfigured());
}

async function fetchDoc(token = readTokenValue()): Promise<{ secret: PasswordHash | null; resetVersion: number }> {
  const c = client(token);
  if (!c) return { secret: null, resetVersion: 0 };
  const doc = await c.fetch<RawDoc | null>(
    `*[_id == $id][0]{ _id, secret, resetVersion }`,
    { id: DOC_ID },
    { cache: "no-store" },
  );
  const secret = doc?.secret ? await decryptJson<PasswordHash>(doc.secret) : null;
  return { secret, resetVersion: Number(doc?.resetVersion) || 0 };
}

/** Current reset version — folded into reset tokens so a used link can't be replayed. */
export async function getOwnerResetVersion(): Promise<number> {
  return (await fetchDoc()).resetVersion;
}

/** True if the supplied password matches the stored owner override (if any). */
export async function verifyOwnerOverride(password: string): Promise<boolean> {
  const { secret } = await fetchDoc();
  if (!secret) return false;
  return verifyPassword(password, secret);
}

/** Store a new owner override password and bump the reset version. */
export async function setOwnerOverride(password: string): Promise<number> {
  const c = client(writeToken());
  if (!c) throw new Error("Owner reset is not configured.");
  const current = await fetchDoc(writeToken());
  const nextVersion = current.resetVersion + 1;
  await c.createOrReplace({
    _id: DOC_ID,
    _type: "adminOwnerOverride",
    secret: await encryptJson(await hashPassword(password)),
    resetVersion: nextVersion,
    updatedAt: new Date().toISOString(),
  });
  return nextVersion;
}
