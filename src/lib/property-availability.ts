export const JAZAN_PROPERTY_SLUG = "swiss-blue-jazan";
export const ALSAMER_PROPERTY_SLUG = "al-samer-serviced-apartments";

// Properties shown as "coming soon": their cards carry the badge, are not linked, and their
// hotel / ad-landing pages return 404. Jazan is not open yet; Alsamer was switched to this
// state on 4 Nov 2026 at the owner's request (the branch keeps its booking engine, Google
// Ads account and WhatsApp number for when it reopens).
const COMING_SOON_PROPERTY_SLUGS = new Set([JAZAN_PROPERTY_SLUG, ALSAMER_PROPERTY_SLUG]);

export function isComingSoonProperty(slug: string) {
  return COMING_SOON_PROPERTY_SLUGS.has(slug);
}

export function isComingSoonCity(city: string) {
  const normalized = city.trim().toLocaleLowerCase("en");
  return normalized.startsWith("jazan") || normalized.startsWith("جازان");
}

export function comingSoonLabel(locale: "ar" | "en") {
  return locale === "ar" ? "قريباً" : "Coming soon";
}
