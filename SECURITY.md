# Security Policy

This document describes the security controls in place for the Swiss Blue Hotels
website and how to operate them. It contains **no secrets** — only configuration
names and procedures.

## Reporting a vulnerability

If you discover a security issue, please report it privately to
**[set a security contact — e.g. security@swissblue.sa]** rather than opening a
public issue. Include steps to reproduce and the affected URL/route. We aim to
acknowledge reports within a few business days.

Please do **not** run automated scanners or load/stress tests against the
production site.

---

## Security controls in place

A security audit (2026-05-31) reviewed authentication, the admin panel,
middleware, API routes, file uploads, rendering/XSS, and dependencies. The
following controls are implemented:

| Area | Control |
| --- | --- |
| **Framework** | Next.js kept patched (≥ 16.2.6) — closes known middleware/proxy-bypass, XSS, SSRF and DoS advisories. |
| **Admin auth** | `/secretpanel`, `/studio`, and `/api/site-content/*` are gated by middleware (`src/proxy.ts`). HMAC-signed, `httpOnly`, `Secure` (prod), `SameSite=Lax` session cookie. Fails **closed** when unconfigured. |
| **Session revocation** | The session signature folds in a version counter (`ADMIN_SESSION_VERSION` — a global kill-switch) and the env-admin password binding, so bumping the version (all sessions) or changing the password (the env-admin's sessions) invalidates outstanding cookies (see below). |
| **Brute-force / abuse** | Per-IP and per-username rate limiting on login; per-IP rate limiting + a hidden honeypot field on the public forms (`/api/forms/*`). Enforced globally when Redis is configured (see Upstash, below); honeypot works regardless. |
| **HTTP headers** | `X-Content-Type-Options`, `Referrer-Policy`, `Strict-Transport-Security`, `Permissions-Policy` site-wide; `X-Frame-Options: DENY` + `Content-Security-Policy: frame-ancestors 'none'` on the admin areas (clickjacking protection). `x-powered-by` is disabled. |
| **Uploads** | Media + CV uploads are validated by real file **signature (magic bytes)**, not the client-supplied `Content-Type`. Uploaded SVGs are sanitized server-side (DOMPurify) before storage. Size limits enforced. |
| **Rich text / XSS** | The single HTML-injection path is sanitized with DOMPurify under a strict tag allowlist; all admin views of user-submitted data rely on React's auto-escaping. |
| **Outbound fetches** | The stock-image import re-validates the final URL against a host allowlist before fetching (SSRF defense-in-depth) and rejects oversized payloads early. |
| **Secrets** | All credentials/tokens are server-only. Only non-sensitive values are exposed as `NEXT_PUBLIC_*`. `.env*` is git-ignored. |

---

## Environment variables (configuration reference)

Set these in the Vercel project settings (never commit real values). Server-only
variables must **never** be prefixed `NEXT_PUBLIC_`.

### Required

| Variable | Purpose |
| --- | --- |
| `ADMIN_USERNAME` | Admin panel username. |
| `ADMIN_PASSWORD` | Admin panel password. The panel **fails closed** (stays locked) if this is unset. Use a long, unique value. |
| `ADMIN_SESSION_SECRET` | HMAC secret for signing session cookies. Fails closed if unset. Use a long random value. |
| `SANITY_API_WRITE_TOKEN` | Sanity write token — content saves + (fallback) form submissions. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project id (public by design). |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset, e.g. `production` (public by design). |

### Optional — enhance security, with safe fallbacks

| Variable | Purpose |
| --- | --- |
| `ADMIN_SESSION_VERSION` | Session kill-switch. Defaults to `1`. **Bump it to force-log-out every admin** without changing the password. |
| `SANITY_FORMS_TOKEN` | Least-privilege token used by the public form routes + submission reads. Falls back to `SANITY_API_WRITE_TOKEN` when unset. See "Least-privilege forms token". |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` *(or `KV_REST_API_URL` / `KV_REST_API_TOKEN`)* | Distributed store for rate limiting. Without these, rate limiting falls back to best-effort in-memory (not enforced across serverless instances). See "Activating rate limiting". |
| `SANITY_READ` *(or `SANITY_API_READ_TOKEN`)* | Read token for fetching editable content. |

### Third-party feature keys (server-only)

| Variable | Feature |
| --- | --- |
| `GEMINI_API_KEY` | AI "rephrase" in the admin editor. |
| `DEEPL_API_KEY` | Translation in the admin editor. |
| `UNSPLASH_ACCESS_KEY`, `PEXELS_API_KEY` | Stock-photo search/import. |
| `NEXT_PUBLIC_CHATBASE_ID` | Chat widget bot id (public). The Chatbase **identity secret must NOT** be stored as a public variable. |

---

## Operating the controls

### Admin authentication & session revocation

- Log in at `/secretpanel/login`.
- **Force-log-out all admins** (e.g. after a suspected leak, or staff change):
  bump `ADMIN_SESSION_VERSION` (e.g. `1` → `2`) in Vercel and redeploy. All
  existing session cookies become invalid immediately.
- **Changing `ADMIN_PASSWORD`** invalidates the env-admin account's existing sessions.
- **Rotating `ADMIN_SESSION_SECRET`** invalidates all sessions as well.
- Note: deploying a change to the session-signing scheme logs admins out once;
  simply log in again.

### Activating rate limiting (Upstash Redis)

The login and public-form rate limits are **enforced globally only when a Redis
store is configured**; otherwise they fall back to per-instance in-memory
counters (the honeypot still protects forms either way).

1. Vercel → project → **Storage → Create Database → Upstash → Redis**.
2. Region: choose **US East (`us-east-1`)** to match the functions' region.
   The free tier is sufficient.
3. Connect it to **Production, Preview, and Development**.
4. Vercel injects `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`
   (or the `KV_REST_API_*` aliases) — the limiter reads either pair.
5. **Redeploy** for the env vars to take effect.

The limiter **fails open**: if Redis is unreachable it falls back to in-memory,
so an outage never locks out legitimate users.

### Least-privilege forms token (Sanity)

By default the public form routes use `SANITY_API_WRITE_TOKEN`. To reduce blast
radius, provision a narrower token and set it as `SANITY_FORMS_TOKEN`:

- It needs **read + create** on `careerApplication` and `corporateRequest`, and
  **read + create** on **file assets** (CV uploads).
- **Type-scoped** least-privilege (a token limited to those two types) requires
  Sanity **custom roles**, which are an **Enterprise-plan** feature. On other
  plans, the practical step is a **separate Editor token** used only here — this
  gives independent rotation/revocation and audit separation (not reduced scope).
- Set `SANITY_FORMS_TOKEN` in Vercel and redeploy. The code falls back to the
  full write token until it is set, so there is no breakage.

After setting it, verify the admin submission pages still list entries (read
works) and a test submission still saves (create + asset upload work).

### Rotating secrets

- Rotate tokens/keys from their respective dashboards (Sanity → Manage → API;
  the third-party providers), then update the value in Vercel and redeploy.
- Treat any secret ever committed, logged, or shared as compromised — rotate it.
- `.env.local` is git-ignored; keep real secrets out of the repository.

---

## Verification (safe, non-destructive)

- **Headers:** `curl -sD - -o /dev/null https://<domain>/en` — expect `nosniff`,
  `referrer-policy`, `strict-transport-security`, `permissions-policy`, and no
  `x-powered-by`. On `/secretpanel/login`, also expect `x-frame-options: DENY`.
- **Login rate limit:** 6 rapid wrong-credential POSTs to `/api/auth/login` with
  the same (throwaway) username — expect `401` then `429`. (Creates nothing.)
- **Forms honeypot:** a POST to `/api/forms/b2b` with a non-empty `company_url`
  field returns `200` and is silently dropped (no record created).
