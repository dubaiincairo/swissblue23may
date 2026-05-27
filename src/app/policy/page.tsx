import { CtaBand, PageHero, PageShell } from "@/components/site";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function HotelPolicyPage() {
  const { ar } = await getEditableContent();
  const content = ar.subpages.hotelPolicy;

  return (
    <PageShell>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div className="feature-panel reveal-slide-right">
          <span className="eyebrow">{content.intro.eyebrow}</span>
          <h2>{content.intro.title}</h2>
          <p>{content.intro.text}</p>
        </div>
        <div className="policy-principles reveal-slide-left">
          <span className="eyebrow">المبادئ الأساسية</span>
          <div className="mt-2 grid gap-3">
            {content.principles.map((principle, index) => (
              <div
                className="policy-principle reveal-slide-up"
                key={principle}
                style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
              >
                <span className="policy-principle-mark">{index + 1}</span>
                <span>{principle}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-right">
          <span className="eyebrow">تفاصيل السياسات</span>
          <h2>الأنظمة والإجراءات المعمول بها في كل إقامة.</h2>
          <p>
            مجموعة شاملة من السياسات المعتمدة عبر فنادق وشقق سويس بلو. تضمن هذه
            السياسات تجربة ضيافة موحدة ومهنية مع مراعاة الأنظمة المحلية وأفضل
            الممارسات في قطاع الضيافة الخليجي.
          </p>
        </div>
        <div className="mt-10 policy-grid">
          {content.sections.map((section, index) => (
            <article
              className="policy-card reveal-slide-up"
              key={section.title}
              style={{ "--delay": `${index * 60}ms` } as React.CSSProperties}
            >
              <div className="policy-card-head">
                <span className="policy-card-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{section.title}</h3>
              </div>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="policy-note reveal-scale-up">
          <span>ملاحظة ختامية</span>
          <h2>السياسات قابلة للمراجعة الدورية.</h2>
          <p>
            تحتفظ سويس بلو بحق تحديث هذه السياسات لتعكس آخر الأنظمة السعودية
            ومعايير هيئة السياحة، مع التأكيد على إبلاغ الضيف بأي تغييرات ذات صلة
            بإقامته. لأي استفسار مرتبط بالسياسات أو الحجوزات الخاصة، يسعد فريق
            خدمة الضيوف بتقديم المساعدة اللازمة.
          </p>
        </div>
      </section>

      <CtaBand
        title="هل لديكم سؤال حول الإقامة؟"
        text="فريقنا متاح على مدار الساعة لمساعدتكم في الحجوزات، التعديلات، وكل ما يتعلق بسياسات الإقامة في فنادق وشقق سويس بلو."
        cta="تواصل معنا"
      />
    </PageShell>
  );
}
