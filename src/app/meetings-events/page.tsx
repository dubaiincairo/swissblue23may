import { CtaBand, PageHero, PageShell } from "@/components/site";
import { heroImage } from "@/lib/content";

const meetingItems = [
  "قاعات اجتماعات",
  "إقامة الشركات",
  "شقق أعمال للإقامات الطويلة",
  "حجوزات المجموعات",
  "ضيافة وخدمات أعمال",
  "مواقع عملية داخل المدن",
];

export default function MeetingsEventsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="الاجتماعات والمناسبات"
        title="اجتماعات وإقامات أعمال أكثر سهولة."
        text="تدعم سويس بلو ضيوف الأعمال من خلال مواقع عملية ومساحات اجتماعات وإنترنت موثوق وخيارات إقامة تناسب ليلة واحدة أو عدة أسابيع."
        image={heroImage}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="feature-panel">
          <span className="eyebrow">للشركات والمجموعات</span>
          <h2>حلول إقامة واجتماعات قابلة للتخصيص.</h2>
          <p>
            يمكن لفريق الحجوزات دعم طلبات الشركات والمجموعات والإقامات الطويلة
            من خلال خيارات فندقية وشقق مخدومة في مدن متعددة.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {meetingItems.map((item) => (
            <div className="content-card" key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="اطلب عرضا لاجتماعك أو إقامة فريقك." cta="تواصل مع الحجوزات" />
    </PageShell>
  );
}
