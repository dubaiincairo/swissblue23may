import NotFoundView from "@/components/not-found-view";
import { usableLogo } from "@/lib/editable-content";
import { loadSiteContent } from "@/lib/site-metadata";

export default async function NotFound() {
  const { ar, en } = await loadSiteContent();
  const slides = en.media.mainHeroSlides ?? [];
  const background =
    slides.find((slide) => slide.kind !== "video" && slide.source)?.source || en.media.mainHero;
  const logo = usableLogo(en.media.logo) || usableLogo(ar.media.arabicLogo);
  return <NotFoundView locale="en" logo={logo} background={background} />;
}
