/**
 * Dependency-free rate limiting + abuse helpers for public endpoints.
 *
 * Backend: uses Upstash Redis (REST) when UPSTASH_REDIS_REST_URL +
 * UPSTASH_REDIS_REST_TOKEN (or the KV_REST_API_* aliases) are configured, so the
 * counter is shared correctly across Vercel's many serverless instances. When
 * those vars are absent it falls back to a best-effort in-memory counter — still
 * useful on a warm instance, and the whole thing upgrades to durable, global
 * limiting the moment the env vars are set. No external package required.
 *
 * Strategy is a fixed window: the key embeds the window number, so each window
 * gets its own counter and stale windows self-expire (no TTL race).
 */

const KEY_PREFIX = "rl";

function upstashConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

type Bucket = { count: number; expiresAt: number };
const memory = new Map<string, Bucket>();

function memoryHit(key: string, windowMs: number): number {
  const now = Date.now();
  // Opportunistic cleanup so a long-lived instance doesn't grow unbounded.
  if (memory.size > 5000) {
    for (const [k, v] of memory) {
      if (v.expiresAt <= now) memory.delete(k);
    }
  }
  const existing = memory.get(key);
  if (!existing || existing.expiresAt <= now) {
    memory.set(key, { count: 1, expiresAt: now + windowMs });
    return 1;
  }
  existing.count += 1;
  return existing.count;
}

async function upstashHit(
  cfg: { url: string; token: string },
  key: string,
  windowSec: number,
): Promise<number> {
  // INCR the window-bucketed key, then keep a TTL so old buckets self-expire.
  const res = await fetch(`${cfg.url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, String(windowSec * 2)],
    ]),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Upstash ${res.status}`);
  const data = (await res.json()) as Array<{ result?: number }>;
  const count = data?.[0]?.result;
  if (typeof count !== "number") throw new Error("Upstash returned no count");
  return count;
}

export type RateLimitResult = { success: boolean; remaining: number; reset: number };

/**
 * Fixed-window limiter. `name` namespaces the limit, `id` is the subject
 * (e.g. an IP or username); `limit` requests are allowed per `windowSec`.
 * Fails OPEN — a limiter backend error never blocks a legitimate request.
 */
export async function rateLimit(
  name: string,
  id: string,
  limit: number,
  windowSec: number,
): Promise<RateLimitResult> {
  const windowMs = windowSec * 1000;
  const bucket = Math.floor(Date.now() / windowMs);
  const key = `${KEY_PREFIX}:${name}:${id}:${bucket}`;
  const reset = (bucket + 1) * windowMs;

  let count: number;
  const cfg = upstashConfig();
  if (cfg) {
    try {
      count = await upstashHit(cfg, key, windowSec);
    } catch {
      count = memoryHit(key, windowMs);
    }
  } else {
    count = memoryHit(key, windowMs);
  }

  return { success: count <= limit, remaining: Math.max(0, limit - count), reset };
}

/** Best-effort client IP from Vercel / proxy headers. */
export function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Hidden form field that real users never fill in, but bots usually do. */
export const HONEYPOT_FIELD = "company_url";

export function honeypotTripped(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}
