import { notFound } from "next/navigation";
import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { hotelsEn, servicesEn } from "@/lib/content-en";

export function generateStaticParams() {
  return hotelsEn.map((hotel) => ({ slug: hotel.slug }));
}

export default async function HotelDetailPageEn({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hotel = hotelsEn.find((item) => item.slug === slug);
  if (!hotel) notFound();
  return (
    <PageShellEn>
      <PageHeroEn eyebrow={hotel.city} title={hotel.title} text={hotel.summary} image={hotel.image} />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="feature-panel"><span className="eyebrow">Overview</span><h2>{hotel.title}</h2><p>{hotel.overview}</p><a className="btn btn-primary mt-8" href={hotel.source}>Visit hotel page</a></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="content-card"><span className="eyebrow">Stay categories</span><ul className="mt-4 space-y-3">{hotel.stayTypes.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="content-card"><span className="eyebrow">Nearby</span><ul className="mt-4 space-y-3">{hotel.nearby.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div className="section-heading"><span className="eyebrow">Services</span><h2>Practical comfort for every stay.</h2></div><div className="amenity-grid mt-8">{servicesEn.slice(0, 10).map((service) => <div className="amenity-pill" key={service}>{service}</div>)}</div></section>
      <CtaBandEn title="Book this Swiss Blue destination." cta="Check availability" />
    </PageShellEn>
  );
}
