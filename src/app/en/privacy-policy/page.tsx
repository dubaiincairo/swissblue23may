import { PageHeroEn, PageShellEn } from "@/components/site-en";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

const LAST_UPDATED = "25 October 2026";

const SECTIONS: { title: string; items: string[] }[] = [
  {
    title: "Data we collect",
    items: [
      "Booking data you give us: name, phone number, email, nationality or ID details required by Saudi hospitality regulations, payment details (processed by our booking provider and payment gateway; we do not store full card numbers), stay dates and preferences.",
      "Contact data when you message us by phone, email, WhatsApp or our website chat.",
      "Website usage data collected through cookies and analytics tools: pages visited, device and browser type, approximate location, referral source.",
    ],
  },
  {
    title: "Why we use it",
    items: [
      "To take, confirm and manage your reservation and your stay.",
      "To answer your enquiries and provide customer service.",
      "To meet legal obligations, including guest registration required by Saudi authorities.",
      "To measure and improve our website and marketing, including Google Analytics and Google Ads conversion measurement, which use aggregated or pseudonymous data.",
      "To send offers only if you have agreed to receive them; you can opt out at any time.",
    ],
  },
  {
    title: "Sharing",
    items: [
      "We share data only with service providers that help us operate: booking engine, payment gateway, messaging and email providers, and analytics and advertising platforms such as Google and Meta.",
      "We share data with authorities where the law requires it.",
      "We never sell your personal data.",
    ],
  },
  {
    title: "Google services",
    items: [
      "Our internal tools connect to Google services (Google Ads, Google Analytics) to report on our own advertising.",
      "These tools access only our own business accounts and aggregated performance data.",
      "They do not collect or process personal data of website visitors or guests beyond what is described in this policy.",
    ],
  },
  {
    title: "Cookies",
    items: [
      "We use necessary cookies to run the site, and analytics and advertising cookies to understand traffic and measure campaigns.",
      "You can block cookies in your browser; some features may then not work.",
    ],
  },
  {
    title: "Retention and security",
    items: [
      "We keep booking records for as long as required by Saudi law and accounting rules, and delete or anonymise other data when it is no longer needed.",
      "Data is stored with reputable providers using encryption in transit and access controls.",
    ],
  },
  {
    title: "Your rights",
    items: [
      "Under the Saudi Personal Data Protection Law you may ask to access, correct or delete your personal data, or object to marketing.",
      "Contact us at the address below; we respond within 30 days.",
    ],
  },
  {
    title: "Contact",
    items: [
      "Swiss Blue Hospitality Group, Jeddah, Saudi Arabia.",
      "Email: info@swissblue.sa · Website: https://swissblue.sa",
      "We may update this policy; the latest version is always published on this page.",
    ],
  },
];

export default async function PrivacyPolicyPageEn() {
  const { en } = await getEditableContent();

  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow="Privacy Policy"
        title="How Swiss Blue handles your personal data"
        text="Swiss Blue Hospitality Group operates hotels and serviced apartments in Jeddah and Riyadh, Saudi Arabia, and the website swissblue.sa. This policy explains what personal data we collect, why, and how we protect it."
        image={en.subpages.hotelPolicy.hero.image}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-left">
          <span className="eyebrow">Last updated: {LAST_UPDATED}</span>
          <h2>Privacy Policy</h2>
          <p>
            This policy applies to bookings made through swissblue.sa or our
            official booking links, to enquiries you send us, and to your use of
            this website.
          </p>
        </div>
        <div className="mt-10 policy-grid">
          {SECTIONS.map((section, index) => (
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
    </PageShellEn>
  );
}
