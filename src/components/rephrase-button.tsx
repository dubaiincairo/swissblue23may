"use client";

import { useEffect, useRef, useState } from "react";

type Language = "ar" | "en";

const labels: Record<
  Language,
  {
    idle: string;
    loading: string;
    success: string;
    tooltip: string;
    optionsAria: string;
    panelHeading: string;
    instructionsHeading: string;
    instructionsPlaceholder: string;
    close: string;
    apply: string;
  }
> = {
  ar: {
    idle: "إعادة صياغة",
    loading: "جارٍ الصياغة…",
    success: "تمت الصياغة",
    tooltip: "إعادة صياغة هذا الحقل عبر Gemini مع الحفاظ على المعنى واللغة.",
    optionsAria: "خيارات إعادة الصياغة",
    panelHeading: "إعدادات إعادة الصياغة",
    instructionsHeading: "تعليمات مخصصة (اختياري)",
    instructionsPlaceholder:
      "مثال: اجعل النص أقصر، ركّز على إطلالة البحر، وأضِف دعوة واضحة للحجز.",
    close: "إغلاق إعدادات إعادة الصياغة",
    apply: "أعد الصياغة بهذه التعليمات",
  },
  en: {
    idle: "Rephrase",
    loading: "Rephrasing…",
    success: "Rephrased",
    tooltip: "Rephrase this field with Gemini while keeping its meaning and language.",
    optionsAria: "Rephrase options",
    panelHeading: "Rephrase settings",
    instructionsHeading: "Custom instructions (optional)",
    instructionsPlaceholder:
      "e.g. Make it shorter, emphasize the sea view, and add a clear booking call-to-action.",
    close: "Close rephrase settings",
    apply: "Rephrase with these instructions",
  },
};

export function RephraseButton({
  value,
  language,
  path,
  isHtml = false,
  onChange,
}: {
  value: string;
  language: Language;
  path: Array<string | number>;
  isHtml?: boolean;
  onChange: (path: Array<string | number>, value: string) => void;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [instructions, setInstructions] = useState("");
  const wrapperRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handlePointerDown(event: MouseEvent) {
      const node = wrapperRef.current;
      if (node && !node.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const copy = labels[language];

  async function rephrase() {
    if (!value.trim() || status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/site-content/rephrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: value,
          language,
          isHtml,
          instructions: instructions.trim(),
        }),
      });

      const data = (await response.json()) as { rephrased?: string; error?: string };
      if (!response.ok || typeof data.rephrased !== "string") {
        throw new Error(data.error ?? "Rephrase failed.");
      }

      onChange(path, data.rephrased);
      setStatus("success");
      window.setTimeout(() => setStatus("idle"), 2400);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Rephrase failed.");
      window.setTimeout(() => setStatus("idle"), 4000);
    }
  }

  const disabled = !value.trim() || status === "loading";
  const label =
    status === "loading"
      ? copy.loading
      : status === "success"
        ? copy.success
        : status === "error"
          ? errorMessage || copy.idle
          : copy.idle;

  return (
    <span className="admin-rephrase-split" ref={wrapperRef}>
      <button
        type="button"
        className={`admin-rephrase-button is-${status}`}
        onClick={rephrase}
        disabled={disabled}
        title={copy.tooltip}
        aria-label={copy.tooltip}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4" />
          <path d="m16.24 7.76 2.83-2.83" />
          <path d="M22 12h-4" />
          <path d="m16.24 16.24 2.83 2.83" />
          <path d="M12 22v-4" />
          <path d="m7.76 16.24-2.83 2.83" />
          <path d="M2 12h4" />
          <path d="m7.76 7.76-2.83-2.83" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span>{label}</span>
      </button>
      <button
        type="button"
        className="admin-rephrase-caret"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={copy.optionsAria}
        aria-haspopup="dialog"
        aria-expanded={menuOpen}
        title={copy.panelHeading}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {menuOpen ? (
        <div className="admin-rephrase-panel" role="dialog" aria-label={copy.panelHeading}>
          <div className="admin-rephrase-panel-head">
            <span className="admin-rephrase-panel-label">{copy.instructionsHeading}</span>
            <button
              type="button"
              className="admin-rephrase-panel-close"
              onClick={() => setMenuOpen(false)}
              aria-label={copy.close}
              title={copy.close}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m6 6 12 12" />
                <path d="m18 6-12 12" />
              </svg>
            </button>
          </div>
          <div className="admin-rephrase-panel-field">
            <textarea
              className="admin-rephrase-instructions"
              value={instructions}
              onChange={(event) => setInstructions(event.target.value)}
              placeholder={copy.instructionsPlaceholder}
              aria-label={copy.instructionsHeading}
              rows={3}
              maxLength={600}
              autoFocus
            />
          </div>

          <button
            type="button"
            className="admin-rephrase-apply"
            disabled={disabled}
            onClick={() => {
              setMenuOpen(false);
              rephrase();
            }}
          >
            {copy.apply}
          </button>
        </div>
      ) : null}
    </span>
  );
}
