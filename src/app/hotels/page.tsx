import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageHero, PageShell } from "@/components/site";
import { heroImage } from "@/lib/content";
import { getEditableContent } from "@/lib/editable-content";

export default async function HotelsPage() {
  const { ar } = await getEditableContent();
  const hotels = ar.homepage.properties.items;

  return (
    <PageShell>
      <PageHero
        eyebrow="فنادقنا وشققنا الفندقية"
        title="محفظة ضيافة واضحة في جدة وجازان والرياض."
        text="استكشف وجهات سويس بلو في المملكة العربية السعودية، من الفنادق المناسبة لرحلات العمل إلى الشقق الفندقية للعائلات والإقامات الممتدة."
        image={heroImage}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">اختر وجهتك</span>
          <h2>كل وجهة مصممة حول احتياج واضح للضيف.</h2>
          <p>
            تساعد فئات الفنادق والشقق الضيوف على مقارنة المدينة ونوع الإقامة
            والمساحة المناسبة قبل الانتقال إلى الحجز.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {hotels.map((hotel, index) => (
            <article
              className="property-card reveal-slide-up"
              key={hotel.slug}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <figure className="relative h-72 overflow-hidden">
                <Image
                  className="object-cover transition duration-500 hover:scale-105"
                  src={hotel.image}
                  alt={hotel.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </figure>
              <div className="p-5">
                <div className="flex items-center justify-between gap-4 text-xs font-bold text-[var(--primary)]">
                  <span>{hotel.city}</span>
                  <span>{hotel.units}</span>
                </div>
                <h3 className="mt-4 text-2xl font-bold">{hotel.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  {hotel.summary}
                </p>
                <Link
                  className="mt-6 inline-flex text-sm font-bold text-[var(--primary)]"
                  href={`/hotels/${hotel.slug}`}
                >
                  عرض التفاصيل
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand title="اختر فندقك واحجز بثقة." cta="تحقق من التوفر" />
    </PageShell>
  );
}
