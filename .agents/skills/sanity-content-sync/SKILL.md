---
name: sanity-content-sync
description: >-
  Provides procedures and GROQ queries for managing SwissBlue Sanity CMS schemas, documents, form
  submissions, chat leads, and image asset uploads.
---

# Sanity Content & Asset Sync Skill

This skill guides querying and managing Sanity CMS for SwissBlue (`projectId: uoj8zwj3`, `dataset: production`).

## Key Schemas in SwissBlue

1. **`corporateRequest`**: B2B form submissions (`companyName`, `contactPerson`, `email`, `phone`, `city`, `hotel`, `guestCount`, `notes`, `status`).
2. **`careerApplication`**: Job submissions (`fullName`, `email`, `phone`, `position`, `city`, `cvAsset`, `notes`).
3. **`chatLead`**: Inquiries captured by the AI Concierge (`name`, `phone`, `email`, `preferredHotel`, `dates`, `summary`).
4. **`siteContent`**: Managed site strings, hero banners, and promotional popups.
5. **`chatKnowledge`**: Knowledge documents referenced by the AI Concierge.

## Best Practices

- Always use the authorized server client in `src/sanity/lib/client.ts` or `src/sanity/lib/forms.ts` for write operations with `SANITY_API_WRITE_TOKEN`.
- Validate file types and magic bytes before uploading assets to Sanity (`src/sanity/lib/asset-upload.ts`).
- When querying GROQ, order submissions by `_createdAt desc` for administrative views.
