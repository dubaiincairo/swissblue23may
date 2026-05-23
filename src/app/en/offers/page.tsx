import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { heroImage, offersEn } from "@/lib/content-en";

export default function OffersPageEn() {
  return <PageShellEn><PageHeroEn eyebrow="Offers" title="Offers for every way you travel." text="Find direct-booking offers designed around real guest needs, from business travel and family stays to long-stay comfort and weekend escapes." image={heroImage} /><section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{offersEn.map((offer) => <article className="offer-card" key={offer.title}><h3>{offer.title}</h3><p>{offer.text}</p></article>)}</div></section><CtaBandEn title="Start with the offer that fits your trip." cta="View availability" /></PageShellEn>;
}
