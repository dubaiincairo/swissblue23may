import Image from "next/image";
import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { FeatureChipGrid } from "@/components/feature-chip";
import { PhotoStrip } from "@/components/photo-strip";
import { rich } from "@/components/rich-text";
import { getEditableContent, isSectionHidden } from "@/lib/editable-content";


export const dynamic = "force-dynamic";

export default async function DestinationsPageEn() {
  const { en, hiddenSections } = await getEditableContent();
  const content = en.subpages.destinationsPage;
  const destinations = en.homepage.destinations.items;

  return (
    <PageShellEn>
      {!isSectionHidden(hiddenSections, "destinationsSubpage") && (
      <>
      <PageHeroEn
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10">
          {destinations.map((destination, index) => {
            const photos = destination.photos ?? [destination.image];
            const stats = destination.stats ?? [];
            const stripImages = photos.map((src, idx) => ({
              src,
              alt: `${destination.title} - photo ${idx + 1}`,
            }));

            return (
              <article
                className="destination-card reveal-slide-up"
                key={destination.title}
                style={{ "--delay": `${index * 120}ms` } as React.CSSProperties}
              >
                <div className="destination-card-head">
                  <figure className="destination-card-cover">
                    {destination.badge ? (
                      <span className="destination-card-badge">{rich(destination.badge)}</span>
                    ) : null}
                    <Image
                      className="object-cover"
                      src={destination.image}
                      alt={destination.title}
                      fill
                      sizes="(min-width: 1024px) 46vw, 100vw"
                    />
                  </figure>
                  <div className="destination-card-copy">
                    <span className="eyebrow">Swiss Blue destination</span>
                    <h2>{rich(destination.title)}</h2>
                    <p>{rich(destination.text)}</p>
                    {stats.length ? (
                      <div className="destination-card-stats">
                        {stats.map((stat) => (
                          <div className="destination-card-stat" key={stat.label}>
                            <span>{rich(stat.label)}</span>
                            <strong>{rich(stat.value)}</strong>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="destination-card-section">
                  <h3>
                    <span className="eyebrow">How to enjoy</span>
                    The best things to do in {rich(destination.title)}.
                  </h3>
                  <div className="mt-5">
                    <FeatureChipGrid items={destination.howToEnjoy} variant="compass" columns={2} />
                  </div>
                </div>

                <div className="destination-card-section">
                  <h3>
                    <span className="eyebrow">City gallery</span>
                    Glimpses of {rich(destination.title)} from a guest&apos;s lens.
                  </h3>
                  <div className="mt-5">
                    <PhotoStrip
                      images={stripImages}
                      locale="en"
                      ariaLabel={`${destination.title} photos`}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <CtaBandEn title="Pick the city closest to your trip." cta="Book now" />
      </>
      )}
    </PageShellEn>
  );
}
