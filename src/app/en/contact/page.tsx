import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { BOOKING_URL, jeddahImage } from "@/lib/content-en";

const contactTopicsEn = ["Reservations", "Corporate bookings", "Meetings and events", "Long-stay inquiries", "Head office", "Property contacts"];

export default function ContactPageEn() {
  return <PageShellEn><PageHeroEn eyebrow="Contact" title="Our reservations team is ready to help." text="Reservations and guest support teams can help you choose the right hotel, room, suite, or serviced apartment." image={jeddahImage} /><section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8"><div className="grid gap-4 sm:grid-cols-2">{contactTopicsEn.map((topic) => <div className="content-card" key={topic}>{topic}</div>)}</div><div className="feature-panel"><span className="eyebrow">Direct booking</span><h2>Start by checking availability.</h2><p>Guests can check availability and book directly, while companies and groups can coordinate their requirements with the team.</p><a className="btn btn-primary mt-8" href={BOOKING_URL}>Check availability</a></div></section><CtaBandEn title="Choose your stay or contact us." cta="Book now" /></PageShellEn>;
}
