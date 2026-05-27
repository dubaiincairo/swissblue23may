import Image from "next/image";
import { CtaBand, PageHero, PageShell } from "@/components/site";
import { FeatureChipGrid } from "@/components/feature-chip";
import { PhotoStrip } from "@/components/photo-strip";
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
        <div className="grid gap-10">
          {destinations.map((destination, index) => {
            const photos = destination.photos ?? [destination.image];
            const stats = destination.stats ?? [];
            const stripImages = photos.map((src, idx) => ({
              src,
              alt: `${destination.title} - صورة ${idx + 1}`,
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
                      <span className="destination-card-badge">{destination.badge}</span>
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
                    <span className="eyebrow">وجهة سويس بلو</span>
                    <h2>{destination.title}</h2>
                    <p>{destination.text}</p>
                    {stats.length ? (
                      <div className="destination-card-stats">
                        {stats.map((stat) => (
                          <div className="destination-card-stat" key={stat.label}>
                            <span>{stat.label}</span>
                            <strong>{stat.value}</strong>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="destination-card-section">
                  <h3>
                    <span className="eyebrow">كيف تستمتع</span>
                    أفضل ما يمكن تجربته في {destination.title}.
                  </h3>
                  <div className="mt-5">
                    <FeatureChipGrid items={destination.howToEnjoy} variant="compass" columns={2} />
                  </div>
                </div>

                <div className="destination-card-section">
                  <h3>
                    <span className="eyebrow">معرض المدينة</span>
                    لمحات من {destination.title} عبر عدسة الضيف.
                  </h3>
                  <div className="mt-5">
                    <PhotoStrip
                      images={stripImages}
                      locale="ar"
                      ariaLabel={`صور ${destination.title}`}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <CtaBand title="اختر المدينة الأقرب لرحلتك." cta="احجز الآن" />
    </PageShell>
  );
}
