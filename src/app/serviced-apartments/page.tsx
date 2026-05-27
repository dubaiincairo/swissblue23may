import { CtaBand, PageHero, PageShell } from "@/components/site";
import { accommodationCategories, jeddahImage, services } from "@/lib/content";

export default function ServicedApartmentsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="الشقق الفندقية"
        title="شقق فندقية لإقامات أطول وأسهل."
        text="تعد شقق سويس بلو خيارا مثاليا للعائلات وانتقالات العمل والزيارات الطويلة والضيوف الذين يفضلون مساحة أكبر مع خدمات فندقية."
        image={jeddahImage}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {accommodationCategories.slice(1).map((category, index) => (
            <article
              className="content-card reveal-slide-up"
              key={category.title}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <span className="eyebrow">{category.title}</span>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                {category.text}
              </p>
            </article>
          ))}
          {services.slice(-4).map((benefit, index) => (
            <div
              className="content-card reveal-slide-up"
              key={benefit}
              style={{ "--delay": `${(index + accommodationCategories.slice(1).length) * 80}ms` } as React.CSSProperties}
            >
              {benefit}
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="استكشف الشقق الفندقية واحجز مباشرة." cta="استعرض التوفر" />
    </PageShell>
  );
}
