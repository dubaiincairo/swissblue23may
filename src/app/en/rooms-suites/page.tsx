import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { heroImage, stayCategoriesEn } from "@/lib/content-en";

export default function RoomsSuitesPageEn() {
  return <PageShellEn><PageHeroEn eyebrow="Rooms and suites" title="Rooms and suites made easy to choose." text="Swiss Blue room categories make booking clearer, with each room or suite communicating comfort, space, and the right stay purpose." image={heroImage} /><section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{stayCategoriesEn.map((room) => <article className="stay-card" key={room.title}><span>{room.subtitle}</span><h3>{room.title}</h3><p>{room.text}</p></article>)}</div></section><CtaBandEn title="Compare available rooms." cta="Book your room" /></PageShellEn>;
}
