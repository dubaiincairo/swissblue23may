import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function HotelPolicyPageEn() {
  const { en } = await getEditableContent();
  const content = en.subpages.hotelPolicy;

  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div className="feature-panel reveal-slide-left">
          <span className="eyebrow">{content.intro.eyebrow}</span>
          <h2>{content.intro.title}</h2>
          <p>{content.intro.text}</p>
        </div>
        <div className="policy-principles reveal-slide-right">
          <span className="eyebrow">Guiding principles</span>
          <div className="mt-2 grid gap-3">
            {content.principles.map((principle, index) => (
              <div
                className="policy-principle reveal-slide-up"
                key={principle}
                style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
              >
                <span className="policy-principle-mark">{index + 1}</span>
                <span>{principle}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-left">
          <span className="eyebrow">Policy details</span>
          <h2>The standards that apply to every stay.</h2>
          <p>
            A comprehensive set of policies in force across Swiss Blue hotels
            and serviced apartments. They keep the hospitality experience
            consistent and professional, in line with Saudi regulations and
            GCC industry best practice.
          </p>
        </div>
        <div className="mt-10 policy-grid">
          {content.sections.map((section, index) => (
            <article
              className="policy-card reveal-slide-up"
              key={section.title}
              style={{ "--delay": `${index * 60}ms` } as React.CSSProperties}
            >
              <div className="policy-card-head">
                <span className="policy-card-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{section.title}</h3>
              </div>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="policy-note reveal-scale-up">
          <span>Closing note</span>
          <h2>These policies are reviewed regularly.</h2>
          <p>
            Swiss Blue reserves the right to update these policies to reflect
            the latest Saudi regulations and Ministry of Tourism standards.
            Guests will be informed of any changes that may affect their stay.
            For any policy or booking-related question, our guest service team
            is always happy to help.
          </p>
        </div>
      </section>

      <CtaBandEn
        title="Have a question about your stay?"
        text="Our team is on hand around the clock to help with reservations, modifications, and anything related to the stay policies across Swiss Blue hotels and serviced apartments."
        cta="Contact us"
      />
    </PageShellEn>
  );
}
