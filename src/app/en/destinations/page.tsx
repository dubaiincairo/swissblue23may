import Image from "next/image";
import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { destinationsEn, heroImage } from "@/lib/content-en";

export default function DestinationsPageEn() {
  return <PageShellEn><PageHeroEn eyebrow="Destinations" title="Stay across Saudi Arabia." text="Swiss Blue connects guests to practical, well-located stays in some of Saudi Arabia's most active city destinations." image={heroImage} /><section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><div className="grid gap-5 lg:grid-cols-3">{destinationsEn.map((destination) => <article className="property-card" key={destination.title}><figure className="relative h-72 overflow-hidden"><Image className="object-cover transition duration-500 hover:scale-105" src={destination.image} alt={destination.title} fill sizes="(min-width: 1024px) 33vw, 100vw" /></figure><div className="p-5"><h2 className="text-2xl font-bold">{destination.title}</h2><p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{destination.text}</p></div></article>)}</div></section><CtaBandEn title="Choose the city that fits your trip." cta="Book now" /></PageShellEn>;
}
