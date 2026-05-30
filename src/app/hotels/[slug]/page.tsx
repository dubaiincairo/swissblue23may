import { notFound } from "next/navigation";
import { FaqAccordion } from "@/components/faq-accordion";
import { FeatureChipGrid } from "@/components/feature-chip";
import PhotoGalleryLightbox from "@/components/photo-gallery-lightbox";
import PropertyMap from "@/components/property-map";
import { rich } from "@/components/rich-text";
import { CtaBand, PageHero, PageShell } from "@/components/site";
import { hotels, propertyGallerySupplement } from "@/lib/content";
import { getEditableContent, isSectionHidden, BOOKING_URL } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return hotels.map((hotel) => ({ slug: hotel.slug }));
}

export default async function HotelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { ar, hiddenSections } = await getEditableContent();
  const hotel = ar.homepage.properties.items.find((item) => item.slug === slug);
  const classification = ar.subpages.roomsSuites.classifications.find(
    (item) => item.property === hotel?.title,
  );

  if (!hotel) {
    notFound();
  }

  return (
    <PageShell>
      <PageHero
        eyebrow={`${hotel.city} | ${hotel.type}`}
        title={hotel.title}
        text={hotel.summary}
        image={hotel.image}
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">تموضع الوجهة</span>
          <h2>{rich(hotel.title)}</h2>
          <p>{rich(hotel.positioning)}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="stat-tile">
              <div className="text-2xl font-bold text-[var(--primary)]">{rich(hotel.units)}</div>
              <div className="mt-1 text-sm font-semibold text-[var(--text-secondary)]">
                إجمالي الوحدات
              </div>
            </div>
            <div className="stat-tile">
              <div className="text-2xl font-bold text-[var(--primary)]">{rich(hotel.city)}</div>
              <div className="mt-1 text-sm font-semibold text-[var(--text-secondary)]">
                المدينة
              </div>
            </div>
          </div>
          <a className="btn btn-primary mt-8" href={BOOKING_URL}>
            تحقق من التوفر
          </a>
        </div>

        <div className="grid gap-4">
          <div className="content-card reveal-slide-up" style={{ "--delay": "100ms" } as React.CSSProperties}>
            <span className="eyebrow">إبراز الموقع</span>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
              {rich(hotel.locationHighlight)}
            </p>
          </div>
          <div className="content-card reveal-slide-up" style={{ "--delay": "200ms" } as React.CSSProperties}>
            <span className="eyebrow">معالم قريبة</span>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {hotel.landmarks.map((item) => (
                <li key={item}>{rich(item)}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">أنواع الوحدات</span>
          <h2>فئات إقامة واضحة مع عدد الوحدات لكل فئة.</h2>
          <p>
            تساعد هذه الفئات الضيف أو مسؤول الحجز على اختيار المساحة المناسبة
            حسب مدة الإقامة وعدد الضيوف وسبب الرحلة.
          </p>
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
                {rich("type" in unit
                  ? `${unit.bedrooms} غرفة نوم | ${unit.bedConfig} | ${unit.view} | أرقام الغرف: ${unit.rooms}`
                  : unit.description)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">المرافق والخدمات</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[46px]">
            ما يحتاجه الضيف داخل هذه الوجهة.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
            تعرض كل صفحة فندق الخدمات المتوقعة في الوجهة نفسها حتى تصبح
            المقارنة بين الفنادق والشقق أكثر وضوحا.
          </p>
        </div>
        <FeatureChipGrid items={hotel.amenities} variant="check" columns={2} />
      </section>

      <PropertyMap city={hotel.city} locale="ar" query={hotel.mapQuery} title={hotel.title} />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">معرض الصور</span>
          <h2>لمحة بصرية عن تجربة الإقامة.</h2>
        </div>
        <div className="mt-8">
          <PhotoGalleryLightbox
            images={Array.from(
              new Set([...hotel.gallery, ...propertyGallerySupplement]),
            )
              .slice(0, 6)
              .map((image, index) => ({
                image,
                title: `${hotel.title} صورة ${index + 1}`,
              }))}
            locale="ar"
            variant="property"
          />
        </div>
      </section>

      {!isSectionHidden(hiddenSections, "propertyFaq") && (
      <section className="faq-section mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8" dir="rtl">
        <div className="faq-heading reveal-slide-up">
          <span className="eyebrow">أسئلة هذا الفرع</span>
          <h2>معلومات مهمة عن {rich(hotel.title)}.</h2>
        </div>
        <FaqAccordion items={ar.faq.property} />
      </section>
      )}

      <CtaBand title={`احجز إقامتك في ${hotel.title}.`} cta="تحقق من التوفر" />
    </PageShell>
  );
}
