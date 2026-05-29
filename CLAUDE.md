@AGENTS.md

# 🎨 PRIMARY DESIGN REFERENCE (client-mandated)

The client has chosen this website as the **main design reference** for this project.
**Every UI/UX decision — layout, components, color, typography, spacing, booking flow —
should follow this site's design language unless the user explicitly says otherwise.**

Reference URL:
https://letsbook.me/booking/yanoljacloudsolution?checkin=2026-05-29&checkout=2026-05-30&adults=2&children=0

Notes:
- It is a `letsbook.me` booking engine (Yanolja Cloud Solution) — a JavaScript-rendered SPA,
  so `WebFetch` returns empty. To study it, open it in a browser and screenshot/inspect.
- Before starting any design/UI task, review this reference (or the captured design notes
  below) and align the work to it. When in doubt about a visual decision, defer to this site.

## Captured design notes (from the live reference, hotel booking engine)

**Overall aesthetic:** clean, modern, conversion-focused hotel booking engine on a
white / very-light-gray base. Card-driven, rounded corners, soft shadows, lots of
trust + urgency cues.

**Color system:**
- **Primary accent = ORANGE/amber** (≈ `#F5821F`) — used for the logo, the round search
  button, primary/outline CTAs ("Apply", "Select Room"), links ("View Room Details"),
  and the floating "Rate Check" pill.
- **Green** for savings/offers — soft green badges ("EXCLUSIVE OFFER", "10% Off"),
  green check icons in feature lists.
- **Red** for warnings ("Non-refundable") and strikethrough original prices.
- **Pink → purple gradient** for the "Best Deal recommended by AI" highlight banner.
- **Soft peach/cream** promo strip under the header.
- Dark charcoal/navy headings, gray secondary text, white cards.

**Header / nav:** white, sticky. Left: logo icon + brand name. Center: combined
booking bar (Check-In/Out with date range + Rooms & Guests) with a round orange search
button. Right: promo-code input + orange "Apply", language flag dropdown, currency (SAR).

**Patterns to mirror:**
- Promo/value strip under the header ("Save up to 20% — Book Direct", "Up to 47% lower
  than OTA", "Book Direct For The Best Experience") with small icons + outline buttons.
- Room/offer cards: thumbnail + room name + occupancy ("Max 3 Adults & 2 Children") +
  "View Room Details"; middle column = offer name + check/cross feature bullets; right
  column = offer badge, % off, strikethrough + current price, total + taxes breakdown,
  CTA button.
- Filter chips row (Meals: Breakfast/Lunch/Dinner, Views: Hill/Park) + "Showing X of Y".
- Status badges: "Filling Fast", "Best seller" (star), "EXCLUSIVE OFFER".
- Buttons: orange filled + orange outline, rounded; round icon search button.
- Floating helpers: "Rate Check" pill (bottom-start) and a chat-bot icon (bottom-end).

**✅ CONFIRMED SCOPE (decided by user):** Follow the reference's **layout, UX, component
patterns, and booking flow** — but **KEEP the Swiss Blue blue brand** (`--primary #2b6fe8`,
`--bluehost-deep #1246a8`). Do NOT adopt the reference's orange palette. When replicating a
reference component, translate its orange accents to the Swiss Blue blue (and keep green for
savings/offers + red for warnings as functional accents only). The reference governs
structure and interaction patterns; Swiss Blue governs color/brand.
