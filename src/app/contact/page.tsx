import { CtaBand, PageHero, PageShell } from "@/components/site";
import { BOOKING_URL, contactChannels, jeddahImage } from "@/lib/content";

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="تواصل معنا"
        title="قنوات واضحة للحجز، الشركات، وخدمة الضيوف."
        text="يمكنك بدء الحجز مباشرة، أو التواصل مع نظام الحجز المركزي، أو طلب دعم مختص صفقات الشركات، أو التواصل مع فريق خدمة الضيوف."
        image={jeddahImage}
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {contactChannels.map((channel, index) => (
            <article
              className="content-card reveal-slide-up"
              key={channel.title}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <span className="eyebrow">{channel.title}</span>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                {channel.text}
              </p>
            </article>
          ))}
        </div>
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">الحجز المباشر</span>
          <h2>ابدأ بطلب التوفر.</h2>
          <p>
            رابط الحجز المباشر هو أسرع مسار للضيوف الأفراد، بينما تدعم قنوات
            التواصل طلبات الشركات والمجموعات والأسئلة التفصيلية.
          </p>
          <a className="btn btn-primary mt-8" href={BOOKING_URL}>
            تحقق من التوفر
          </a>
        </div>
      </section>
      <CtaBand title="اختر المسار الأنسب، وسنساعدك في الخطوة التالية." cta="احجز الآن" />
    </PageShell>
  );
}
