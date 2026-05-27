import { CtaBand, PageHero, PageShell } from "@/components/site";
import { heroImage } from "@/lib/content";

const groupBookingItems = [
  "تنسيق قوائم الضيوف وتواريخ الوصول والمغادرة",
  "توزيع أنواع الغرف والشقق حسب احتياج المجموعة",
  "دعم حجوزات الوفود والفرق والزيارات الرسمية",
  "إمكانية ربط الإقامة بالاجتماعات أو الضيافة عند الحاجة",
];

export default function GroupBookingsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="حجوزات المجموعات"
        title="تنسيق احترافي لإقامة الفرق والوفود."
        text="مسار مخصص لتنظيم حجوزات المجموعات في منشآت سويس بلو، من اختيار المدينة والفئات المناسبة إلى تأكيد التواريخ واحتياجات الضيوف."
        image={heroImage}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">للشركات والوفود</span>
          <h2>حجز مجموعة واحدة يحتاج إلى تفاصيل واضحة.</h2>
          <p>
            يساعد فريق سويس بلو في تنظيم احتياج المجموعة، مقارنة المنشآت، وتأكيد
            فئات الإقامة بطريقة مهنية وسهلة المتابعة.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {groupBookingItems.map((item, index) => (
            <article
              className="content-card reveal-slide-up"
              key={item}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              {item}
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="اطلب تنسيق إقامة لمجموعتك." cta="تواصل مع المختص" />
    </PageShell>
  );
}
