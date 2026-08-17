---
name: bilingual-rtl-parity
description: >-
  Audits and enforces bidirectional parity between Arabic (RTL) and English (LTR) pages in SwissBlue.
  Trigger when modifying pages, navigation, typography, cards, popups, or booking widgets to ensure
  mirrored layouts, proper font rendering (Cairo / Geist), and synchronized translations.
---

# Bilingual RTL/LTR Parity Skill

This skill provides guidelines and checklists to ensure seamless bilingual experiences across SwissBlue's Arabic (`/`) and English (`/en`) routes.

## Core Rules

1. **Direction & Layout Isolation**:
   - Arabic pages must explicitly use `dir="rtl"` with appropriate font classes (e.g. `font-arabic`).
   - English pages must use `dir="ltr"`.
   - Never hardcode directional CSS properties (use logical properties: `ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-` instead of `left-` and `right-`).

2. **Font Pairing**:
   - Arabic text must use Cairo / Tajawal / Arabic-optimized typography with proper line-height (Arabic scripts need slightly taller line-height).
   - English text uses Geist / system sans-serif.

3. **Content Synchronization**:
   - When updating data, services, or gallery items in `src/lib/content.ts` or `src/lib/editable-content.ts`, always synchronize both English and Arabic arrays/dictionaries.
   - Preserve hotel amenities, room types, and OTA partner names symmetrically.

4. **Popups & Overlays**:
   - Ensure modals, drawers, and promotional popups inherit the active locale direction and do not default to LTR when open on Arabic routes.
