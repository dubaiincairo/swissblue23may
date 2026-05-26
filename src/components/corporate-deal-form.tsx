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
    sector: "Company sector",
    contact: "Contact person",
    jobTitle: "Job title",
    email: "Business email",
    phone: "Mobile number",
    city: "Preferred city",
    propertyType: "Preferred property type",
    requestType: "Request type",
    guests: "Expected guests",
    units: "Rooms or apartments",
    arrival: "Expected arrival",
    departure: "Expected departure",
    budget: "Target budget",
    documents: "Documents available",
    preferredContact: "Preferred contact method",
    message: "Additional requirements",
    submit: "Send business request",
    success: "Request prepared. A corporate specialist can now follow up with the submitted details.",
  },
  ar: {
    eyebrow: "نموذج الشركات",
    title: "أرسل طلب إقامة أو تعاقد للشركات.",
    text: "شاركنا احتياج الجهة، التواريخ المتوقعة، عدد الوحدات، وحالة المستندات ليتمكن فريق الشركات من تجهيز عرض أدق.",
    company: "اسم الشركة أو الجهة",
    sector: "قطاع الشركة",
    contact: "اسم المسؤول",
    jobTitle: "المسمى الوظيفي",
    email: "البريد الرسمي",
    phone: "رقم الجوال",
    city: "المدينة المفضلة",
    propertyType: "نوع المنشأة المفضل",
    requestType: "نوع الطلب",
    guests: "عدد الضيوف المتوقع",
    units: "عدد الغرف أو الشقق",
    arrival: "تاريخ الوصول المتوقع",
    departure: "تاريخ المغادرة المتوقع",
    budget: "الميزانية المستهدفة",
    documents: "المستندات المتوفرة",
    preferredContact: "طريقة التواصل المفضلة",
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
          <ul className="b2b-form-steps">
            <li>{isArabic ? "تحديد الاحتياج وعدد الضيوف" : "Define the stay need and guest volume"}</li>
            <li>{isArabic ? "مراجعة المستندات والتفاصيل التجارية" : "Review documents and business details"}</li>
            <li>{isArabic ? "تجهيز عرض مناسب للمراجعة والاعتماد" : "Prepare a proposal for review and approval"}</li>
          </ul>
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
            <span>{t.sector}</span>
            <select name="sector" required>
              <option value="">{isArabic ? "اختر القطاع" : "Select sector"}</option>
              <option>{isArabic ? "جهة حكومية" : "Government entity"}</option>
              <option>{isArabic ? "شركة خاصة" : "Private company"}</option>
              <option>{isArabic ? "وكالة سفر أو منظم فعاليات" : "Travel agency or event organizer"}</option>
              <option>{isArabic ? "منظمة غير ربحية" : "Non-profit organization"}</option>
              <option>{isArabic ? "قطاع آخر" : "Other sector"}</option>
            </select>
          </label>
          <label>
            <span>{t.contact}</span>
            <input name="contact" required />
          </label>
          <label>
            <span>{t.jobTitle}</span>
            <input name="jobTitle" placeholder={isArabic ? "مثال: مدير الموارد البشرية" : "Example: HR manager"} />
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
            <span>{t.propertyType}</span>
            <select name="propertyType" required>
              <option value="">{isArabic ? "اختر نوع المنشأة" : "Select property type"}</option>
              <option>{isArabic ? "فندق" : "Hotel"}</option>
              <option>{isArabic ? "شقق فندقية" : "Apart-hotel"}</option>
              <option>{isArabic ? "شقق مخدومة" : "Serviced apartments"}</option>
              <option>{isArabic ? "مرونة حسب العرض" : "Flexible by proposal"}</option>
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
            <span>{t.guests}</span>
            <input name="guests" type="number" min="1" placeholder={isArabic ? "مثال: 45" : "Example: 45"} />
          </label>
          <label>
            <span>{t.units}</span>
            <input name="units" placeholder={isArabic ? "مثال: 20 غرفة" : "Example: 20 rooms"} />
          </label>
          <label>
            <span>{t.arrival}</span>
            <input name="arrival" type="date" />
          </label>
          <label>
            <span>{t.departure}</span>
            <input name="departure" type="date" />
          </label>
          <label>
            <span>{t.budget}</span>
            <input name="budget" placeholder={isArabic ? "مثال: 450 ريال لليلة" : "Example: SAR 450 per night"} />
          </label>
          <label>
            <span>{t.documents}</span>
            <select name="documents">
              <option>{isArabic ? "السجل التجاري وخطاب التفويض متوفران" : "Commercial registration and authorization letter are available"}</option>
              <option>{isArabic ? "بعض المستندات متوفرة" : "Some documents are available"}</option>
              <option>{isArabic ? "نحتاج إلى قائمة المتطلبات" : "We need the document checklist"}</option>
            </select>
          </label>
          <label>
            <span>{t.preferredContact}</span>
            <select name="preferredContact">
              <option>{isArabic ? "مكالمة هاتفية" : "Phone call"}</option>
              <option>{isArabic ? "واتساب" : "WhatsApp"}</option>
              <option>{isArabic ? "بريد إلكتروني" : "Email"}</option>
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
