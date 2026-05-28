import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { rich } from "@/components/rich-text";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function FeedbackPageEn() {
  const { en } = await getEditableContent();
  const content = en.subpages.feedbackPage;

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
          <span className="eyebrow">{rich(content.intro.eyebrow)}</span>
          <h2>{rich(content.intro.title)}</h2>
          <p>{rich(content.intro.text)}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {content.channels.map((channel, index) => (
            <article
              className="content-card reveal-slide-up"
              key={channel.title}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <span className="eyebrow">{rich(channel.title)}</span>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                {rich(channel.text)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">How we handle your feedback</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[44px]">
            What happens after you send a message.
          </h2>
        </div>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.process.map((step, index) => (
            <li
              className="content-card reveal-slide-up"
              key={step.title}
              style={{ "--delay": `${index * 60}ms` } as React.CSSProperties}
            >
              <span className="text-2xl font-black text-[var(--primary)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="eyebrow mt-3 block">{rich(step.title)}</span>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                {rich(step.text)}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">{rich(content.categoriesIntro.eyebrow)}</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[44px]">
            {rich(content.categoriesIntro.title)}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
            {rich(content.categoriesIntro.text)}
          </p>
        </div>
        <div className="amenity-grid">
          {content.categories.map((category, index) => (
            <div
              className="amenity-pill reveal-elastic-pop"
              key={category}
              style={{ "--delay": `${index * 40}ms` } as React.CSSProperties}
            >
              {rich(category)}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">{rich(content.escalationIntro.eyebrow)}</span>
          <h2>{rich(content.escalationIntro.title)}</h2>
          <p>{rich(content.escalationIntro.text)}</p>
        </div>
      </section>

      <CtaBandEn title="We listen. Share a complaint or suggestion now." cta="Write to us" />
    </PageShellEn>
  );
}
