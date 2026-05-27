import { CtaBand, PageHero, PageShell } from "@/components/site";
import { getEditableContent, BOOKING_URL } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const { ar } = await getEditableContent();
  const content = ar.subpages.contact;

  return (
    <PageShell>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {content.channels.map((channel, index) => (
            <article
              className="content-card reveal-slide-up"
              key={channel.title}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <span className="eyebrow">{channel.title}</span>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                {channel.text}
              </p>
            </article>
          ))}
        </div>
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">{content.bookingIntro.eyebrow}</span>
          <h2>{content.bookingIntro.title}</h2>
          <p>{content.bookingIntro.text}</p>
          <a className="btn btn-primary mt-8" href={BOOKING_URL}>
            تحقق من التوفر
          </a>
        </div>
      </section>
      <CtaBand title="اختر المسار الأنسب، وسنساعدك في الخطوة التالية." cta="احجز الآن" />
    </PageShell>
  );
}
