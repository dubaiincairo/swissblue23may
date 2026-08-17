---
name: ga4-analytics
description: >-
  Procedures and queries for managing Google Analytics 4 (GA4) reporting, property dimensions,
  and admin overview metrics in SwissBlue.
---

# Google Analytics 4 (GA4) Skill

This skill guides querying and integrating GA4 analytics for SwissBlue.

## Configuration

- **Measurement ID**: `NEXT_PUBLIC_GA4_MEASUREMENT_ID` (`G-SG8Q96HQTW`)
- **Property ID**: `GOOGLE_ANALYTICS_PROPERTY_ID` (`535798430`)
- **Credentials**: `GOOGLE_ANALYTICS_SERVICE_ACCOUNT_JSON` (Used by `/api/admin/overview`)

## Custom Dimensions

- `property_slug`: Identifies which hotel/residence was viewed.
- `locale`: Tracks user language (`ar` vs `en`).

## Best Practices

- Only load public measurement scripts after user accepts analytics cookies in the consent banner.
- Secure server-to-server reporting calls inside `src/lib/admin-overview.ts`.
