import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { corporateDealsEn, heroImage } from "@/lib/content-en";

const requiredDocumentsEn = [
  "Commercial registration or official company details",
  "VAT certificate when required",
  "Authorization letter for the approved representative",
  "Billing details and payment terms",
  "Guest list with arrival and departure dates",
  "Meeting and hospitality requirements if applicable",
];

export default function CorporateDealsPageEn() {
  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow="Corporate deals"
        title="Stay and contracting solutions for companies and groups."
        text="A professional path for team stays, delegations, meetings, and monthly accommodation, with clear communication and documentation requirements."
        image={heroImage}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <div className="feature-panel">
          <span className="eyebrow">For companies and official entities</span>
          <h2>From proposal request to booking confirmation.</h2>
          <p>
            The corporate deals team helps define requirements, compare
            properties, select unit categories, and prepare a professional
            proposal for internal review and approval.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {corporateDealsEn.map((item) => (
            <article className="content-card" key={item.title}>
              <span className="eyebrow">{item.title}</span>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div>
          <span className="eyebrow">Required documents</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[44px]">
            Clear requirements before official contracting.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
            Preparing documents early helps speed up pricing, approval, and
            confirmations for the team or delegation.
          </p>
        </div>
        <div className="amenity-grid">
          {requiredDocumentsEn.map((document) => (
            <div className="amenity-pill" key={document}>
              {document}
            </div>
          ))}
        </div>
      </section>
      <CtaBandEn title="Request a corporate or group proposal." cta="Contact specialist" />
    </PageShellEn>
  );
}
