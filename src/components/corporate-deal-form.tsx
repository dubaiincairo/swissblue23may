"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import type { EditableSiteContent } from "@/lib/editable-content";

type Locale = "ar" | "en";

type RequestFormContent =
  EditableSiteContent["ar"]["subpages"]["corporateDealsPage"]["requestForm"];

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

export default function CorporateDealForm({
  locale,
  content,
}: {
  locale: Locale;
  content: RequestFormContent;
}) {
  const t = content;
  const isArabic = locale === "ar";
  const [basic, setBasic] = useState<BasicData>(emptyBasic);
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (modalOpen) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      document.body.classList.add("overlay-open");
      return () => {
        document.body.style.overflow = previous;
        document.body.classList.remove("overlay-open");
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
    setError("");
    setModalOpen(true);
  }

  async function handleFinalSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const stay = new FormData(form);
    setError("");
    setSubmitting(true);

    const payload = {
      ...basic,
      city: String(stay.get("city") ?? ""),
      propertyType: String(stay.get("propertyType") ?? ""),
      requestType: String(stay.get("requestType") ?? ""),
      guests: String(stay.get("guests") ?? ""),
      units: String(stay.get("units") ?? ""),
      budget: String(stay.get("budget") ?? ""),
      arrival: String(stay.get("arrival") ?? ""),
      departure: String(stay.get("departure") ?? ""),
      documents: String(stay.get("documents") ?? ""),
      preferredContact: String(stay.get("preferredContact") ?? ""),
      message: String(stay.get("message") ?? ""),
      company_url: String(stay.get("company_url") ?? ""),
      locale,
    };

    try {
      const response = await fetch("/api/forms/b2b", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus(t.success);
      setModalOpen(false);
      setBasic(emptyBasic);
      form.reset();
      const basicForm = document.querySelector<HTMLFormElement>("[data-corporate-form]");
      basicForm?.reset();
    } catch {
      setError(t.error);
    } finally {
      setSubmitting(false);
    }
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
            {t.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <div className="b2b-form-note">{t.note}</div>
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
              <span>{t.fields.company}</span>
              <input name="company" defaultValue={basic.company} required />
            </label>
            <label>
              <span>{t.fields.sector}</span>
              <select name="sector" defaultValue={basic.sector} required>
                <option value="">{t.sectorPlaceholder}</option>
                {t.sectorOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label>
              <span>{t.fields.contact}</span>
              <input name="contact" defaultValue={basic.contact} required />
            </label>
            <label>
              <span>{t.fields.jobTitle}</span>
              <input
                name="jobTitle"
                defaultValue={basic.jobTitle}
                placeholder={t.placeholders.jobTitle}
              />
            </label>
            <label>
              <span>{t.fields.email}</span>
              <input name="email" type="email" defaultValue={basic.email} required />
            </label>
            <label>
              <span>{t.fields.phone}</span>
              <input name="phone" defaultValue={basic.phone} required />
            </label>

            <div className="b2b-form-actions span-2">
              <button className="btn btn-primary" type="submit">
                {t.continue} →
              </button>
              {status ? <p>{status}</p> : null}
              {error ? <p style={{ color: "var(--danger, #c0392b)" }}>{error}</p> : null}
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
                <dt>{t.fields.company}</dt>
                <dd>{basic.company}</dd>
                <dt>{t.fields.contact}</dt>
                <dd>{basic.contact}</dd>
                <dt>{t.fields.email}</dt>
                <dd>{basic.email}</dd>
                <dt>{t.fields.phone}</dt>
                <dd>{basic.phone}</dd>
              </dl>
            </div>

            <form className="b2b-modal-form" onSubmit={handleFinalSubmit}>
              {/* Honeypot — hidden from real users; bots that fill it are dropped server-side. */}
              <div
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
              >
                <input name="company_url" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <label>
                <span>{t.fields.city}</span>
                <select name="city" required>
                  <option value="">{t.selectPlaceholder}</option>
                  {t.cityOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>{t.fields.propertyType}</span>
                <select name="propertyType" required>
                  <option value="">{t.propertyTypePlaceholder}</option>
                  {t.propertyTypeOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>{t.fields.requestType}</span>
                <select name="requestType" required>
                  <option value="">{t.selectPlaceholder}</option>
                  {t.requestTypeOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>{t.fields.guests}</span>
                <input name="guests" type="number" min="1" placeholder={t.placeholders.guests} />
              </label>
              <label>
                <span>{t.fields.units}</span>
                <input name="units" placeholder={t.placeholders.units} />
              </label>
              <label>
                <span>{t.fields.budget}</span>
                <input name="budget" placeholder={t.placeholders.budget} />
              </label>
              <label>
                <span>{t.fields.arrival}</span>
                <input name="arrival" type="date" />
              </label>
              <label>
                <span>{t.fields.departure}</span>
                <input name="departure" type="date" />
              </label>
              <label>
                <span>{t.fields.documents}</span>
                <select name="documents">
                  {t.documentsOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>{t.fields.preferredContact}</span>
                <select name="preferredContact">
                  {t.contactOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="span-2">
                <span>{t.fields.message}</span>
                <textarea name="message" rows={4} placeholder={t.placeholders.message} />
              </label>

              {error ? (
                <p className="span-2" style={{ color: "var(--danger, #c0392b)" }}>
                  {error}
                </p>
              ) : null}

              <div className="b2b-modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  ← {t.back}
                </button>
                <button className="btn btn-primary" type="submit" disabled={submitting}>
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
