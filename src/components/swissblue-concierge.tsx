"use client";

import { useMemo, useState } from "react";

type Locale = "ar" | "en";
type Lead = {
  name: string;
  contact: string;
  city: string;
  need: string;
};

const quickAnswers = {
  en: [
    {
      question: "Booking and availability",
      answer: "Sama can guide you to direct booking, compare cities, and prepare your request for the reservations team.",
    },
    {
      question: "Corporate or monthly stay",
      answer: "For company rates, monthly accommodation, or group stays, Sama will collect your requirements and route them to the corporate deals specialist.",
    },
    {
      question: "Rooms and apartments",
      answer: "Swiss Blue offers hotel rooms, suites, apart-hotels, and serviced apartments across Jeddah, Riyadh, and Jazan.",
    },
  ],
  ar: [
    {
      question: "الحجز والتوفر",
      answer: "تساعدك سما في الوصول للحجز المباشر، مقارنة المدن، وتجهيز طلبك لفريق الحجوزات.",
    },
    {
      question: "الشركات أو الإقامة الشهرية",
      answer: "لأسعار الشركات أو الإقامات الشهرية أو حجوزات المجموعات، تجمع سما المتطلبات وتحولها لمختص التعاقدات.",
    },
    {
      question: "الغرف والشقق",
      answer: "تقدم سويس بلو غرفا وأجنحة وشققا فندقية وشققا مخدومة في جدة والرياض وجازان.",
    },
  ],
};

export default function SwissBlueConcierge({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [lead, setLead] = useState<Lead>({
    name: "",
    contact: "",
    city: "",
    need: "",
  });
  const isArabic = locale === "ar";

  const handoffMessage = useMemo(() => {
    const lines = isArabic
      ? [
          "طلب دعم من SwissBlue Concierge",
          `الاسم: ${lead.name || "-"}`,
          `وسيلة التواصل: ${lead.contact || "-"}`,
          `المدينة: ${lead.city || "-"}`,
          `الاحتياج: ${lead.need || "-"}`,
        ]
      : [
          "SwissBlue Concierge support request",
          `Name: ${lead.name || "-"}`,
          `Contact: ${lead.contact || "-"}`,
          `City: ${lead.city || "-"}`,
          `Need: ${lead.need || "-"}`,
        ];

    return lines.join("\n");
  }, [isArabic, lead]);

  const contactHref = `${isArabic ? "/contact" : "/en/contact"}?source=swissblue-concierge&message=${encodeURIComponent(handoffMessage)}`;

  return (
    <div className="concierge-widget" dir={isArabic ? "rtl" : "ltr"}>
      {open ? (
        <section className="concierge-panel" aria-label={isArabic ? "محادثة سما" : "Sama chat"}>
          <header>
            <div>
              <span>SwissBlue Concierge</span>
              <h2>{isArabic ? "سما" : "Sama"}</h2>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label={isArabic ? "إغلاق" : "Close"}>
              ×
            </button>
          </header>

          <div className="concierge-body">
            <div className="concierge-message">
              {isArabic
                ? "مرحبا، أنا سما. أستطيع الإجابة عن الأسئلة السريعة وتجهيز طلبك قبل تحويله لفريق خدمة العملاء."
                : "Hello, I am Sama. I can answer quick questions and prepare your request before handing it to a human service agent."}
            </div>

            <div className="concierge-quick">
              {quickAnswers[locale].map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>

            <div className="concierge-form">
              <label>
                <span>{isArabic ? "الاسم" : "Name"}</span>
                <input
                  value={lead.name}
                  onChange={(event) => setLead({ ...lead, name: event.target.value })}
                  placeholder={isArabic ? "اسم الضيف" : "Guest name"}
                />
              </label>
              <label>
                <span>{isArabic ? "رقم الجوال أو البريد" : "Mobile or email"}</span>
                <input
                  value={lead.contact}
                  onChange={(event) => setLead({ ...lead, contact: event.target.value })}
                  placeholder={isArabic ? "وسيلة التواصل" : "How can we reach you?"}
                />
              </label>
              <label>
                <span>{isArabic ? "المدينة" : "City"}</span>
                <select value={lead.city} onChange={(event) => setLead({ ...lead, city: event.target.value })}>
                  <option value="">{isArabic ? "اختر المدينة" : "Select city"}</option>
                  <option value={isArabic ? "جدة" : "Jeddah"}>{isArabic ? "جدة" : "Jeddah"}</option>
                  <option value={isArabic ? "الرياض" : "Riyadh"}>{isArabic ? "الرياض" : "Riyadh"}</option>
                  <option value={isArabic ? "جازان" : "Jazan"}>{isArabic ? "جازان" : "Jazan"}</option>
                </select>
              </label>
              <label>
                <span>{isArabic ? "كيف يمكننا مساعدتك؟" : "How can we help?"}</span>
                <textarea
                  value={lead.need}
                  onChange={(event) => setLead({ ...lead, need: event.target.value })}
                  placeholder={isArabic ? "اكتب سؤالك أو طلبك" : "Write your question or request"}
                  rows={3}
                />
              </label>
            </div>
          </div>

          <footer>
            <a className="btn btn-primary" href={contactHref}>
              {isArabic ? "تواصل مع موظف خدمة العملاء" : "Connect me to a human agent"}
            </a>
          </footer>
        </section>
      ) : null}

      <button className="concierge-launcher" type="button" onClick={() => setOpen(true)}>
        <span>S</span>
        <strong>{isArabic ? "سما" : "Sama"}</strong>
      </button>
    </div>
  );
}
