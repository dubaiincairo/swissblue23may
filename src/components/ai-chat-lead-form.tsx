"use client";

import { useState } from "react";
import type { ChatLeadKind } from "@/lib/chat-leads";
import type { ChatLocale } from "@/lib/ai-chat";
import { trackAnalyticsEvent } from "@/lib/analytics-events";

type Copy = {
  title: Record<ChatLeadKind, string>;
  intro: Record<ChatLeadKind, string>;
  name: string;
  contact: string;
  request: string;
  submit: string;
  cancel: string;
  sending: string;
};

const COPY: Record<ChatLocale, Copy> = {
  en: {
    title: {
      booking: "Booking request",
      corporate: "Corporate request",
      career: "Career enquiry",
      support: "Speak to our team",
    },
    intro: {
      booking: "Share your details and our reservations team will follow up.",
      corporate: "Share your details and our corporate reservations team will follow up.",
      career: "Share your details and our careers team will follow up.",
      support: "Share your contact details and our reservations team will continue from this conversation.",
    },
    name: "Full name",
    contact: "Email or mobile number",
    request: "How can we help?",
    submit: "Send request",
    cancel: "Cancel",
    sending: "Sending...",
  },
  ar: {
    title: {
      booking: "طلب حجز",
      corporate: "طلب شركات",
      career: "استفسار وظيفي",
      support: "التحدث مع الفريق",
    },
    intro: {
      booking: "أرسل بياناتك وسيتواصل معك فريق الحجوزات.",
      corporate: "أرسل بياناتك وسيتواصل معك فريق حجوزات الشركات.",
      career: "أرسل بياناتك وسيتواصل معك فريق التوظيف.",
      support: "أرسل بيانات التواصل وسيكمل فريق الحجوزات معك من هذه المحادثة.",
    },
    name: "الاسم الكامل",
    contact: "البريد الإلكتروني أو رقم الجوال",
    request: "كيف يمكننا مساعدتك؟",
    submit: "إرسال الطلب",
    cancel: "إلغاء",
    sending: "جارٍ الإرسال...",
  },
};

type Props = {
  kind: ChatLeadKind;
  locale: ChatLocale;
  onCancel: () => void;
  onComplete: (kind: ChatLeadKind) => void;
  initialRequest?: string;
  transcript?: string;
};

export default function AiChatLeadForm({ kind, locale, onCancel, onComplete, initialRequest = "", transcript = "" }: Props) {
  const copy = COPY[locale];
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [request, setRequest] = useState(initialRequest);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    setError("");
    setSending(true);
    try {
      const response = await fetch("/api/ai-chat/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, locale, fullName, contact, request, transcript, company_url: "" }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setError(data.error || (locale === "ar" ? "تعذر إرسال الطلب." : "Your request could not be sent."));
        return;
      }
      trackAnalyticsEvent("chat_lead_submitted", { locale, lead_kind: kind });
      onComplete(kind);
    } catch {
      setError(locale === "ar" ? "تعذر الاتصال بالخدمة." : "The request service could not be reached.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="sb-ai-chat-lead" dir={locale === "ar" ? "rtl" : "ltr"} lang={locale} onSubmit={submit}>
      <div className="sb-ai-chat-lead-heading">
        <h3>{copy.title[kind]}</h3>
        <p>{copy.intro[kind]}</p>
      </div>
      <label className="sb-ai-chat-lead-field">
        <span>{copy.name}</span>
        <input
          autoFocus
          autoComplete="name"
          disabled={sending}
          maxLength={120}
          onChange={(event) => setFullName(event.target.value)}
          required
          value={fullName}
        />
      </label>
      <label className="sb-ai-chat-lead-field">
        <span>{copy.contact}</span>
        <input
          autoComplete="email"
          dir="auto"
          disabled={sending}
          inputMode="email"
          maxLength={160}
          onChange={(event) => setContact(event.target.value)}
          required
          value={contact}
        />
      </label>
      <label className="sb-ai-chat-lead-field">
        <span>{copy.request}</span>
        <textarea
          disabled={sending}
          maxLength={2000}
          onChange={(event) => setRequest(event.target.value)}
          required
          rows={3}
          value={request}
        />
      </label>
      {error ? <p className="sb-ai-chat-lead-error" role="alert">{error}</p> : null}
      <div className="sb-ai-chat-lead-actions">
        <button type="button" className="sb-ai-chat-lead-cancel" disabled={sending} onClick={onCancel}>{copy.cancel}</button>
        <button type="submit" className="sb-ai-chat-lead-submit" disabled={sending}>
          {sending ? copy.sending : copy.submit}
        </button>
      </div>
    </form>
  );
}
