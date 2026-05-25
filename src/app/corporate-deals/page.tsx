import { CtaBand, PageHero, PageShell } from "@/components/site";
import { corporateDeals, heroImage } from "@/lib/content";

const requiredDocuments = [
  "السجل التجاري أو بيانات المنشأة الرسمية",
  "شهادة ضريبة القيمة المضافة عند الحاجة",
  "خطاب تفويض للممثل المعتمد",
  "بيانات الفوترة وشروط الدفع",
  "قائمة الضيوف وتواريخ الوصول والمغادرة",
  "متطلبات الاجتماعات والضيافة إن وجدت",
];

export default function CorporateDealsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="تعاقدات الشركات"
        title="حلول إقامة وتعاقد للشركات والمجموعات."
        text="مسار مهني لحجوزات الفرق والوفود والاجتماعات والإقامات الشهرية، مع تواصل واضح ومتطلبات توثيق تساعد على إنجاز التعاقد بثقة."
        image={heroImage}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <div className="feature-panel">
          <span className="eyebrow">للشركات والجهات الرسمية</span>
          <h2>من طلب العرض إلى تأكيد الحجز.</h2>
          <p>
            يساعد فريق صفقات الشركات في تنظيم الاحتياج، مقارنة الوجهات، تحديد
            فئات الوحدات، وتجهيز عرض مهني قابل للمراجعة والاعتماد الداخلي.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {corporateDeals.map((item) => (
            <article className="content-card" key={item.title}>
              <span className="eyebrow">{item.title}</span>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div>
          <span className="eyebrow">المستندات المطلوبة</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[44px]">
            متطلبات واضحة قبل التعاقد الرسمي.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
            وجود المستندات من البداية يسرع التسعير، الاعتماد، وإصدار التأكيدات
            للفريق أو الوفد.
          </p>
        </div>
        <div className="amenity-grid">
          {requiredDocuments.map((document) => (
            <div className="amenity-pill" key={document}>
              {document}
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="اطلب عرضا للشركات أو المجموعات." cta="تواصل مع المختص" />
    </PageShell>
  );
}
