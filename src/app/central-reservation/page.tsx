import { CtaBand, PageHero, PageShell } from "@/components/site";
import { FaqAccordion } from "@/components/faq-accordion";
import { rich } from "@/components/rich-text";
import { getEditableContent, isSectionHidden } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function CentralReservationPage() {
  const { ar, hiddenSections } = await getEditableContent();
  const content = ar.subpages.reservationOfficePage;

  return (
    <PageShell>
      {!isSectionHidden(hiddenSections, "reservationOfficeSubpage") && (
        <>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />

      <section className="reservation-command-section">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className="reservation-command-copy reveal-slide-up">
            <span className="eyebrow">{rich(content.intro.eyebrow)}</span>
            <h2>{rich(content.intro.title)}</h2>
            <p>{rich(content.intro.text)}</p>
            <div className="reservation-stat-strip" aria-label={content.statsIntro.title}>
              {(content.stats ?? []).map((stat, index) => (
                <div
                  className="reservation-stat reveal-scale-up"
                  key={stat.label}
                  style={{ "--delay": `${index * 60}ms` } as React.CSSProperties}
                >
                  <strong dir="auto">{rich(stat.value)}</strong>
                  <span>{rich(stat.label)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="reservation-channel-grid" aria-label="قنوات الحجز المباشر">
            {content.channels.map((channel, index) => (
              <article
                className="reservation-channel-card reveal-slide-up"
                key={channel.title}
                style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
              >
                <div className="reservation-channel-topline">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{rich(channel.title)}</h3>
                </div>
                <p>{rich(channel.text)}</p>
                {channel.href ? (
                  <a className="reservation-channel-action" href={channel.href} dir="ltr">
                    {rich(channel.value)}
                  </a>
                ) : (
                  <span className="reservation-channel-action" aria-label={channel.value} dir="auto">
                    {rich(channel.value)}
                  </span>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">{rich(content.servicesIntro.eyebrow)}</span>
          <h2>{rich(content.servicesIntro.title)}</h2>
          <p>{rich(content.servicesIntro.text)}</p>
        </div>
        <div className="reservation-service-grid mt-8">
          {content.services.map((service, index) => (
            <article
              className="reservation-service-card reveal-slide-up"
              key={service}
              style={{ "--delay": `${index * 55}ms` } as React.CSSProperties}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{rich(service)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reservation-benefits-band">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div className="reservation-benefits-copy reveal-slide-up">
            <span className="eyebrow">{rich(content.benefitsIntro.eyebrow)}</span>
            <h2>{rich(content.benefitsIntro.title)}</h2>
            <p>{rich(content.benefitsIntro.text)}</p>
          </div>
          <div className="reservation-benefit-grid">
            {content.benefits.map((item, index) => (
              <article
                className="reservation-benefit-card reveal-slide-up"
                key={item.title}
                style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
              >
                <span className="reservation-benefit-mark" aria-hidden="true">
                  ✓
                </span>
                <h3>{rich(item.title)}</h3>
                <p>{rich(item.text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">{rich(content.prepareIntro.eyebrow)}</span>
          <h2>{rich(content.prepareIntro.title)}</h2>
          <p>{rich(content.prepareIntro.text)}</p>
        </div>
        <div className="reservation-prep-panel reveal-scale-up">
          {(content.prepare ?? []).map((item, index) => (
            <div
              className="reservation-prep-item"
              key={item}
              style={{ "--delay": `${index * 50}ms` } as React.CSSProperties}
            >
              <span aria-hidden="true">✓</span>
              <p>{rich(item)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="reservation-faq-shell">
          <div className="section-heading reveal-slide-up">
            <span className="eyebrow">{rich(content.faqsIntro.eyebrow)}</span>
            <h2>{rich(content.faqsIntro.title)}</h2>
          </div>
          <div className="mt-8">
            <FaqAccordion items={content.faqs ?? []} />
          </div>
        </div>
      </section>

      <CtaBand eyebrow={ar.closingCtas.eyebrow} title={ar.closingCtas.pages.centralReservation.title} text={ar.closingCtas.defaultText} cta={ar.closingCtas.pages.centralReservation.cta} />
        </>
      )}
    </PageShell>
  );
}
