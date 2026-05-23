import { CtaBand, PageHero, PageShell } from "@/components/site";
import { jeddahImage } from "@/lib/content";

const diningItems = [
  {
    title: "الإفطار",
    text: "ابدأ يومك ببوفيه إفطار عملي يناسب رحلات العمل والإقامات العائلية.",
  },
  {
    title: "المطعم والمقهى",
    text: "خيارات سهلة داخل الوجهة لتناول وجبة مريحة أو لقاء سريع خلال اليوم.",
  },
  {
    title: "خدمة الغرف",
    text: "راحة إضافية للضيوف الذين يفضلون تناول الطعام داخل الغرفة عند توفر الخدمة.",
  },
  {
    title: "ضيافة الاجتماعات",
    text: "مرطبات وخيارات ضيافة عملية للمجموعات واجتماعات الأعمال.",
  },
];

export default function DiningPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="المطاعم"
        title="تجربة طعام مريحة."
        text="ابدأ يومك بوجبة إفطار، واستمتع بخيارات المطعم والمقهى، واجعل إقامتك أسهل من خلال خدمات الطعام العملية في وجهات مختارة من سويس بلو."
        image={jeddahImage}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {diningItems.map((item) => (
            <article className="stay-card" key={item.title}>
              <span>تجربة طعام</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="اجعل إقامتك أكثر راحة." cta="احجز إقامتك" />
    </PageShell>
  );
}
