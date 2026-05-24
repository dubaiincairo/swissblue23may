import { CtaBand, PageHero, PageShell } from "@/components/site";
import { heroImage, hotels } from "@/lib/content";

const roomCategories = hotels
  .flatMap((hotel) =>
    hotel.unitTypes.map((unit) => ({
      ...unit,
      hotel: hotel.title,
    })),
  )
  .slice(0, 9);

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
          {roomCategories.map((room) => (
            <article className="stay-card" key={room.title}>
              <span>{room.hotel} | {room.count}</span>
              <h3>{room.title}</h3>
              <p>{room.description}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="قارن الغرف المتاحة." cta="احجز غرفتك" />
    </PageShell>
  );
}
