import { usableLogo } from "@/lib/editable-content";
import type { PageLocale } from "@/lib/page-seo";
import { loadSiteContent } from "@/lib/site-metadata";

/** Logo and hero still used by the locale 404 pages. */
export async function notFoundArtwork(locale: PageLocale) {
  const { ar, en } = await loadSiteContent();
  const own = locale === "ar" ? ar : en;
  const slides = own.media.mainHeroSlides ?? [];
  const background =
    slides.find((slide) => slide.kind !== "video" && slide.source)?.source || own.media.mainHero;
  const logo =
    locale === "ar"
      ? usableLogo(ar.media.arabicLogo) || usableLogo(en.media.logo)
      : usableLogo(en.media.logo) || usableLogo(ar.media.arabicLogo);
  return { logo, background };
}
