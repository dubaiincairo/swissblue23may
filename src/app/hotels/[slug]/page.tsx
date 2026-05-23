import { notFound } from "next/navigation";
import { CtaBand, PageHero, PageShell } from "@/components/site";
import { hotels, services } from "@/lib/content";

export function generateStaticParams() {
  return hotels.map((hotel) => ({ slug: hotel.slug }));
}

export default async function HotelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hotel = hotels.find((item) => item.slug === slug);

  if (!hotel) {
    notFound();
  }

  return (
    <PageShell>
      <PageHero
        eyebrow={hotel.city}
        title={hotel.title}
        text={hotel.summary}
        image={hotel.image}
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="feature-panel">
          <span className="eyebrow">نظرة عامة</span>
          <h2>{hotel.title}</h2>
          <p>{hotel.overview}</p>
          <a className="btn btn-primary mt-8" href={hotel.source}>
            زيارة صفحة الفندق
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="content-card">
            <span className="eyebrow">فئات الإقامة</span>
            <ul className="mt-4 space-y-3">
              {hotel.stayTypes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="content-card">
            <span className="eyebrow">قريب من</span>
            <ul className="mt-4 space-y-3">
              {hotel.nearby.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="section-heading">
          <span className="eyebrow">الخدمات</span>
          <h2>راحة عملية تدعم كل إقامة.</h2>
        </div>
        <div className="amenity-grid mt-8">
          {services.slice(0, 10).map((service) => (
            <div className="amenity-pill" key={service}>
              {service}
            </div>
          ))}
        </div>
      </section>

      <CtaBand title="احجز إقامتك في هذه الوجهة." cta="تحقق من التوفر" />
    </PageShell>
  );
}
