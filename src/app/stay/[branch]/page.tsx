import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingBar from "@/components/booking-bar";
import { FeatureChipGrid } from "@/components/feature-chip";
import PhotoGalleryLightbox from "@/components/photo-gallery-lightbox";
import PropertyMap from "@/components/property-map";
import { rich } from "@/components/rich-text";
import { PageShell, resolveMediaImage } from "@/components/site";
import {
  AD_LANDING_BRANCHES,
  DIRECT_BOOKING_DISCOUNT,
  HOTLINE_DISPLAY,
  HOTLINE_TEL,
  findAdLandingBranch,
} from "@/lib/ad-landing-branches";
import { getEditableContent, normalizePropertyAmenities } from "@/lib/editable-content";

// Google Ads landing page for one branch: the branch page reordered for guests coming from an ad —
// booking first, then the photo album, the direct-booking offer, room types, contact numbers and the map.
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
  const hotel = ar.homepage.properties.items.find(
    (item) => item.slug === branch.propertySlug,
  );
  if (!hotel) {
    notFound();
  }

  const bookingUrl = hotel.bookingUrl || branch.bookingUrl;
  const classification = ar.subpages.roomsSuites.classifications.find(
    (item) => item.property === hotel.title,
  );
  const propertyGallery = ar.media.propertyGalleries.items.find(
    (item) => item.slug === hotel.slug,
  );
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
      <section className="subpage-hero relative overflow-hidden">
        <Image
          className="absolute inset-0 h-full w-full object-cover kenburns-active"
          src={resolveMediaImage(hotel.image, ar.media)}
          alt=""
          fill
          preload
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(8,28,70,0.84),rgba(18,70,168,0.56)_52%,rgba(8,28,70,0.14))]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 text-white sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <span className="hero-kicker reveal-slide-down">
              {rich(`${hotel.city} | ${hotel.type}`)}
            </span>
            <h1 className="t-h1 mt-5 max-w-4xl reveal-slide-up">{rich(hotel.title)}</h1>
            <p
              className="mt-6 max-w-3xl text-base leading-8 text-white/82 sm:text-lg reveal-slide-up"
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
          <div className="w-full max-w-[390px] justify-self-end">
            <BookingBar
              properties={[
                {
                  slug: hotel.slug,
                  title: hotel.title,
                  city: hotel.city,
                  bookingUrl,
                },
              ]}
              locale="ar"
              labels={ar.ui.bookingBar}
            />
          </div>
        </div>
      </section>

      <section id="photos" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">ألبوم الصور</span>
          <h2>{rich(`شاهد ${hotel.title} قبل الحجز.`)}</h2>
          <p>صور حقيقية للغرف والشقق والمرافق. اضغط على أي صورة لتكبيرها.</p>
        </div>
        <div className="mt-8">
          <PhotoGalleryLightbox images={galleryImages} locale="ar" variant="property" />
        </div>
      </section>

      <section id="offers" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-12 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">العروض</span>
          <h2>{rich(`خصم ${DIRECT_BOOKING_DISCOUNT} عند الحجز المباشر.`)}</h2>
          <p>احجز مباشرة من موقعنا لتحصل على أفضل سعر متاح وتأكيد فوري للحجز.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="offer-card reveal-slide-up">
            <h3>{rich(`خصم ${DIRECT_BOOKING_DISCOUNT} على جميع الغرف`)}</h3>
            <p>يُطبَّق الخصم تلقائياً عند الحجز المباشر، دون رمز ترويجي.</p>
          </article>
          <article
            className="offer-card reveal-slide-up"
            style={{ "--delay": "80ms" } as React.CSSProperties}
          >
            <h3>{rich(`أقل من مواقع الحجز الأخرى بنسبة ${DIRECT_BOOKING_DISCOUNT}`)}</h3>
            <p>السعر على موقعنا أقل من أسعار مواقع الحجز الوسيطة لنفس الغرفة ونفس التواريخ.</p>
          </article>
          <article
            className="offer-card reveal-slide-up"
            style={{ "--delay": "160ms" } as React.CSSProperties}
          >
            <h3>تأكيد فوري</h3>
            <p>اختر التواريخ والغرفة وأكمل الحجز في دقائق، ويصلك التأكيد مباشرة.</p>
          </article>
        </div>
        <div className="mt-8">
          <a className="btn btn-primary" href={bookingUrl}>
            احجز الآن
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">أنواع الوحدات</span>
          <h2>اختر المساحة المناسبة لإقامتك.</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(classification?.rows ?? hotel.unitTypes).map((unit, index) => (
            <article
              className="unit-card reveal-slide-up"
              key={"type" in unit ? `${unit.type}-${unit.rooms}` : unit.title}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <span>
                {rich("totalUnits" in unit ? `${unit.totalUnits} وحدة` : unit.count)}
              </span>
              <h3>{rich("type" in unit ? unit.type : unit.title)}</h3>
              <p>
                {rich(
                  "type" in unit
                    ? `${unit.bedrooms} غرفة نوم | ${unit.bedConfig} | ${unit.view}`
                    : unit.description,
                )}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <a className="btn btn-primary" href={bookingUrl}>
            تحقق من التوفر والأسعار
          </a>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">تواصل معنا</span>
          <h2>نسعد بخدمتك على مدار الساعة.</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a className="stat-tile" href={HOTLINE_TEL}>
              <div className="text-2xl font-bold text-[var(--primary)]" dir="ltr">
                {HOTLINE_DISPLAY}
              </div>
              <div className="mt-1 text-sm font-semibold text-[var(--text-secondary)]">
                الرقم الموحد
              </div>
            </a>
            <Link className="stat-tile" href={`/wa/${branch.slug}`}>
              <div className="text-2xl font-bold text-[var(--primary)]" dir="ltr">
                +966 12 679 0008
              </div>
              <div className="mt-1 text-sm font-semibold text-[var(--text-secondary)]">
                واتساب
              </div>
            </Link>
          </div>
        </div>
        <div className="content-card reveal-slide-up">
          <span className="eyebrow">المرافق والخدمات</span>
          <div className="mt-6">
            <FeatureChipGrid
              items={normalizePropertyAmenities(hotel.slug, hotel.amenities, "ar")}
              variant="check"
              columns={2}
            />
          </div>
        </div>
      </section>

      <PropertyMap city={hotel.city} locale="ar" query={hotel.mapQuery} title={hotel.title} />

      <section className="closing-cta mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-[var(--bluehost-deep)] px-6 py-12 text-white sm:px-10 lg:px-14 reveal-scale-up">
          <div className="relative max-w-3xl">
            <span className="eyebrow text-white/72">احجز مباشرة</span>
            <h2 className="t-h2 mt-4">{rich(`احجز إقامتك في ${hotel.title} الآن.`)}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/76">
              {rich(`خصم ${DIRECT_BOOKING_DISCOUNT} عند الحجز المباشر، وتأكيد فوري.`)}
            </p>
            <a className="btn btn-hero mt-8 bg-white text-[var(--primary)]" href={bookingUrl}>
              احجز الآن
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
