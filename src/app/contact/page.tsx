import { CtaBand, PageHero, PageShell } from "@/components/site";
import { BOOKING_URL, jeddahImage } from "@/lib/content";

const contactTopics = [
  "الحجوزات",
  "حجوزات الشركات",
  "الاجتماعات والمناسبات",
  "استفسارات الإقامة الطويلة",
  "المكتب الرئيسي",
  "تواصل مع كل وجهة",
];

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="تواصل معنا"
        title="فريق الحجوزات جاهز لمساعدتك."
        text="فرق الحجوزات ودعم الضيوف جاهزة لمساعدتك في اختيار الفندق أو الغرفة أو الجناح أو الشقة الفندقية المناسبة."
        image={jeddahImage}
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {contactTopics.map((topic) => (
            <div className="content-card" key={topic}>
              {topic}
            </div>
          ))}
        </div>
        <div className="feature-panel">
          <span className="eyebrow">الحجز المباشر</span>
          <h2>ابدأ بطلب التوفر.</h2>
          <p>
            يمكن للضيوف التحقق من التوفر والحجز مباشرة، كما يمكن للشركات
            والمجموعات استخدام نموذج التواصل لتنسيق احتياجاتهم.
          </p>
          <a className="btn btn-primary mt-8" href={BOOKING_URL}>
            تحقق من التوفر
          </a>
        </div>
      </section>
      <CtaBand title="اختر إقامتك أو تواصل معنا." cta="احجز الآن" />
    </PageShell>
  );
}
