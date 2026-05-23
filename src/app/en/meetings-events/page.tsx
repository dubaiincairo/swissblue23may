import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { heroImage } from "@/lib/content-en";

const meetingItemsEn = ["Meeting rooms", "Corporate accommodation", "Long-stay business apartments", "Group bookings", "Refreshments and business services", "Practical city locations"];

export default function MeetingsEventsPageEn() {
  return <PageShellEn><PageHeroEn eyebrow="Meetings and events" title="Meetings and business stays made easier." text="Swiss Blue supports business travelers with practical locations, meeting spaces, reliable Wi-Fi, and stay options that work for one night or several weeks." image={heroImage} /><section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"><div className="feature-panel"><span className="eyebrow">For companies and groups</span><h2>Flexible stay and meeting solutions.</h2><p>The reservations team can support corporate, group, and long-stay requests with hotel rooms and serviced apartments across multiple cities.</p></div><div className="grid gap-4 sm:grid-cols-2">{meetingItemsEn.map((item) => <div className="content-card" key={item}>{item}</div>)}</div></section><CtaBandEn title="Request a meeting or team-stay proposal." cta="Contact reservations" /></PageShellEn>;
}
