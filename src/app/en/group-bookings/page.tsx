import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { heroImage } from "@/lib/content-en";

const groupBookingItemsEn = [
  "Guest list coordination with arrival and departure dates",
  "Room and apartment type allocation by group need",
  "Support for delegations, teams, and official visits",
  "Ability to connect accommodation with meetings or hospitality when needed",
];

export default function GroupBookingsPageEn() {
  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow="Group Bookings"
        title="Professional coordination for teams and delegations."
        text="A dedicated path for organizing group bookings across Swiss Blue properties, from city and category selection to dates and guest requirements."
        image={heroImage}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">For companies and delegations</span>
          <h2>Group stays need clear coordination.</h2>
          <p>
            The Swiss Blue team helps organize group needs, compare properties,
            and confirm stay categories in a professional, easy-to-follow way.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {groupBookingItemsEn.map((item, index) => (
            <article
              className="content-card reveal-slide-up"
              key={item}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              {item}
            </article>
          ))}
        </div>
      </section>
      <CtaBandEn title="Request accommodation coordination for your group." cta="Contact specialist" />
    </PageShellEn>
  );
}
