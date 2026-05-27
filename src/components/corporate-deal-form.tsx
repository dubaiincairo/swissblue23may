"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";

type Locale = "ar" | "en";

const fieldText = {
  en: {
    eyebrow: "B2B request form",
    title: "Send a corporate accommodation request.",
    text: "Share the business need, expected dates, units, and documentation status. The corporate team can use this information to prepare a more accurate proposal.",
    step1Heading: "Step 1 of 2 · Basic information",
    step2Heading: "Step 2 of 2 · Stay details",
    step1Sub: "Tell us who you are and the best way to follow up.",
    step2Sub: "Now share the stay specifics so the proposal lands accurate.",
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
    continue: "Continue to stay details",
    back: "Back",
    submit: "Send business request",
    success: "Request prepared. A corporate specialist will follow up shortly.",
    closeModal: "Close",
    summaryHeading: "Step 1 confirmed",
  },
  ar: {
    eyebrow: "نموذج الشركات",
    title: "أرسل طلب إقامة أو تعاقد للشركات.",
    text: "شاركنا احتياج الجهة، التواريخ المتوقعة، عدد الوحدات، وحالة المستندات ليتمكن فريق الشركات من تجهيز عرض أدق.",
    step1Heading: "الخطوة 1 من 2 · المعلومات الأساسية",
    step2Heading: "الخطوة 2 من 2 · تفاصيل الإقامة",
    step1Sub: "عرفنا بالجهة وأفضل وسيلة للتواصل.",
    step2Sub: "أخبرنا الآن بتفاصيل الإقامة لإعداد عرض أدق.",
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
    continue: "متابعة إلى تفاصيل الإقامة",
    back: "رجوع",
    submit: "إرسال الطلب",
    success: "تم تجهيز الطلب. سيتابع مختص الشركات معك قريبا.",
    closeModal: "إغلاق",
    summaryHeading: "تم تأكيد الخطوة 1",
  },
};

type BasicData = {
  company: string;
  sector: string;
  contact: string;
  jobTitle: string;
  email: string;
  phone: string;
};

const emptyBasic: BasicData = {
  company: "",
  sector: "",
  contact: "",
  jobTitle: "",
  email: "",
  phone: "",
};

export default function CorporateDealForm({ locale }: { locale: Locale }) {
  const t = fieldText[locale];
  const isArabic = locale === "ar";
  const [basic, setBasic] = useState<BasicData>(emptyBasic);
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (modalOpen) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setModalOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modalOpen]);

  function handleBasicSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBasic({
      company: String(form.get("company") ?? ""),
      sector: String(form.get("sector") ?? ""),
      contact: String(form.get("contact") ?? ""),
      jobTitle: String(form.get("jobTitle") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
    });
    setStatus("");
    setModalOpen(true);
  }

  function handleFinalSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(t.success);
    setModalOpen(false);
    setBasic(emptyBasic);
    event.currentTarget.reset();
    const basicForm = document.querySelector<HTMLFormElement>("[data-corporate-form]");
    basicForm?.reset();
  }

  return (
    <section
      className="b2b-form-section mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="b2b-form-shell">
        <div className="b2b-form-intro">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>{t.title}</h2>
          <p>{t.text}</p>
          <ul className="b2b-form-steps">
            <li>{isArabic ? "تحديد الجهة وبيانات التواصل" : "Identify the entity and contact details"}</li>
            <li>{isArabic ? "إدخال تفاصيل الإقامة والوثائق" : "Add stay specifics and documentation"}</li>
            <li>{isArabic ? "تجهيز عرض مناسب للمراجعة" : "Receive a proposal ready for review"}</li>
          </ul>
          <div className="b2b-form-note">
            {isArabic
              ? "مناسب للجهات الحكومية، الشركات، الوفود، الإقامات الشهرية، والاجتماعات."
              : "Suitable for government entities, companies, delegations, monthly stays, and meetings."}
          </div>
        </div>

        <div>
          <div className="b2b-progress" aria-hidden="true">
            <span className="b2b-step-dot active">1</span>
            <span className="b2b-step-track">
              <span className={`b2b-step-track-fill ${modalOpen ? "full" : ""}`} />
            </span>
            <span className={`b2b-step-dot ${modalOpen ? "active" : ""}`}>2</span>
          </div>

          <div className="b2b-modal-head" style={{ marginBottom: 18 }}>
            <div>
              <span className="eyebrow">{t.step1Heading}</span>
              <h2 style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.85rem)", fontWeight: 800, marginTop: 6 }}>
                {t.step1Sub}
              </h2>
            </div>
          </div>

          <form className="b2b-form" data-corporate-form onSubmit={handleBasicSubmit}>
            <label>
              <span>{t.company}</span>
              <input name="company" defaultValue={basic.company} required />
            </label>
            <label>
              <span>{t.sector}</span>
              <select name="sector" defaultValue={basic.sector} required>
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
              <input name="contact" defaultValue={basic.contact} required />
            </label>
            <label>
              <span>{t.jobTitle}</span>
              <input
                name="jobTitle"
                defaultValue={basic.jobTitle}
                placeholder={isArabic ? "مثال: مدير الموارد البشرية" : "Example: HR manager"}
              />
            </label>
            <label>
              <span>{t.email}</span>
              <input name="email" type="email" defaultValue={basic.email} required />
            </label>
            <label>
              <span>{t.phone}</span>
              <input name="phone" defaultValue={basic.phone} required />
            </label>

            <div className="b2b-form-actions span-2">
              <button className="btn btn-primary" type="submit">
                {t.continue} →
              </button>
              {status ? <p>{status}</p> : null}
            </div>
          </form>
        </div>
      </div>

      {modalOpen ? (
        <div
          className="b2b-modal"
          role="dialog"
          aria-modal="true"
          aria-label={t.step2Heading}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <button
            type="button"
            className="b2b-modal-backdrop"
            aria-label={t.closeModal}
            onClick={() => setModalOpen(false)}
          />
          <div className="b2b-modal-panel">
            <div className="b2b-modal-head">
              <div>
                <span className="eyebrow">{t.step2Heading}</span>
                <h2>{t.step2Sub}</h2>
              </div>
              <button
                type="button"
                className="b2b-modal-close"
                aria-label={t.closeModal}
                onClick={() => setModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="b2b-modal-summary">
              <strong>{t.summaryHeading}</strong>
              <dl>
                <dt>{t.company}</dt>
                <dd>{basic.company}</dd>
                <dt>{t.contact}</dt>
                <dd>{basic.contact}</dd>
                <dt>{t.email}</dt>
                <dd>{basic.email}</dd>
                <dt>{t.phone}</dt>
                <dd>{basic.phone}</dd>
              </dl>
            </div>

            <form className="b2b-modal-form" onSubmit={handleFinalSubmit}>
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
                <span>{t.budget}</span>
                <input name="budget" placeholder={isArabic ? "مثال: 450 ريال لليلة" : "Example: SAR 450 per night"} />
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
                <textarea
                  name="message"
                  rows={4}
                  placeholder={
                    isArabic
                      ? "اكتب تفاصيل الطلب أو عدد الضيوف أو شروط الدفع"
                      : "Add guest count, payment terms, room setup, or any special needs"
                  }
                />
              </label>

              <div className="b2b-modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  ← {t.back}
                </button>
                <button className="btn btn-primary" type="submit">
                  {t.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}
