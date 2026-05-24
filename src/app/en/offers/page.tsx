import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { heroImage, offersEn } from "@/lib/content-en";

const bookingBenefitsEn = [
  "Clearer category and rate before confirming the booking",
  "Direct support from the reservations team",
  "Priority handling of guest requests when available",
  "A useful path for families and monthly stays",
];

export default function OffersPageEn() {
  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow="Offers and special discounts"
        title="Offers built around the reason for stay."
        text="The offers page brings together family stays, monthly stays, and direct-booking benefits in a way that helps guests choose and communicate with confidence."
        image={heroImage}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading">
          <span className="eyebrow">Main offers</span>
          <h2>Clear paths for different guest needs.</h2>
          <p>
            Instead of generic offers, the page clarifies the actual need: a
            family needing space, a guest needing a monthly stay, or a customer
            looking for direct-booking benefits.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {offersEn.slice(0, 3).map((offer) => (
            <article className="offer-card" key={offer.title}>
              <h3>{offer.title}</h3>
              <p>{offer.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div>
          <span className="eyebrow">Direct booking benefits</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[46px]">
            Clearer value when guests start with Swiss Blue channels.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
            These benefits help the website move visitors from browsing to
            booking or contacting the team without confusing offer logic.
          </p>
        </div>
        <div className="amenity-grid">
          {bookingBenefitsEn.map((benefit) => (
            <div className="amenity-pill" key={benefit}>
              {benefit}
            </div>
          ))}
        </div>
      </section>
      <CtaBandEn title="Start with the offer that fits your trip." cta="View availability" />
    </PageShellEn>
  );
}
