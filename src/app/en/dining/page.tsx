import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function DiningPageEn() {
  const { en } = await getEditableContent();
  const content = en.subpages.dining;

  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">{content.intro.eyebrow}</span>
          <h2>{content.intro.title}</h2>
          <p>{content.intro.text}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {content.options.map((item, index) => (
            <article
              className="stay-card reveal-slide-up"
              key={item.title}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <span>Food service</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBandEn title="Choose a stay that makes your day easier." cta="Book your stay" />
    </PageShellEn>
  );
}
