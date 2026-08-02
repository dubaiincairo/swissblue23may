import { CtaBand, PageHero, PageShell } from "@/components/site";
import { FaqAccordion } from "@/components/faq-accordion";
import { rich } from "@/components/rich-text";
import { getEditableContent, isSectionHidden } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function FeedbackPage() {
  const { ar, hiddenSections } = await getEditableContent();
  const content = ar.subpages.feedbackPage;

  return (
    <PageShell>
      {!isSectionHidden(hiddenSections, "feedbackSubpage") && (
        <>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">{rich(content.commitmentsIntro.eyebrow)}</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[44px]">
            {rich(content.commitmentsIntro.title)}
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(content.commitments ?? []).map((item, index) => (
            <article
              className="content-card reveal-slide-up"
              key={item.label}
              style={{ "--delay": `${index * 60}ms` } as React.CSSProperties}
            >
              <span className="text-3xl font-black text-[var(--primary)]">
                {rich(item.value)}
              </span>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                {rich(item.label)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">خطوات معالجة الملاحظة</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[44px]">
            ماذا يحدث بعد إرسال ملاحظتك؟
          </h2>
        </div>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.process.map((step, index) => (
            <li
              className="content-card feedback-process-card reveal-slide-up"
              key={step.title}
              style={{ "--delay": `${index * 60}ms` } as React.CSSProperties}
            >
              <div className="feedback-process-heading">
                <span className="feedback-process-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="feedback-process-title">{rich(step.title)}</span>
              </div>
              <p className="feedback-process-text">
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
              className="amenity-pill feedback-pill reveal-elastic-pop"
              key={category}
              style={{ "--delay": `${index * 40}ms` } as React.CSSProperties}
            >
              {rich(category)}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">{rich(content.includeIntro.eyebrow)}</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[44px]">
            {rich(content.includeIntro.title)}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
            {rich(content.includeIntro.text)}
          </p>
        </div>
        <div className="amenity-grid">
          {(content.include ?? []).map((item, index) => (
            <div
              className="amenity-pill feedback-pill reveal-elastic-pop"
              key={item}
              style={{ "--delay": `${index * 40}ms` } as React.CSSProperties}
            >
              {rich(item)}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">{rich(content.faqsIntro.eyebrow)}</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[44px]">
            {rich(content.faqsIntro.title)}
          </h2>
        </div>
        <div className="mt-10">
          <FaqAccordion items={content.faqs ?? []} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">{rich(content.escalationIntro.eyebrow)}</span>
          <h2>{rich(content.escalationIntro.title)}</h2>
          <p>{rich(content.escalationIntro.text)}</p>
        </div>
      </section>

      <CtaBand eyebrow={ar.closingCtas.eyebrow} title={ar.closingCtas.pages.feedback.title} text={ar.closingCtas.defaultText} cta={ar.closingCtas.pages.feedback.cta} />
        </>
      )}
    </PageShell>
  );
}
