import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { jazanImage, servicesEn } from "@/lib/content-en";

export default function AmenitiesServicesPageEn() {
  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow="Services and amenities"
        title="Services designed around your stay."
        text="Every Swiss Blue stay is supported by essential services that make travel easier, more comfortable, and more reliable."
        image={jazanImage}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="amenity-grid">
          {servicesEn.map((service, index) => (
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
