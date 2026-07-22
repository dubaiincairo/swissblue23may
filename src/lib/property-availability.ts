export const JAZAN_PROPERTY_SLUG = "swiss-blue-jazan";

export function isComingSoonProperty(slug: string) {
  return slug === JAZAN_PROPERTY_SLUG;
}

export function isComingSoonCity(city: string) {
  const normalized = city.trim().toLocaleLowerCase("en");
  return normalized.startsWith("jazan") || normalized.startsWith("جازان");
}

export function comingSoonLabel(locale: "ar" | "en") {
  return locale === "ar" ? "قريباً" : "Coming soon";
}
