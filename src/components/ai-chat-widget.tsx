"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CONSENT_EVENT, CONSENT_STORAGE_KEY } from "@/lib/consent";
import AiChatLeadForm from "@/components/ai-chat-lead-form";
import { detectChatLeadKind, type ChatLeadKind } from "@/lib/chat-leads";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

const SARAH_AVATAR_SRC = "/images/sarah-al-otaibi-concierge.jpg";

function isAdminPath(pathname: string | null) {
  return Boolean(
    pathname === "/secretpanel" ||
      pathname === "/studio" ||
      pathname?.startsWith("/secretpanel/") ||
      pathname?.startsWith("/studio/"),
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5.25 18.5 3.8 21l3.15-.85A8.5 8.5 0 1 0 3.5 13.5c0 1.8.56 3.48 1.75 5Z" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m21 3-7.25 18-3.25-7.25L3.25 10.5 21 3Z" />
      <path d="m10.5 13.75 4.25-4.25" />
    </svg>
  );
}

export default function AiChatWidget() {
  const pathname = usePathname();
  const locale = pathname === "/en" || pathname?.startsWith("/en/") ? "en" : "ar";
  const isArabic = locale === "ar";
  const [consentResolved, setConsentResolved] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [activeLead, setActiveLead] = useState<ChatLeadKind | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  const copy = isArabic
    ? {
        title: "سارة العتيبي",
        role: "مساعدتك الافتراضية في سويس بلو",
        status: "متاحة الآن",
        open: "بدء محادثة مع سارة العتيبي",
        close: "إغلاق محادثة سارة",
        avatarAlt: "صورة رمزية لسارة، المساعدة الافتراضية",
        welcome: "مرحباً، أنا سارة. كيف يمكنني مساعدتك في حجز إقامتك أو معرفة المزيد عن وجهات سويس بلو؟",
        placeholder: "اكتب سؤالك...",
        send: "إرسال",
        typing: "يكتب الآن...",
        leadComplete: {
          booking: "تم إرسال طلب الحجز إلى فريق الحجوزات. سيتواصل معك قريباً.",
          corporate: "تم إرسال طلب الشركات إلى فريق الحجوزات. سيتواصل معك قريباً.",
          career: "تم إرسال طلبك إلى فريق التوظيف. سيتواصل معك قريباً.",
        },
        leadActions: {
          booking: "طلب حجز",
          corporate: "طلب شركات",
          career: "استفسار وظيفي",
        },
      }
    : {
        title: "Sarah Al-Otaibi",
        role: "Swiss Blue virtual concierge",
        status: "Online now",
        open: "Start a chat with Sarah Al-Otaibi",
        close: "Close Sarah's chat",
        avatarAlt: "Illustrated portrait of Sarah, the virtual concierge",
        welcome: "Hello, I am Sarah. How can I help with your stay or a Swiss Blue destination today?",
        placeholder: "Type your question...",
        send: "Send",
        typing: "Thinking...",
        leadComplete: {
          booking: "Your booking request has been sent to reservations. The team will contact you shortly.",
          corporate: "Your corporate request has been sent to reservations. The team will contact you shortly.",
          career: "Your career enquiry has been sent to the careers team. They will contact you shortly.",
        },
        leadActions: {
          booking: "Booking help",
          corporate: "Corporate help",
          career: "Career help",
        },
      };

  useEffect(() => {
    function checkConsent() {
      try {
        setConsentResolved(Boolean(window.localStorage.getItem(CONSENT_STORAGE_KEY)));
      } catch {
        setConsentResolved(true);
      }
    }
    checkConsent();
    window.addEventListener(CONSENT_EVENT, checkConsent);
    return () => window.removeEventListener(CONSENT_EVENT, checkConsent);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, open]);

  useEffect(() => {
    const messagesElement = messagesRef.current;
    if (!messagesElement) return;
    messagesElement.scrollTo({ top: messagesElement.scrollHeight, behavior: "smooth" });
  }, [activeLead, error, messages, sending]);

  if (
    process.env.NEXT_PUBLIC_AI_CHAT_ENABLED !== "true" ||
    isAdminPath(pathname) ||
    !consentResolved
  ) {
    return null;
  }

  function addMessage(role: ChatMessage["role"], text: string) {
    setMessages((current) => [...current, { id: nextId.current++, role, text }]);
  }

  function openLead(kind: ChatLeadKind) {
    setError("");
    setActiveLead(kind);
  }

  function completeLead(kind: ChatLeadKind) {
    setActiveLead(null);
    addMessage("assistant", copy.leadComplete[kind]);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = message.replace(/\s+/g, " ").trim();
    if (!text || sending) return;

    setMessage("");
    setError("");
    addMessage("user", text);
    const leadKind = detectChatLeadKind(text);
    if (leadKind) {
      openLead(leadKind);
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, locale }),
      });
      const data = (await response.json()) as { answer?: string; error?: string };
      if (!response.ok || !data.answer) {
        setError(data.error || (isArabic ? "تعذر إرسال رسالتك." : "Your message could not be sent."));
        return;
      }
      addMessage("assistant", data.answer);
    } catch {
      setError(isArabic ? "تعذر الاتصال بالمساعد." : "The assistant could not be reached.");
    } finally {
      setSending(false);
    }
  }

  return (
    <aside
      className={`sb-ai-chat ${isArabic ? "is-rtl" : "is-ltr"}${open ? " is-open" : ""}`}
      dir={isArabic ? "rtl" : "ltr"}
      lang={isArabic ? "ar" : "en"}
    >
      {open ? (
        <section className="sb-ai-chat-panel" role="dialog" aria-label={copy.title}>
          <header className="sb-ai-chat-header">
            <div className="sb-ai-chat-profile">
              <Image className="sb-ai-chat-avatar" src={SARAH_AVATAR_SRC} alt={copy.avatarAlt} width={48} height={48} />
              <div className="sb-ai-chat-profile-copy">
                <strong>{copy.title}</strong>
                <span>{copy.role}</span>
                <span className="sb-ai-chat-status"><i aria-hidden="true" />{copy.status}</span>
              </div>
            </div>
            <button type="button" className="sb-ai-chat-icon-button" onClick={close} aria-label={copy.close}>
              <CloseIcon />
            </button>
          </header>
          <div ref={messagesRef} className="sb-ai-chat-messages" aria-live="polite">
            {activeLead ? (
              <AiChatLeadForm
                kind={activeLead}
                locale={locale}
                onCancel={() => setActiveLead(null)}
                onComplete={completeLead}
              />
            ) : (
              <>
                <div className="sb-ai-chat-welcome">
                  <Image className="sb-ai-chat-welcome-avatar" src={SARAH_AVATAR_SRC} alt="" aria-hidden="true" width={32} height={32} />
                  <p>{copy.welcome}</p>
                </div>
                {messages.length === 0 ? (
                  <div className="sb-ai-chat-actions" aria-label={isArabic ? "طرق يمكننا مساعدتك بها" : "Ways we can help"}>
                    {(Object.keys(copy.leadActions) as ChatLeadKind[]).map((kind) => (
                      <button key={kind} type="button" onClick={() => openLead(kind)}>{copy.leadActions[kind]}</button>
                    ))}
                  </div>
                ) : null}
                {messages.map((item) => (
                  <p className={`sb-ai-chat-message is-${item.role}`} key={item.id}>{item.text}</p>
                ))}
              </>
            )}
            {sending ? <p className="sb-ai-chat-typing">{copy.typing}</p> : null}
            {error ? <p className="sb-ai-chat-error" role="alert">{error}</p> : null}
          </div>
          <form className="sb-ai-chat-form" onSubmit={submit}>
            <textarea
              ref={inputRef}
              value={message}
              onChange={(event) => setMessage(event.target.value.slice(0, 800))}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              placeholder={copy.placeholder}
              aria-label={copy.placeholder}
              dir={isArabic ? "rtl" : "ltr"}
              lang={isArabic ? "ar" : "en"}
              rows={1}
              maxLength={800}
              disabled={sending || Boolean(activeLead)}
            />
            <button type="submit" className="sb-ai-chat-send" aria-label={copy.send} disabled={sending || Boolean(activeLead) || !message.trim()}>
              <SendIcon />
            </button>
          </form>
        </section>
      ) : null}
      <button ref={triggerRef} type="button" className="sb-ai-chat-trigger" onClick={() => setOpen(true)} aria-label={copy.open}>
        <span className="sb-ai-chat-trigger-avatar">
          <Image src={SARAH_AVATAR_SRC} alt="" aria-hidden="true" width={64} height={64} />
        </span>
        <span className="sb-ai-chat-trigger-badge"><ChatIcon /></span>
        <span className="sb-ai-chat-trigger-presence" aria-hidden="true" />
      </button>
    </aside>
  );
}
