/**
 * Per-page SEO helpers. Maps a request pathname to a page key and supplies a
 * sensible default <title> when the admin hasn't set a per-page override.
 *
 * Keys are the route slugs (e.g. "rooms-suites"); the editable per-page SEO map
 * lives at content[lang].seo.pages, keyed the same way.
 */

export type PageLocale = "ar" | "en";

const BRAND: Record<PageLocale, string> = {
  en: "Swiss Blue Hotels",
  ar: "سويس بلو للفنادق",
};

/** Route slug → human page name per language, used for default per-page titles. */
export const PAGE_NAMES: Record<string, { en: string; ar: string }> = {
  home: { en: "Swiss Blue Hotels", ar: "سويس بلو للفنادق" },
  about: { en: "About Us", ar: "من نحن" },
  "rooms-suites": { en: "Rooms & Suites", ar: "الغرف والأجنحة" },
  "serviced-apartments": { en: "Serviced Apartments", ar: "الشقق الفندقية" },
  "amenities-services": { en: "Amenities & Services", ar: "المرافق والخدمات" },
  dining: { en: "Dining", ar: "المطاعم" },
  "meetings-events": { en: "Meetings & Events", ar: "الاجتماعات والفعاليات" },
  loyalty: { en: "Loyalty Program", ar: "برنامج الولاء" },
  offers: { en: "Offers", ar: "العروض" },
  hotels: { en: "Our Hotels", ar: "فنادقنا" },
  destinations: { en: "Destinations", ar: "الوجهات" },
  "corporate-deals": { en: "Corporate Deals", ar: "عروض الشركات" },
  "group-bookings": { en: "Group Bookings", ar: "حجوزات المجموعات" },
  contact: { en: "Contact Us", ar: "اتصل بنا" },
  faq: { en: "FAQ", ar: "الأسئلة الشائعة" },
  policy: { en: "Hotel Policy", ar: "سياسة الفندق" },
  careers: { en: "Careers", ar: "الوظائف" },
  "social-responsibility": { en: "Social Responsibility", ar: "المسؤولية الاجتماعية" },
  "central-reservation": { en: "Central Reservation", ar: "الحجز المركزي" },
  feedback: { en: "Feedback", ar: "آراء الضيوف" },
};

/** All per-page SEO keys (used to seed the editable map / iterate). */
export const PAGE_KEYS = Object.keys(PAGE_NAMES);

/** Map a request pathname to a per-page SEO key (strips /en|/ar; "" → home). */
export function pageKeyFromPath(pathname: string | null | undefined): string {
  if (!pathname) return "home";
  const stripped = pathname.replace(/^\/(en|ar)(?=\/|$)/, "").replace(/^\/+|\/+$/g, "");
  if (!stripped) return "home";
  const first = stripped.split("/")[0]; // e.g. "hotels" for /hotels/jeddah
  return first || "home";
}

/** Default page <title> when no per-page override is set. */
export function defaultPageTitle(pageKey: string, locale: PageLocale, siteTitle: string): string {
  if (pageKey === "home") return siteTitle || BRAND[locale];
  const name = PAGE_NAMES[pageKey]?.[locale];
  return name ? `${name} | ${BRAND[locale]}` : siteTitle || BRAND[locale];
}
