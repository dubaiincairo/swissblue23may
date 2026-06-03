"use client";

import type { ReactNode } from "react";
import { useState } from "react";

// "Share this page" buttons. Shares the current page URL (read at click time),
// so it works on any page without server props.

type ShareTarget = "facebook" | "x" | "whatsapp" | "linkedin" | "copy";

const TARGETS: { key: ShareTarget; label: string; path: ReactNode }[] = [
  {
    key: "facebook",
    label: "Facebook",
    path: <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />,
  },
  {
    key: "x",
    label: "X",
    path: <path d="M18.9 1.75h3.3l-7.2 8.23L23.7 22.25h-6.63l-5.2-6.79-5.94 6.79H2.62l7.7-8.8L1.2 1.75h6.8l4.7 6.21 5.4-6.21Zm-1.16 18.5h1.83L7.34 3.65H5.38L17.74 20.25Z" />,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    path: <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1.01 2.54.12.16 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    path: <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm6 0h3.83v1.64h.05c.53-1 1.84-2.06 3.79-2.06C20.5 8.58 22 10.28 22 13.6V21h-4v-6.56c0-1.56-.03-3.57-2.18-3.57-2.18 0-2.51 1.7-2.51 3.46V21H9V9Z" />,
  },
  {
    key: "copy",
    label: "Copy link",
    path: <path d="M3.9 12a3.1 3.1 0 0 1 3.1-3.1h4V7h-4a5 5 0 0 0 0 10h4v-1.9h-4A3.1 3.1 0 0 1 3.9 12Zm4.6.9h6.99v-1.8H8.5v1.8ZM17 7h-4v1.9h4a3.1 3.1 0 0 1 0 6.2h-4V17h4a5 5 0 0 0 0-10Z" />,
  },
];

export default function SocialShare({ label = "Share", copiedLabel = "Link copied!" }: { label?: string; copiedLabel?: string }) {
  const [copied, setCopied] = useState(false);

  function share(target: ShareTarget) {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    const title = document.title || "Swiss Blue Hotels";
    const u = encodeURIComponent(url);
    const t = encodeURIComponent(title);

    if (target === "copy") {
      navigator.clipboard
        ?.writeText(url)
        .then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        })
        .catch(() => {});
      return;
    }

    const links: Record<Exclude<ShareTarget, "copy">, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      x: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      whatsapp: `https://wa.me/?text=${t}%20${u}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    };
    window.open(links[target], "_blank", "noopener,noreferrer,width=600,height=540");
  }

  return (
    <div className="social-share" dir="ltr">
      <span className="social-share-label">{copied ? copiedLabel : label}</span>
      <div className="social-share-buttons">
        {TARGETS.map((target) => (
          <button
            key={target.key}
            type="button"
            className={`social-share-btn social-share-${target.key}`}
            onClick={() => share(target.key)}
            aria-label={`${label} — ${target.label}`}
            title={target.label}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              {target.path}
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
