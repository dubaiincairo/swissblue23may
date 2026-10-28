import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingBar from "@/components/booking-bar";
import { FeatureChipGrid } from "@/components/feature-chip";
import GalleryPreview from "@/components/gallery-preview";
import { STAY_AMENITIES, StayFooter, StayHotlineBanner } from "@/components/stay-extras";
import HeroMediaCarousel from "@/components/hero-media-carousel";
import { rich } from "@/components/rich-text";
import { PageShellEn, resolveMediaImage } from "@/components/site-en";
import {
  AD_LANDING_BRANCHES,
  DIRECT_BOOKING_DISCOUNT,
  findAdLandingBranch,
} from "@/lib/ad-landing-branches";
import { getEditableContent } from "@/lib/editable-content";
import { isComingSoonProperty } from "@/lib/property-availability";

// English Google Ads landing page for one branch (Arabic: src/app/stay/[branch]): the homepage hero and booking widget (same markup and
// component, this branch preselected), then the branch photo album, then amenities and services.
// Booking links go to the branch's letsbook.me page; the click-id forwarder in the layout adds the ad click id.

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return AD_LANDING_BRANCHES.map((branch) => ({ branch: branch.slug }));
}

export default async function StayLandingPageEn({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch: slug } = await params;
  const branch = findAdLandingBranch(slug);
  if (!branch) {
    notFound();
  }

  const { en } = await getEditableContent();
  const home = en.homepage;
  const hotel = home.properties.items.find((item) => item.slug === branch.propertySlug);
  if (!hotel) {
    notFound();
  }

  const bookingUrl = hotel.bookingUrl || branch.bookingUrl;
  // Same property list as the homepage booking widget, with this branch first so it is preselected.
  const bookingProperties = home.properties.items
    .filter((item) => !isComingSoonProperty(item.slug))
    .sort((a, b) => Number(b.slug === hotel.slug) - Number(a.slug === hotel.slug))
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      city: item.city,
      bookingUrl: item.bookingUrl,
    }));

  const propertyGallery = en.media.propertyGalleries.items.find((item) => item.slug === hotel.slug);
  const galleryImages = (propertyGallery?.gallery ?? [])
    .filter((item) => {
      const image = typeof item === "string" ? item : item.image;
      return image && image !== hotel.image;
    })
    .map((item, index) => ({
      image: typeof item === "string" ? item : item.image,
      title:
        typeof item === "string"
          ? `${hotel.title} photo ${index + 1}`
          : item.title || `${hotel.title} photo ${index + 1}`,
      showHeadline: typeof item === "string" ? false : item.showHeadline === true,
    }));

  return (
    <PageShellEn footer={<StayFooter locale="en" />}>
      <section id="top" className="hotel-hero home-hero relative">
        <HeroMediaCarousel
          fallbackImage={resolveMediaImage(hotel.image, en.media)}
          fallbackAlt={hotel.title}
        />
        <div className="home-hero-overlay home-hero-overlay-ltr" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,var(--background))]" />

        <div className="home-hero-shell">
          <div className="home-hero-layout">
            <div className="home-hero-copy text-white">
              <div className="stay-kicker-row reveal-slide-down">
                <span className="hero-kicker">{rich(`${hotel.city} | ${hotel.type}`)}</span>
                <Link className="hero-kicker" href={`/stay/${branch.slug}`} hrefLang="ar" lang="ar">
                  العربية
                </Link>
              </div>
              <h1 className="t-hero reveal-slide-up">{rich(hotel.title)}</h1>
              <p
                className="home-hero-summary reveal-slide-up"
                style={{ "--delay": "150ms" } as React.CSSProperties}
              >
                {rich(hotel.summary)}
              </p>
              <div
                className="home-hero-actions reveal-slide-up"
                style={{ "--delay": "300ms" } as React.CSSProperties}
              >
                <a className="btn btn-primary btn-hero" href={bookingUrl}>
                  Book now, {DIRECT_BOOKING_DISCOUNT} off
                </a>
                <Link className="btn btn-glass" href="#photos">
                  Photo album
                </Link>
              </div>
            </div>

            <div className="home-hero-booking">
              <BookingBar properties={bookingProperties} locale="en" labels={en.ui.bookingBar} />
            </div>
          </div>
        </div>
      </section>

      <section id="photos" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-12 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">Photo gallery</span>
          <h2>{rich(`A visual look at ${hotel.title}.`)}</h2>
        </div>
        <div className="mt-8">
          <GalleryPreview images={galleryImages} locale="en" />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">Amenities and services</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[46px]">
            What guests need at this property.
          </h2>
        </div>
        <FeatureChipGrid
          items={STAY_AMENITIES.en}
          variant="check"
          columns={2}
          className="stay-amenities"
        />
      </section>

      <StayHotlineBanner locale="en" />
    </PageShellEn>
  );
}
