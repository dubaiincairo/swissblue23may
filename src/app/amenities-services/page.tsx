import { CtaBand, PageHero, PageShell } from "@/components/site";
import { jazanImage, services } from "@/lib/content";

export default function AmenitiesServicesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="الخدمات والمرافق"
        title="خدمات مصممة حول راحتك."
        text="تدعم كل إقامة في سويس بلو مجموعة من الخدمات الأساسية التي تجعل السفر أسهل وأكثر راحة وموثوقية."
        image={jazanImage}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="amenity-grid">
          {services.map((service) => (
            <div className="amenity-pill" key={service}>
              {service}
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="احجز إقامة مدعومة بكل أساسيات الراحة." cta="احجز الآن" />
    </PageShell>
  );
}
