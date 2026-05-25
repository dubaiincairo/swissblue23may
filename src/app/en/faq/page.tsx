import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { faqsEn, heroImage } from "@/lib/content-en";

export default function FaqPageEn() {
  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow="FAQ"
        title="Quick answers before you book."
        text="Find useful information about accommodation types, direct booking, services, long stays, and corporate options."
        image={heroImage}
      />
      <section className="faq-section mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8" dir="ltr">
        <div className="faq-heading">
          <span className="eyebrow">Swiss Blue FAQ</span>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="faq-list">
          {faqsEn.map((faq) => (
            <details key={faq.question}>
              <summary>
                <span>{faq.question}</span>
                <strong aria-hidden="true">⌄</strong>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <CtaBandEn title="Still need help?" cta="Contact us" />
    </PageShellEn>
  );
}
