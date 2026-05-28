import { rich } from "@/components/rich-text";
import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function GroupBookingsPageEn() {
  const { en } = await getEditableContent();
  const content = en.subpages.groupBookings;

  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">{rich(content.intro.eyebrow)}</span>
          <h2>{rich(content.intro.title)}</h2>
          <p>{rich(content.intro.text)}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {content.items.map((item, index) => (
            <article
              className="content-card reveal-slide-up"
              key={item}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              {rich(item)}
            </article>
          ))}
        </div>
      </section>
      <CtaBandEn title="Request accommodation coordination for your group." cta="Contact specialist" />
    </PageShellEn>
  );
}
