import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingBar from "@/components/booking-bar";
import { FeatureChipGrid } from "@/components/feature-chip";
import GalleryPreview from "@/components/gallery-preview";
import HeroMediaCarousel from "@/components/hero-media-carousel";
import { rich } from "@/components/rich-text";
import { PageShell, resolveMediaImage } from "@/components/site";
import {
  AD_LANDING_BRANCHES,
  DIRECT_BOOKING_DISCOUNT,
  findAdLandingBranch,
} from "@/lib/ad-landing-branches";
import { getEditableContent, normalizePropertyAmenities } from "@/lib/editable-content";
import { isComingSoonProperty } from "@/lib/property-availability";

// Google Ads landing page for one branch: the homepage hero and booking widget (same markup and
// component, this branch preselected), then the branch photo album, then amenities and services.
// Booking links go to the branch's letsbook.me page; the click-id forwarder in the layout adds the ad click id.

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return AD_LANDING_BRANCHES.map((branch) => ({ branch: branch.slug }));
}

export default async function StayLandingPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch: slug } = await params;
  const branch = findAdLandingBranch(slug);
  if (!branch) {
    notFound();
  }

  const { ar } = await getEditableContent();
  const home = ar.homepage;
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

  const propertyGallery = ar.media.propertyGalleries.items.find((item) => item.slug === hotel.slug);
  const galleryImages = (propertyGallery?.gallery ?? [])
    .filter((item) => {
      const image = typeof item === "string" ? item : item.image;
      return image && image !== hotel.image;
    })
    .map((item, index) => ({
      image: typeof item === "string" ? item : item.image,
      title:
        typeof item === "string"
          ? `${hotel.title} صورة ${index + 1}`
          : item.title || `${hotel.title} صورة ${index + 1}`,
      showHeadline: typeof item === "string" ? false : item.showHeadline === true,
    }));

  return (
    <PageShell>
      <section id="top" className="hotel-hero home-hero relative">
        <HeroMediaCarousel
          fallbackImage={resolveMediaImage(hotel.image, ar.media)}
          fallbackAlt={hotel.title}
        />
        <div className="home-hero-overlay home-hero-overlay-rtl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,var(--background))]" />

        <div className="home-hero-shell">
          <div className="home-hero-layout">
            <div className="home-hero-copy text-white">
              <span className="hero-kicker reveal-slide-down">{rich(`${hotel.city} | ${hotel.type}`)}</span>
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
                  احجز الآن بخصم {DIRECT_BOOKING_DISCOUNT}
                </a>
                <Link className="btn btn-glass" href="#photos">
                  ألبوم الصور
                </Link>
              </div>
            </div>

            <div className="home-hero-booking">
              <BookingBar properties={bookingProperties} locale="ar" labels={ar.ui.bookingBar} />
            </div>
          </div>
        </div>
      </section>

      <section id="photos" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-12 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">معرض الصور</span>
          <h2>{rich(`لمحة بصرية عن ${hotel.title}.`)}</h2>
        </div>
        <div className="mt-8">
          <GalleryPreview images={galleryImages} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">المرافق والخدمات</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[46px]">
            ما يحتاجه الضيف داخل هذه الوجهة.
          </h2>
        </div>
        <FeatureChipGrid
          items={normalizePropertyAmenities(hotel.slug, hotel.amenities, "ar")}
          variant="check"
          columns={2}
        />
      </section>
    </PageShell>
  );
}
