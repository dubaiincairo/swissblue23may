"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import type { EditableSiteContent } from "@/lib/editable-content";

type Locale = "ar" | "en";

type RecruitmentContent =
  EditableSiteContent["ar"]["subpages"]["careersPage"]["recruitment"];
type Job = RecruitmentContent["jobs"][number];
type ApplyLabels = RecruitmentContent["applyLabels"];
type ApplyForm = RecruitmentContent["applyForm"];

function JobCard({
  job,
  index,
  isOpen,
  onToggle,
  labels,
  form,
  isArabic,
  locale,
}: {
  job: Job;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  labels: ApplyLabels;
  form: ApplyForm;
  isArabic: boolean;
  locale: Locale;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    setError("");
    setSubmitting(true);

    try {
      const data = new FormData(formEl);
      data.set("position", job.title);
      data.set("locale", locale);

      const response = await fetch("/api/forms/careers", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSubmitting(false);
      setSubmitted(true);
      formEl.reset();
    } catch {
      setSubmitting(false);
      setError(form.error);
    }
  }

  return (
    <article className="careers-job-card">
      <button
        type="button"
        className="careers-job-head"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="careers-job-index">{String(index + 1).padStart(2, "0")}</span>
        <span className="careers-job-headings">
          <span className="careers-job-title">{job.title}</span>
          <span className="careers-job-summary">{job.summary}</span>
        </span>
        <span className="careers-job-meta">
          <span className="careers-job-exp">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
            <span>{job.experience}</span>
          </span>
          <span className="careers-job-toggle">
            {isOpen ? labels.hideDetails : labels.viewDetails}
            <svg className="careers-job-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </span>
      </button>

      {isOpen ? (
        <div className="careers-job-body">
          <div className="careers-job-details">
            <DetailBlock title={labels.summary}>
              <p>{job.summary}</p>
            </DetailBlock>
            <DetailBlock title={labels.responsibilities}>
              <ul>
                {job.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </DetailBlock>
            <DetailBlock title={labels.qualifications}>
              <ul>
                {job.qualifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </DetailBlock>
            <DetailBlock title={labels.experience}>
              <p>{job.experience}</p>
            </DetailBlock>
            <DetailBlock title={labels.skills}>
              <div className="careers-skill-chips">
                {job.skills.map((skill) => (
                  <span className="careers-skill-chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </DetailBlock>
          </div>

          <div className="careers-apply">
            <div className="careers-apply-head">
              <span className="eyebrow">{labels.formHeading}</span>
              <h4>{job.title}</h4>
              <p>{labels.formSub}</p>
            </div>

            {submitted ? (
              <div className="careers-success" role="status">
                {form.success}
              </div>
            ) : (
              <form className="b2b-form" onSubmit={handleSubmit} dir={isArabic ? "rtl" : "ltr"}>
                <input type="hidden" name="position" value={job.title} />
                {/* Honeypot — hidden from real users; bots that fill it are dropped server-side. */}
                <div
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
                >
                  <input name="company_url" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <label>
                  <span>{form.fullName}</span>
                  <input name="fullName" required autoComplete="name" />
                </label>
                <label>
                  <span>{form.email}</span>
                  <input name="email" type="email" required autoComplete="email" />
                </label>
                <label>
                  <span>{form.phone}</span>
                  <input name="phone" type="tel" required autoComplete="tel" />
                </label>
                <label>
                  <span>{form.nationality}</span>
                  <input name="nationality" required />
                </label>
                <label>
                  <span>{form.location}</span>
                  <input name="location" required />
                </label>
                <label>
                  <span>{form.yearsExperience}</span>
                  <input name="yearsExperience" type="number" min="0" required />
                </label>
                <label>
                  <span>{form.currentTitle}</span>
                  <input name="currentTitle" required />
                </label>
                <label>
                  <span>{form.expectedSalary}</span>
                  <input name="expectedSalary" required />
                </label>
                <label>
                  <span>{form.noticePeriod}</span>
                  <input name="noticePeriod" required />
                </label>
                <label>
                  <span>
                    {form.linkedin}{" "}
                    <em className="careers-optional">({form.optional})</em>
                  </span>
                  <input name="linkedin" type="url" placeholder="https://linkedin.com/in/…" />
                </label>
                <label className="span-2">
                  <span>
                    {form.cv} <em className="careers-optional">({form.cvHint})</em>
                  </span>
                  <input
                    name="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    className="careers-file"
                  />
                </label>
                <label className="span-2">
                  <span>{form.message}</span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder={form.messagePlaceholder}
                  />
                </label>
                {error ? (
                  <p className="span-2" style={{ color: "var(--danger, #c0392b)" }}>
                    {error}
                  </p>
                ) : null}
                <div className="b2b-form-actions span-2">
                  <button className="btn btn-primary" type="submit" disabled={submitting}>
                    {submitting ? form.submitting : form.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </article>
  );
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="careers-detail-block">
      <h5>{title}</h5>
      {children}
    </div>
  );
}

export default function CareersOpenings({
  locale,
  content,
}: {
  locale: Locale;
  content: RecruitmentContent;
}) {
  const isArabic = locale === "ar";
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div dir={isArabic ? "rtl" : "ltr"}>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">{content.culture.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[44px]">
            {content.culture.title}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
            {content.culture.text}
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.culture.items.map((item, index) => (
            <article
              className="content-card reveal-slide-up"
              key={item.title}
              style={{ "--delay": `${index * 60}ms` } as React.CSSProperties}
            >
              <span className="eyebrow">{item.title}</span>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">{content.openingsIntro.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[44px]">
            {content.openingsIntro.title}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
            {content.openingsIntro.text}
          </p>
        </div>

        <div className="careers-job-list mt-10">
          {content.jobs.map((job, index) => (
            <JobCard
              key={`${job.title}-${index}`}
              job={job}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex((prev) => (prev === index ? null : index))}
              labels={content.applyLabels}
              form={content.applyForm}
              isArabic={isArabic}
              locale={locale}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
