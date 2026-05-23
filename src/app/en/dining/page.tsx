import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { jeddahImage } from "@/lib/content-en";

const diningItemsEn = [
  { title: "Breakfast", text: "Start the day with a practical breakfast experience for business and family stays." },
  { title: "Restaurant and cafe", text: "Easy on-property options for a comfortable meal or quick meeting during the day." },
  { title: "Room service", text: "Added convenience for guests who prefer in-room dining where the service is available." },
  { title: "Meeting refreshments", text: "Practical refreshments and hospitality support for groups and business meetings." },
];

export default function DiningPageEn() {
  return <PageShellEn><PageHeroEn eyebrow="Dining" title="Dining made comfortable." text="Start the day with breakfast, enjoy convenient cafe and restaurant options, and make your stay easier with practical dining services across selected Swiss Blue properties." image={jeddahImage} /><section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{diningItemsEn.map((item) => <article className="stay-card" key={item.title}><span>Dining</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section><CtaBandEn title="Make your stay more comfortable." cta="Book your stay" /></PageShellEn>;
}
