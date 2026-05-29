import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { rich } from "@/components/rich-text";
import { getEditableContent, isSectionHidden } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function CentralReservationPageEn() {
  const { en, hiddenSections } = await getEditableContent();
  const content = en.subpages.reservationOfficePage;

  return (
    <PageShellEn>
      {!isSectionHidden(hiddenSections, "reservationOfficeSubpage") && (
        <>
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
              {channel.href ? (
                <a
                  className="mt-3 inline-block text-lg font-bold text-[var(--primary)] hover:underline"
                  href={channel.href}
                >
                  {rich(channel.value)}
                </a>
              ) : (
                <p className="mt-3 text-lg font-bold text-[var(--primary)]">
                  {rich(channel.value)}
                </p>
              )}
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                {rich(channel.text)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">{rich(content.servicesIntro.eyebrow)}</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[44px]">
            {rich(content.servicesIntro.title)}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
            {rich(content.servicesIntro.text)}
          </p>
        </div>
        <div className="amenity-grid">
          {content.services.map((service, index) => (
            <div
              className="amenity-pill reveal-elastic-pop"
              key={service}
              style={{ "--delay": `${index * 40}ms` } as React.CSSProperties}
            >
              {rich(service)}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">{rich(content.benefitsIntro.eyebrow)}</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[44px]">
            {rich(content.benefitsIntro.title)}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
            {rich(content.benefitsIntro.text)}
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {content.benefits.map((item, index) => (
            <article
              className="content-card reveal-slide-up"
              key={item.title}
              style={{ "--delay": `${index * 60}ms` } as React.CSSProperties}
            >
              <span className="eyebrow">{rich(item.title)}</span>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                {rich(item.text)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <CtaBandEn title="Direct booking, best rates, more flexibility." cta="Check availability" />
        </>
      )}
    </PageShellEn>
  );
}
