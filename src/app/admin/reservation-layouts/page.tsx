import ReservationLayoutLab from "@/components/admin/reservation-layout-lab";
import { requireAuthority } from "@/lib/admin-session";
import { BOOKING_URL, getEditableContent, usableLogo } from "@/lib/editable-content";
import { isComingSoonProperty } from "@/lib/property-availability";

export const dynamic = "force-dynamic";

function heroImageFrom(
  slides: Array<{ kind: string; source: string }>,
  fallback: string,
) {
  return slides.find((slide) => slide.kind !== "video" && slide.source)?.source || fallback;
}

export default async function ReservationLayoutsPage({
  searchParams,
}: {
  searchParams: Promise<{ locale?: string }>;
}) {
  await requireAuthority("content-any");
  const initialLocale = (await searchParams).locale === "ar" ? "ar" : "en";
  const { ar, en } = await getEditableContent();
  const arHome = ar.homepage;
  const enHome = en.homepage;
  const logo = usableLogo(en.media.logo) || usableLogo(ar.media.arabicLogo) || "";

  return (
    <ReservationLayoutLab
      bookingUrl={BOOKING_URL}
      initialLocale={initialLocale}
      previews={{
        en: {
          bestRateLabel: "Best available rate",
          bookLabel: en.ui.bookNow || "Book now",
          eyebrow: enHome.hero.eyebrow,
          helperText: "Choose the property for your stay",
          heroImage: heroImageFrom(en.media.mainHeroSlides, en.media.mainHero),
          heroText: enHome.hero.text,
          heroTitle: enHome.hero.title,
          logo,
          properties: enHome.properties.items
            .filter((property) => !isComingSoonProperty(property.slug))
            .map((property) => ({ city: property.city, slug: property.slug, title: property.title })),
          propertyLabel: "Property",
          secureLabel: "Secure booking",
        },
        ar: {
          bestRateLabel: "أفضل سعر متاح",
          bookLabel: ar.ui.bookNow || "احجز الآن",
          eyebrow: arHome.hero.eyebrow,
          helperText: "اختر المنشأة المناسبة لإقامتك",
          heroImage: heroImageFrom(ar.media.mainHeroSlides, ar.media.mainHero),
          heroText: arHome.hero.text,
          heroTitle: arHome.hero.title,
          logo,
          properties: arHome.properties.items
            .filter((property) => !isComingSoonProperty(property.slug))
            .map((property) => ({ city: property.city, slug: property.slug, title: property.title })),
          propertyLabel: "المنشأة",
          secureLabel: "حجز آمن",
        },
      }}
    />
  );
}
