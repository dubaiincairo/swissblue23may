"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_EVENT, CONSENT_STORAGE_KEY } from "@/lib/consent";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

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
  const locale = pathname?.startsWith("/en") ? "en" : "ar";
  const isArabic = locale === "ar";
  const [consentResolved, setConsentResolved] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  const copy = isArabic
    ? {
        title: "مساعد سويس بلو",
        open: "فتح مساعد سويس بلو",
        close: "إغلاق المساعد",
        welcome: "مرحباً، كيف يمكنني مساعدتك في فنادق وشقق سويس بلو؟",
        placeholder: "اكتب سؤالك...",
        send: "إرسال",
        typing: "يكتب الآن...",
      }
    : {
        title: "Swiss Blue Assistant",
        open: "Open Swiss Blue Assistant",
        close: "Close assistant",
        welcome: "Hello, how can I help with Swiss Blue hotels and apartments?",
        placeholder: "Type your question...",
        send: "Send",
        typing: "Thinking...",
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
  }, [error, messages, sending]);

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

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = message.replace(/\s+/g, " ").trim();
    if (!text || sending) return;

    setMessage("");
    setError("");
    addMessage("user", text);
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
    <aside className={`sb-ai-chat${open ? " is-open" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
      {open ? (
        <section className="sb-ai-chat-panel" role="dialog" aria-label={copy.title}>
          <header className="sb-ai-chat-header">
            <div className="sb-ai-chat-heading">
              <span className="sb-ai-chat-heading-icon"><ChatIcon /></span>
              <span>{copy.title}</span>
            </div>
            <button type="button" className="sb-ai-chat-icon-button" onClick={close} aria-label={copy.close}>
              <CloseIcon />
            </button>
          </header>
          <div ref={messagesRef} className="sb-ai-chat-messages" aria-live="polite">
            <p className="sb-ai-chat-welcome">{copy.welcome}</p>
            {messages.map((item) => (
              <p className={`sb-ai-chat-message is-${item.role}`} key={item.id}>{item.text}</p>
            ))}
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
              rows={1}
              maxLength={800}
              disabled={sending}
            />
            <button type="submit" className="sb-ai-chat-send" aria-label={copy.send} disabled={sending || !message.trim()}>
              <SendIcon />
            </button>
          </form>
        </section>
      ) : null}
      <button ref={triggerRef} type="button" className="sb-ai-chat-trigger" onClick={() => setOpen(true)} aria-label={copy.open}>
        <ChatIcon />
      </button>
    </aside>
  );
}
