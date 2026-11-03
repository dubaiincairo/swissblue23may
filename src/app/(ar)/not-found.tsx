import NotFoundView from "@/components/not-found-view";
import { usableLogo } from "@/lib/editable-content";
import { loadSiteContent } from "@/lib/site-metadata";

export default async function NotFound() {
  const { ar, en } = await loadSiteContent();
  const slides = ar.media.mainHeroSlides ?? [];
  const background =
    slides.find((slide) => slide.kind !== "video" && slide.source)?.source || ar.media.mainHero;
  const logo = usableLogo(ar.media.arabicLogo) || usableLogo(en.media.logo);
  return <NotFoundView locale="ar" logo={logo} background={background} />;
}
