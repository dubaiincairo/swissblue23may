import { CtaBand, PageHero, PageShell } from "@/components/site";
import { diningOptions, jeddahImage } from "@/lib/content";

export default function DiningPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="المطاعم وخدمات الطعام"
        title="خيارات طعام عملية طوال الإقامة."
        text="من الإفطار إلى المقهى والمطعم وخدمة الغرف، تقدم سويس بلو تجربة طعام مريحة تخدم ضيف الأعمال والعائلة والضيف المقيم لفترة أطول."
        image={jeddahImage}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading">
          <span className="eyebrow">تجربة الطعام</span>
          <h2>كل خدمة طعام لها دور واضح في رحلة الضيف.</h2>
          <p>
            تختلف بعض الخدمات حسب الوجهة، لكن المحتوى يوضح ما يمكن توقعه ويجعل
            تجربة الإقامة أكثر اكتمالا واحترافية.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {diningOptions.map((item) => (
            <article className="stay-card" key={item.title}>
              <span>خدمة طعام</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="اختر إقامة تجعل يومك أسهل." cta="احجز إقامتك" />
    </PageShell>
  );
}
