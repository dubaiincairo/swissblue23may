import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function AboutPageEn() {
  const { en } = await getEditableContent();
  const content = en.subpages.about;

  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="feature-panel reveal-slide-left">
          <span className="eyebrow">{content.philosophy.eyebrow}</span>
          <h2>{content.philosophy.title}</h2>
          <p>{content.philosophy.text}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {content.pillars.map((pillar, index) => (
            <div
              className="content-card reveal-slide-up"
              key={pillar}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              {pillar}
            </div>
          ))}
        </div>
      </section>
      <CtaBandEn title="Explore our hotels and serviced apartments." cta="View hotels" />
    </PageShellEn>
  );
}
