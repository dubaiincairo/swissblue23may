"use client";

import { useState } from "react";

type Language = "ar" | "en";

const labels: Record<Language, { idle: string; loading: string; success: string; tooltip: (target: Language) => string }> = {
  ar: {
    idle: "ترجمة إلى الإنجليزية",
    loading: "جارٍ الترجمة…",
    success: "تمت الترجمة",
    tooltip: () => "ترجمة هذا الحقل عبر DeepL وكتابة النتيجة في النسخة الإنجليزية.",
  },
  en: {
    idle: "Translate to Arabic",
    loading: "Translating…",
    success: "Translated",
    tooltip: () => "Translate this field via DeepL and write it into the Arabic version.",
  },
};

export function TranslateButton({
  value,
  sourceLanguage,
  path,
  isHtml = false,
  onChange,
}: {
  value: string;
  sourceLanguage: Language;
  path: Array<string | number>;
  isHtml?: boolean;
  onChange: (path: Array<string | number>, value: string) => void;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const target: Language = sourceLanguage === "ar" ? "en" : "ar";
  const copy = labels[sourceLanguage];

  async function translate() {
    if (!value.trim() || status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/site-content/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: value,
          source: sourceLanguage,
          target,
          isHtml,
        }),
      });

      const data = (await response.json()) as { translated?: string; error?: string };
      if (!response.ok || typeof data.translated !== "string") {
        throw new Error(data.error ?? "Translation failed.");
      }

      const crossLocalePath = [target, ...path.slice(1)];
      onChange(crossLocalePath, data.translated);
      setStatus("success");
      window.setTimeout(() => setStatus("idle"), 2400);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Translation failed.");
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
    <button
      type="button"
      className={`admin-translate-button is-${status}`}
      onClick={translate}
      disabled={disabled}
      title={copy.tooltip(target)}
      aria-label={copy.tooltip(target)}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m5 8 6 6" />
        <path d="m4 14 6-6 2-3" />
        <path d="M2 5h12" />
        <path d="M7 2h1" />
        <path d="m22 22-5-10-5 10" />
        <path d="M14 18h6" />
      </svg>
      <span>{label}</span>
    </button>
  );
}
