# Swiss Blue — UI content audit (admin-editability)

_Last updated: 2026-05-30. Audits which user-facing text and images are editable from the admin panel (`/secretpanel`, Arabic at `/secretpanel/ar`) versus still hardcoded in code._

Content is stored in Sanity as per-language chunk documents and edited through the generic
section editor in `src/components/secret-panel.tsx`. Each admin **section** maps to a path in
the content tree (`src/lib/editable-content.ts`) and auto-renders every field (text, lists,
and images) underneath it.

## ✅ Editable from the admin panel

| Area | Admin section(s) | Notes |
|------|------------------|-------|
| Navigation menu | Navigation | groups, labels, links |
| Website photos | Website photos, Hospitality gallery | logo, hero slides, city photos, gallery |
| Footer links & support | Footer links, Footer support | columns + support bullets |
| **Footer text** ⭐ | **Footer text** | description, city badges, support heading, contact button, copyright, tagline (NEW) |
| Homepage | Hero & booking, Key numbers, Property cards, Loyalty, Destinations, Offers, Services, Stay categories, Guest testimonials, Closing CTA, Homepage FAQ | |
| Stay pages | Hotels, Rooms & Suites, Serviced Apartments, Amenities & Services, Property FAQ | heroes, intros, lists |
| Experience | Destinations, Dining | |
| Offers | Offers page, Loyalty page | |
| Business | Corporate Deals page, Meetings & Events, Group Bookings | hero/intro/documents |
| **B2B request form** ⭐ | **B2B — request form** | intro, step headings, every field label, all dropdown options, placeholders, buttons, success/error messages (NEW) |
| Community | Careers page, Social Responsibility | |
| **Careers jobs & application** ⭐ | **Careers — jobs & application form** | workplace culture cards, the full job openings list (add/edit/reorder), apply-section labels, every form field, success/error messages (NEW) |
| Contact | Central Reservation, Complaints & Suggestions, Contact page | |
| Company | About, FAQ page, Full FAQ | |

⭐ = added in this pass. All photos surfaced in these sections are uploadable/replaceable from the panel.

## 📥 Form submissions (NEW)

Both forms previously **discarded** submissions (a fake success message). They now persist to Sanity:

- Recruitment → `careerApplication` documents (CV uploaded as a Sanity file asset).
- B2B → `corporateRequest` documents.

View them in the panel via **Submissions** (top bar) →
- `/secretpanel/submissions/careers` — applications + CV download.
- `/secretpanel/submissions/b2b` — corporate requests.

APIs: `src/app/api/forms/careers/route.ts` (multipart + CV), `src/app/api/forms/b2b/route.ts` (JSON).
Schema: `src/sanity/schemaTypes/{careerApplicationType,corporateRequestType}.ts`.

> 🔒 The submission pages (and the whole panel + Studio) are now behind admin login — see **Authentication** below.

## ✅ Added in phase 2 (now editable)

| Area | Admin section | Notes |
|------|---------------|-------|
| Site-wide UI text | **Site-wide UI text** | Book button, booking bar labels, mobile menu labels, payment label, and the full cookie-banner copy (ar+en) |
| Closing CTAs | **Closing CTAs (page bottoms)** | The CTA band at the bottom of every page — shared eyebrow + body text, each page's title and button, and the hotel-detail title template |

The previously-hardcoded `CtaBand` eyebrow/defaults + per-page titles (≈40 page call sites), header "Book now" button, `BookingBar`, `MobileNav`, `PaymentMethods` label, and `CookieBanner` copy are all CMS-driven now.

## 🔒 Authentication

`/secretpanel` (panel + submissions), `/studio`, and `/api/site-content` are gated by middleware (`src/proxy.ts`). Unauthenticated page requests redirect to `/secretpanel/login`; API requests get `401`. Public form-submission endpoints (`/api/forms/*`) stay open.

- Sign-in page: `src/app/secretpanel/login/page.tsx`; routes: `src/app/api/auth/{login,logout}/route.ts`; session helper: `src/lib/auth.ts` (HMAC-signed, httpOnly cookie, 7-day expiry). Sign-out button is in the panel toolbar.
- Credentials are env vars: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`. **Fails closed** — if password/secret are unset, login is impossible and the panel stays locked.
- ⚠️ Set your own values in Vercel (Production + Preview). The local `.env.local` ships a placeholder password to change.

## ❌ Still hardcoded (minor, out of scope)

- Image **alt text** across `PageHero`/cards (mostly empty/decorative or short) and the logo `alt` text.
- The `/studio` Sanity Studio UI and `/secretpanel` chrome/labels — these are tool UI, not site content.

## Storage note
The recruitment/B2B form content lives in a dedicated `forms` Sanity chunk
(`site-content--<lang>--forms`) so the main `subpages` document stays under Sanity's
1,000-attribute-per-document limit. See `CHUNK_KINDS` / `splitLang` / `assembleChunks` in
`src/lib/editable-content.ts`.
