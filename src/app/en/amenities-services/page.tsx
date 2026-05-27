import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function AmenitiesServicesPageEn() {
  const { en } = await getEditableContent();
  const content = en.subpages.amenitiesServices;
  const services = en.homepage.services.items;

  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="amenity-grid">
          {services.map((service, index) => (
            <div
              className="amenity-pill reveal-elastic-pop"
              key={service}
              style={{ "--delay": `${index * 40}ms` } as React.CSSProperties}
            >
              {service}
            </div>
          ))}
        </div>
      </section>
      <CtaBandEn title="Book a stay with the essentials covered." cta="Book now" />
    </PageShellEn>
  );
}
