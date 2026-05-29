"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Language = "ar" | "en";

type ToneOption = {
  id: string;
  apiValue: string;
  label: Record<Language, string>;
};

const TONE_OPTIONS: ToneOption[] = [
  {
    id: "luxury-hospitality",
    apiValue: "luxury hospitality",
    label: { en: "Luxury Hospitality", ar: "ضيافة فاخرة" },
  },
  {
    id: "professional",
    apiValue: "professional",
    label: { en: "Professional", ar: "احترافي" },
  },
  {
    id: "marketing",
    apiValue: "marketing copy",
    label: { en: "Marketing", ar: "تسويقي" },
  },
  {
    id: "friendly",
    apiValue: "friendly and warm",
    label: { en: "Friendly", ar: "ودود" },
  },
  {
    id: "simple",
    apiValue: "simple and clear",
    label: { en: "Simple", ar: "بسيط" },
  },
  {
    id: "formal-corporate",
    apiValue: "formal corporate",
    label: { en: "Formal Corporate", ar: "رسمي مؤسسي" },
  },
];

const DEFAULT_TONE_ID = "luxury-hospitality";
const STORAGE_KEY = "secretpanel:rephrase-tone";

const labels: Record<
  Language,
  {
    idle: string;
    loading: string;
    success: string;
    tooltip: string;
    toneAria: string;
    toneHeading: string;
    optionsAria: string;
    panelHeading: string;
    instructionsHeading: string;
    instructionsPlaceholder: string;
    apply: string;
  }
> = {
  ar: {
    idle: "إعادة صياغة",
    loading: "جارٍ الصياغة…",
    success: "تمت الصياغة",
    tooltip: "إعادة صياغة هذا الحقل عبر Gemini مع الحفاظ على المعنى واللغة.",
    toneAria: "اختيار النبرة",
    toneHeading: "النبرة",
    optionsAria: "خيارات إعادة الصياغة",
    panelHeading: "إعدادات إعادة الصياغة",
    instructionsHeading: "تعليمات مخصصة (اختياري)",
    instructionsPlaceholder:
      "مثال: اجعل النص أقصر، ركّز على إطلالة البحر، وأضِف دعوة واضحة للحجز.",
    apply: "أعد الصياغة بهذه التعليمات",
  },
  en: {
    idle: "Rephrase",
    loading: "Rephrasing…",
    success: "Rephrased",
    tooltip: "Rephrase this field with Gemini while keeping its meaning and language.",
    toneAria: "Choose tone",
    toneHeading: "Tone",
    optionsAria: "Rephrase options",
    panelHeading: "Rephrase settings",
    instructionsHeading: "Custom instructions (optional)",
    instructionsPlaceholder:
      "e.g. Make it shorter, emphasize the sea view, and add a clear booking call-to-action.",
    apply: "Rephrase with these instructions",
  },
};

const TONE_CHANGE_EVENT = "secretpanel:rephrase-tone-change";

function readStoredToneId(): string {
  if (typeof window === "undefined") return DEFAULT_TONE_ID;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && TONE_OPTIONS.some((option) => option.id === stored)) {
      return stored;
    }
  } catch {
    // ignore storage errors (private mode, etc.)
  }
  return DEFAULT_TONE_ID;
}

function subscribeToToneChanges(callback: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY) callback();
  }
  window.addEventListener("storage", handleStorage);
  window.addEventListener(TONE_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(TONE_CHANGE_EVENT, callback);
  };
}

function persistToneId(next: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // ignore storage errors
  }
  window.dispatchEvent(new Event(TONE_CHANGE_EVENT));
}

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

  const toneId = useSyncExternalStore(
    subscribeToToneChanges,
    readStoredToneId,
    () => DEFAULT_TONE_ID,
  );

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
  const activeTone = TONE_OPTIONS.find((option) => option.id === toneId) ?? TONE_OPTIONS[0];

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
          tone: activeTone.apiValue,
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
        title={`${copy.tooltip} (${activeTone.label[language]})`}
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
          <div className="admin-rephrase-panel-field">
            <span className="admin-rephrase-panel-label">{copy.instructionsHeading}</span>
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

          <div className="admin-rephrase-tones" role="group" aria-label={copy.toneHeading}>
            <span className="admin-rephrase-panel-label">{copy.toneHeading}</span>
            <div className="admin-rephrase-tone-chips">
              {TONE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={option.id === toneId ? "active" : ""}
                  aria-pressed={option.id === toneId}
                  onClick={() => persistToneId(option.id)}
                >
                  {option.label[language]}
                </button>
              ))}
            </div>
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
