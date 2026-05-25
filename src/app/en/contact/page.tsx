import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import ContactHandoff from "@/components/contact-handoff";
import { BOOKING_URL, contactChannelsEn, jeddahImage } from "@/lib/content-en";

export default async function ContactPageEn({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;

  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow="Contact us"
        title="Clear channels for booking, companies, and guest support."
        text="Start direct booking, contact the central reservation system, request support from the corporate deals specialist, or use SwissBlue Concierge AI for quick guidance."
        image={jeddahImage}
      />
      <ContactHandoff locale="en" source={query.source} message={query.message} />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {contactChannelsEn.map((channel) => (
            <article className="content-card" key={channel.title}>
              <span className="eyebrow">{channel.title}</span>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                {channel.text}
              </p>
            </article>
          ))}
        </div>
        <div className="feature-panel">
          <span className="eyebrow">Direct booking</span>
          <h2>Start by checking availability.</h2>
          <p>
            The direct booking link is the fastest path for individual guests,
            while contact channels support corporate, group, and detailed
            requests.
          </p>
          <a className="btn btn-primary mt-8" href={BOOKING_URL}>
            Check availability
          </a>
        </div>
      </section>
      <CtaBandEn title="Choose the right path, and we will help with the next step." cta="Book now" />
    </PageShellEn>
  );
}
