import { CtaBand, PageHero, PageShell } from "@/components/site";
import { rich } from "@/components/rich-text";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const { ar } = await getEditableContent();
  const content = ar.subpages.about;

  return (
    <PageShell>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="feature-panel reveal-slide-right">
          <span className="eyebrow">{rich(content.philosophy.eyebrow)}</span>
          <h2>{rich(content.philosophy.title)}</h2>
          <p>{rich(content.philosophy.text)}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {content.pillars.map((pillar, index) => (
            <div
              className="content-card reveal-slide-up"
              key={pillar}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              {rich(pillar)}
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="استكشف فنادقنا وشققنا الفندقية." cta="عرض الفنادق" />
    </PageShell>
  );
}
