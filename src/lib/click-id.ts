// Carries the Google Ads click id from swissblue.sa to the eZee booking engine
// (book.swissblue.sa, formerly letsbook.me).
//
// Why: the engine's app drops unknown query parameters such as `gclid` the moment it
// boots, before any tag can read them, and its firewall rejects the Google tag's
// cross-domain linker (`_gl=1*...`, HTTP 403). The URL hash is the one part of the
// address it keeps, so the click id travels there (`#gclid=...`) and a Tag Manager tag
// on the engine reads it on load. Since 4 Nov 2026 the engine lives on the
// book.swissblue.sa CNAME, so the `_gcl_aw` cookie on `.swissblue.sa` is shared too;
// the hash stays as the explicit hand-off. See docs/GA4_ADS_TRACKING.md (chatwoot repo).

const STORAGE_KEY = "sb-click-id-v1";
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000; // Google Ads click-through window
const CLICK_PARAMS = ["gclid", "gbraid", "wbraid"] as const;
const CAMPAIGN_PARAMS = ["utm_source", "utm_medium", "utm_campaign"] as const;
// Booking-engine hosts: the CNAME (current) and letsbook.me (old links that may still be stored in the CMS).
const BOOKING_HOSTS = ["book.swissblue.sa/booking/", "letsbook.me/booking/"];

export type StoredClickId = Partial<Record<(typeof CLICK_PARAMS)[number] | (typeof CAMPAIGN_PARAMS)[number], string>> & {
  ts: number;
};

function readStorage(): StoredClickId | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredClickId;
    if (!parsed || typeof parsed.ts !== "number" || Date.now() - parsed.ts > MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStorage(value: StoredClickId) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage blocked (private mode, consent tools): the click id simply is not carried.
  }
}

/** `_gcl_aw` is written by the Conversion Linker tag as `GCL.<unix seconds>.<gclid>`. */
function clickIdFromLinkerCookie(): string | undefined {
  try {
    const match = document.cookie.match(/(?:^|;\s*)_gcl_aw=GCL\.\d+\.([^;]+)/);
    return match ? decodeURIComponent(match[1]) : undefined;
  } catch {
    return undefined;
  }
}

/** Remember a click id found on the current page URL (or in the linker cookie) for later booking clicks. */
export function captureClickId(): StoredClickId | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const found: StoredClickId = { ts: Date.now() };
  let hasClickId = false;
  for (const key of CLICK_PARAMS) {
    const value = params.get(key)?.trim();
    if (value) {
      found[key] = value;
      hasClickId = true;
    }
  }
  if (hasClickId) {
    for (const key of CAMPAIGN_PARAMS) {
      const value = params.get(key)?.trim();
      if (value) found[key] = value;
    }
    writeStorage(found);
    return found;
  }
  const stored = readStorage();
  if (stored) return stored;
  const fromCookie = clickIdFromLinkerCookie();
  if (fromCookie) {
    const value: StoredClickId = { gclid: fromCookie, ts: Date.now() };
    writeStorage(value);
    return value;
  }
  return null;
}

export function isBookingUrl(href: string | null | undefined): boolean {
  return typeof href === "string" && BOOKING_HOSTS.some((host) => href.includes(host));
}

/** Append the stored click id (and campaign tags) to a booking-engine URL as a hash fragment. */
export function decorateBookingUrl(href: string, stored: StoredClickId | null = readStorage()): string {
  if (!stored || !isBookingUrl(href)) return href;
  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return href;
  }
  const hash = new URLSearchParams(url.hash.replace(/^#/, ""));
  let changed = false;
  for (const key of [...CLICK_PARAMS, ...CAMPAIGN_PARAMS]) {
    const value = stored[key];
    if (value && !hash.has(key)) {
      hash.set(key, value);
      changed = true;
    }
  }
  if (!changed) return href;
  url.hash = hash.toString();
  return url.toString();
}

/** Rewrite booking links at click time so the id is added only when someone actually leaves for the booking engine. */
export function installBookingLinkDecorator(): () => void {
  if (typeof document === "undefined") return () => {};
  const handler = (event: MouseEvent) => {
    const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
    if (!anchor || !isBookingUrl(anchor.href)) return;
    const next = decorateBookingUrl(anchor.href);
    if (next !== anchor.href) anchor.href = next;
  };
  document.addEventListener("click", handler, true);
  document.addEventListener("auxclick", handler, true);
  return () => {
    document.removeEventListener("click", handler, true);
    document.removeEventListener("auxclick", handler, true);
  };
}
