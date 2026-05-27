import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function MeetingsEventsPageEn() {
  const { en } = await getEditableContent();
  const content = en.subpages.meetingsEvents;

  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">{content.intro.eyebrow}</span>
          <h2>{content.intro.title}</h2>
          <p>{content.intro.text}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {content.deals.map((item, index) => (
            <article
              className="content-card reveal-slide-up"
              key={item.title}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <span className="eyebrow">{item.title}</span>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">{content.documentsIntro.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[44px]">
            {content.documentsIntro.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
            {content.documentsIntro.text}
          </p>
        </div>
        <div className="amenity-grid">
          {content.documents.map((document, index) => (
            <div
              className="amenity-pill reveal-elastic-pop"
              key={document}
              style={{ "--delay": `${index * 40}ms` } as React.CSSProperties}
            >
              {document}
            </div>
          ))}
        </div>
      </section>
      <CtaBandEn title="Request a corporate or group proposal." cta="Contact specialist" />
    </PageShellEn>
  );
}
