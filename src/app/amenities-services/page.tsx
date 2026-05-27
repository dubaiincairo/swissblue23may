import { CtaBand, PageHero, PageShell } from "@/components/site";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function AmenitiesServicesPage() {
  const { ar } = await getEditableContent();
  const content = ar.subpages.amenitiesServices;
  const services = ar.homepage.services.items;

  return (
    <PageShell>
      <PageHero
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
      <CtaBand title="احجز إقامة مدعومة بكل أساسيات الراحة." cta="احجز الآن" />
    </PageShell>
  );
}
