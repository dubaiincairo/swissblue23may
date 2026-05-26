import Image from "next/image";
import Link from "next/link";
import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { heroImage } from "@/lib/content-en";
import { getEditableContent } from "@/lib/editable-content";

export default async function HotelsPageEn() {
  const { en } = await getEditableContent();
  const hotelsEn = en.homepage.properties.items;

  return (
    <PageShellEn>
      <PageHeroEn eyebrow="Our hotels and serviced apartments" title="A clear hospitality portfolio in Jeddah, Jazan, and Riyadh." text="Explore Swiss Blue destinations across Saudi Arabia, from business-ready city hotels to serviced apartments for families and extended stays." image={heroImage} />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading"><span className="eyebrow">Choose your destination</span><h2>Every property serves a clear guest need.</h2><p>Compare city, stay type, space, and purpose before moving into the booking journey.</p></div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {hotelsEn.map((hotel) => (
            <article className="property-card" key={hotel.slug}>
              <figure className="relative h-72 overflow-hidden"><Image className="object-cover transition duration-500 hover:scale-105" src={hotel.image} alt={hotel.title} fill sizes="(min-width: 1024px) 33vw, 100vw" /></figure>
              <div className="p-5"><div className="flex items-center justify-between gap-4 text-xs font-bold text-[var(--primary)]"><span>{hotel.city}</span><span>{hotel.units}</span></div><h3 className="mt-4 text-2xl font-bold">{hotel.title}</h3><p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{hotel.summary}</p><Link className="mt-6 inline-flex text-sm font-bold text-[var(--primary)]" href={`/en/hotels/${hotel.slug}`}>View details</Link></div>
            </article>
          ))}
        </div>
      </section>
      <CtaBandEn title="Choose your hotel and book with confidence." cta="Check availability" />
    </PageShellEn>
  );
}
