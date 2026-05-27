import { CtaBand, PageHero, PageShell } from "@/components/site";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function ServicedApartmentsPage() {
  const { ar } = await getEditableContent();
  const content = ar.subpages.servicedApartments;

  return (
    <PageShell>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.benefits.map((benefit, index) => (
            <div
              className="content-card reveal-slide-up"
              key={benefit}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
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
