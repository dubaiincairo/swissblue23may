# Swiss Blue Design System

This repository uses the SwissBlue19JunDelivery implementation as a read-only
visual and interaction benchmark. New work must preserve the rules below.

## Brand tokens

| Token | Value | Use |
| --- | --- | --- |
| Primary Blue | `#2B6FE8` | Primary actions, active states, links |
| Royal Blue | `#1246A8` | Brand headings, navigation, gradients |
| Hospitality Cream | `#FFF8EB` | Warm page and section surfaces |
| Ink | `#111827` | Primary text |
| Muted Ink | `#475569` | Supporting text |
| Success | `#16A34A` | Verified and successful states |
| Error | `#B91C1C` | Form and destructive feedback |

Use semantic CSS variables instead of introducing new literal blues. Maintain at
least WCAG AA contrast for body copy, controls, and focus states.

## Shape and elevation

- Controls: 12px radius; compact chips may use a full pill.
- Content cards: 2028px radius.
- Card elevation: `0 10px 30px rgba(18, 70, 168, 0.08)`.
- Action elevation: `0 4px 14px rgba(43, 111, 232, 0.32)`.
- Avoid heavy black shadows and mixed radius systems.

## Typography and bilingual parity

- Arabic: Noto Kufi Arabic or the configured Arabic sans family.
- English: Geist or the configured Latin sans family.
- Arabic letter spacing is always `0`; never apply uppercase tracking.
- Arabic display line-height: 1.31.4. Arabic body line-height: 1.751.9.
- Direction is set at the document or page root with `dir="rtl"` or `dir="ltr"`.
- Use logical properties (`margin-inline`, `padding-inline`, `inset-inline`)
  so spatial hierarchy mirrors naturally.

## Motion

- Standard transition: 150300ms with ease-out.
- Motion communicates state, focus, or hierarchy; it must not block input.
- Respect `prefers-reduced-motion: reduce` and remove decorative transforms.
- Preserve focus after dialogs, language changes, and tab changes.

## Responsive layout

- Supported viewport range begins at 320px.
- No horizontal clipping at 320430px.
- Header identity remains visible; actions wrap into a second row.
- Touch targets are at least 44px where space permits.
- Data tables must scroll or transform into cards on narrow screens.

## Interaction and accessibility

- Tabs implement the WAI-ARIA tab pattern, including arrow, Home, and End keys.
- Dialogs expose a name, modal semantics, a localized close label, and connected
  field labels.
- Async forms show pending and error states and only show success after a 2xx
  server response.
- Dynamic chat and CRM status messages use live regions where appropriate.
