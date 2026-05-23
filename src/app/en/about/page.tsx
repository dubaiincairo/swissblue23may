import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { heroImage } from "@/lib/content-en";

const pillarsEn = ["Clear stay categories", "City convenience", "Business and family comfort", "Serviced-apartment flexibility", "Direct booking confidence"];

export default function AboutPageEn() {
  return <PageShellEn><PageHeroEn eyebrow="About" title="A Saudi hospitality portfolio with clearer choices." text="Swiss Blue Hotels offers hotels and serviced apartments across key city destinations, for guests who value clear choices, practical comfort, and warm service." image={heroImage} /><section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8"><div className="feature-panel"><span className="eyebrow">Brand philosophy</span><h2>A stay that makes sense from the first click.</h2><p>Swiss Blue turns rooms, suites, and apartments into easy-to-understand categories supported by practical services for business, family, and long-stay guests.</p></div><div className="grid gap-4 sm:grid-cols-2">{pillarsEn.map((pillar) => <div className="content-card" key={pillar}>{pillar}</div>)}</div></section><CtaBandEn title="Explore our hotels and serviced apartments." cta="View hotels" /></PageShellEn>;
}
