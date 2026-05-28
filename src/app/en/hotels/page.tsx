import Image from "next/image";
import Link from "next/link";
import { rich } from "@/components/rich-text";
import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function HotelsPageEn() {
  const { en } = await getEditableContent();
  const content = en.subpages.hotelsPage;
  const hotelsEn = en.homepage.properties.items;

  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">{rich(content.intro.eyebrow)}</span>
          <h2>{rich(content.intro.title)}</h2>
          <p>{rich(content.intro.text)}</p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {hotelsEn.map((hotel, index) => (
            <article
              className="property-card reveal-slide-up"
              key={hotel.slug}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <figure className="relative h-72 overflow-hidden">
                <Image className="object-cover transition duration-500 hover:scale-105" src={hotel.image} alt={hotel.title} fill sizes="(min-width: 1024px) 33vw, 100vw" />
              </figure>
              <div className="p-5">
                <div className="flex items-center justify-between gap-4 text-xs font-bold text-[var(--primary)]">
                  <span>{rich(hotel.city)}</span>
                  <span>{rich(hotel.units)}</span>
                </div>
                <h3 className="mt-4 text-2xl font-bold">{rich(hotel.title)}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{rich(hotel.summary)}</p>
                <Link className="mt-6 inline-flex text-sm font-bold text-[var(--primary)]" href={`/en/hotels/${hotel.slug}`}>View details</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBandEn title="Choose your hotel and book with confidence." cta="Check availability" />
    </PageShellEn>
  );
}
