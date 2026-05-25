"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type Locale = "ar" | "en";

const fieldText = {
  en: {
    eyebrow: "B2B request form",
    title: "Send a corporate accommodation request.",
    text: "Share the business need, expected dates, units, and documentation status. The corporate team can use this information to prepare a more accurate proposal.",
    company: "Company name",
    contact: "Contact person",
    email: "Business email",
    phone: "Mobile number",
    city: "Preferred city",
    requestType: "Request type",
    units: "Expected rooms or apartments",
    dates: "Expected dates",
    documents: "Documents available",
    message: "Additional requirements",
    submit: "Send business request",
    success: "Request prepared. A corporate specialist can now follow up with the submitted details.",
  },
  ar: {
    eyebrow: "نموذج الشركات",
    title: "أرسل طلب إقامة أو تعاقد للشركات.",
    text: "شاركنا احتياج الجهة، التواريخ المتوقعة، عدد الوحدات، وحالة المستندات ليتمكن فريق الشركات من تجهيز عرض أدق.",
    company: "اسم الشركة أو الجهة",
    contact: "اسم المسؤول",
    email: "البريد الرسمي",
    phone: "رقم الجوال",
    city: "المدينة المفضلة",
    requestType: "نوع الطلب",
    units: "عدد الغرف أو الشقق المتوقع",
    dates: "التواريخ المتوقعة",
    documents: "المستندات المتوفرة",
    message: "متطلبات إضافية",
    submit: "إرسال الطلب",
    success: "تم تجهيز الطلب. يمكن لمختص الشركات متابعة التفاصيل المرسلة.",
  },
};

export default function CorporateDealForm({ locale }: { locale: Locale }) {
  const t = fieldText[locale];
  const isArabic = locale === "ar";
  const [status, setStatus] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(t.success);
    event.currentTarget.reset();
  }

  return (
    <section className="b2b-form-section mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" dir={isArabic ? "rtl" : "ltr"}>
      <div className="b2b-form-shell">
        <div className="b2b-form-intro">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>{t.title}</h2>
          <p>{t.text}</p>
          <div className="b2b-form-note">
            {isArabic
              ? "مناسب للجهات الحكومية، الشركات، الوفود، الإقامات الشهرية، والاجتماعات."
              : "Suitable for government entities, companies, delegations, monthly stays, and meetings."}
          </div>
        </div>

        <form className="b2b-form" onSubmit={submit}>
          <label>
            <span>{t.company}</span>
            <input name="company" required />
          </label>
          <label>
            <span>{t.contact}</span>
            <input name="contact" required />
          </label>
          <label>
            <span>{t.email}</span>
            <input name="email" type="email" required />
          </label>
          <label>
            <span>{t.phone}</span>
            <input name="phone" required />
          </label>
          <label>
            <span>{t.city}</span>
            <select name="city" required>
              <option value="">{isArabic ? "اختر" : "Select"}</option>
              <option>{isArabic ? "جدة" : "Jeddah"}</option>
              <option>{isArabic ? "الرياض" : "Riyadh"}</option>
              <option>{isArabic ? "جازان" : "Jazan"}</option>
              <option>{isArabic ? "أكثر من مدينة" : "Multiple cities"}</option>
            </select>
          </label>
          <label>
            <span>{t.requestType}</span>
            <select name="requestType" required>
              <option value="">{isArabic ? "اختر" : "Select"}</option>
              <option>{isArabic ? "سعر شركات" : "Corporate rate"}</option>
              <option>{isArabic ? "حجز مجموعة" : "Group booking"}</option>
              <option>{isArabic ? "إقامة شهرية" : "Monthly stay"}</option>
              <option>{isArabic ? "اجتماعات ومناسبات" : "Meetings and events"}</option>
            </select>
          </label>
          <label>
            <span>{t.units}</span>
            <input name="units" placeholder={isArabic ? "مثال: 20 غرفة" : "Example: 20 rooms"} />
          </label>
          <label>
            <span>{t.dates}</span>
            <input name="dates" placeholder={isArabic ? "مثال: 10-20 يونيو 2026" : "Example: 10-20 June 2026"} />
          </label>
          <label className="span-2">
            <span>{t.documents}</span>
            <select name="documents">
              <option>{isArabic ? "السجل التجاري وخطاب التفويض متوفران" : "Commercial registration and authorization letter are available"}</option>
              <option>{isArabic ? "بعض المستندات متوفرة" : "Some documents are available"}</option>
              <option>{isArabic ? "نحتاج إلى قائمة المتطلبات" : "We need the document checklist"}</option>
            </select>
          </label>
          <label className="span-2">
            <span>{t.message}</span>
            <textarea name="message" rows={5} placeholder={isArabic ? "اكتب تفاصيل الطلب أو عدد الضيوف أو شروط الدفع" : "Add guest count, payment terms, room setup, or any special needs"} />
          </label>

          <div className="b2b-form-actions span-2">
            <button className="btn btn-primary" type="submit">
              {t.submit}
            </button>
            {status ? <p>{status}</p> : null}
          </div>
        </form>
      </div>
    </section>
  );
}
