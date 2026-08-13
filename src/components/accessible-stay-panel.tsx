import { Accessibility } from "lucide-react";

export function AccessibleStayPanel({ locale }: { locale: "ar" | "en" }) {
  const isArabic = locale === "ar";
  const reservationHref = isArabic ? "/central-reservation" : "/en/central-reservation";

  return (
    <section
      className="accessible-stay-panel mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8"
      dir={isArabic ? "rtl" : "ltr"}
      aria-labelledby={`accessible-stay-heading-${locale}`}
    >
      <div className="accessible-stay-panel-card reveal-slide-up">
        <div className="accessible-stay-panel-icon" aria-hidden="true">
          <Accessibility size={28} strokeWidth={2} />
        </div>
        <div className="accessible-stay-panel-copy">
          <span className="eyebrow">
            {isArabic ? "إقامة مهيأة" : "Accessible stays"}
          </span>
          <h2 id={`accessible-stay-heading-${locale}`}>
            {isArabic
              ? "غرف مهيأة للضيوف من ذوي الهمم."
              : "Accessible rooms for guests with disabilities."}
          </h2>
          <p>
            {isArabic
              ? "تتوفر غرف مهيأة في جميع منشآتنا. يُرجى التواصل مع فريق الحجوزات لتأكيد التوفر واحتياجات الإتاحة المطلوبة قبل الوصول."
              : "Accessible rooms are available at every property. Please contact our reservations team before arrival to confirm availability and the accessibility support you need."}
          </p>
        </div>
        <a className="btn btn-primary accessible-stay-panel-action" href={reservationHref}>
          {isArabic ? "تواصل مع الحجوزات" : "Contact reservations"}
        </a>
      </div>
    </section>
  );
}
