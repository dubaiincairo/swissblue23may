import Image from "next/image";
import { CtaBand, PageHero, PageShell } from "@/components/site";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function DestinationsPage() {
  const { ar } = await getEditableContent();
  const content = ar.subpages.destinationsPage;
  const destinations = ar.homepage.destinations.items;

  return (
    <PageShell>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6">
          {destinations.map((destination, index) => (
            <article
              className="property-card grid overflow-hidden lg:grid-cols-[0.86fr_1.14fr] reveal-slide-up"
              key={destination.title}
              style={{ "--delay": `${index * 120}ms` } as React.CSSProperties}
            >
              <figure className="relative min-h-[320px] overflow-hidden">
                <Image
                  className="object-cover"
                  src={destination.image}
                  alt={destination.title}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
              </figure>
              <div className="p-6 lg:p-8">
                <span className="eyebrow">وجهة سويس بلو</span>
                <h2 className="mt-4 text-3xl font-bold">{destination.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                  {destination.text}
                </p>
                <div className="mt-6">
                  <h3 className="text-lg font-bold">كيف تستمتع بالمدينة؟</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {destination.howToEnjoy.map((item, idx) => (
                      <li
                        className="amenity-pill reveal-elastic-pop"
                        key={item}
                        style={{ "--delay": `${idx * 60}ms` } as React.CSSProperties}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="اختر المدينة الأقرب لرحلتك." cta="احجز الآن" />
    </PageShell>
  );
}
