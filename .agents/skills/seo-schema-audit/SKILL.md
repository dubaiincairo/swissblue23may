---
name: seo-schema-audit
description: >-
  Audits and verifies SEO metadata, OpenGraph tags, canonical links, and JSON-LD structured data
  (LodgingBusiness, Hotel, FAQPage, BreadcrumbList) across Arabic and English SwissBlue pages.
---

# SwissBlue SEO & Schema Audit Skill

This skill provides procedures for auditing, verifying, and optimizing SwissBlue's search engine presence in Saudi Arabia and international markets.

## Audit Checklist

1. **Structured Data (JSON-LD)**:
   - Verify `LodgingBusiness` / `Hotel` schema on hotel pages (`/hotels`, `/hotels/[slug]`).
   - Verify `FAQPage` schema on FAQ routes (`/faq`, `/en/faq`).
   - Verify `Organization` schema on root layout.

2. **Metadata & OpenGraph Parity**:
   - Ensure dynamic `title`, `description`, `keywords`, and `openGraph` tags are present for every route.
   - Verify Arabic routes have localized Arabic metadata and English routes have English metadata.
   - Verify `og:image`, `og:locale`, and `og:url` match the canonical URL.

3. **Canonical & Alternate Hreflang Tags**:
   - Verify `<link rel="canonical">` points to the primary URL.
   - Verify `<link rel="alternate" hreflang="ar" ...>` and `<link rel="alternate" hreflang="en" ...>` are synchronized.

4. **Performance & Core Web Vitals**:
   - Monitor Largest Contentful Paint (LCP < 2.5s) on mobile and desktop.
   - Audit cumulative layout shifts (CLS) on hero carousel and promotional popups.
