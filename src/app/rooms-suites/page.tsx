import { CtaBand, PageHero, PageShell } from "@/components/site";
import { heroImage, stayCategories } from "@/lib/content";

export default function RoomsSuitesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="الغرف والأجنحة"
        title="غرف وأجنحة سهلة الاختيار."
        text="صممت فئات الغرف في سويس بلو لتجعل الحجز أكثر وضوحا، مع وعد واضح لكل فئة من حيث الراحة والمساحة والغرض المناسب للإقامة."
        image={heroImage}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stayCategories.map((room) => (
            <article className="stay-card" key={room.title}>
              <span>{room.subtitle}</span>
              <h3>{room.title}</h3>
              <p>{room.text}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="قارن الغرف المتاحة." cta="احجز غرفتك" />
    </PageShell>
  );
}
