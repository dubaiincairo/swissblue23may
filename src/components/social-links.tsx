import type { ReactNode } from "react";

// Clickable social-profile icons for the footer. Renders only the platforms
// that have a non-empty URL, so the admin controls what appears by filling in
// the "Social media links" section.

export type SocialKey =
  | "instagram"
  | "facebook"
  | "x"
  | "tiktok"
  | "snapchat"
  | "youtube"
  | "linkedin";

export type SocialMap = Partial<Record<SocialKey, string>>;

const ORDER: SocialKey[] = ["instagram", "facebook", "x", "tiktok", "snapchat", "youtube", "linkedin"];

const ICONS: Record<SocialKey, { label: string; path: ReactNode }> = {
  instagram: {
    label: "Instagram",
    path: (
      <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5.01-4.74.07-.9.04-1.38.19-1.7.32-.43.16-.74.36-1.06.68-.32.32-.52.63-.68 1.06-.13.32-.28.8-.32 1.7C3.2 8.5 3.2 8.85 3.2 12s.01 3.5.07 4.74c.04.9.19 1.38.32 1.7.16.43.36.74.68 1.06.32.32.63.52 1.06.68.32.13.8.28 1.7.32 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.38-.19 1.7-.32.43-.16.74-.36 1.06-.68.32-.32.52-.63.68-1.06.13-.32.28-.8.32-1.7.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.38-.32-1.7a2.86 2.86 0 0 0-.68-1.06 2.86 2.86 0 0 0-1.06-.68c-.32-.13-.8-.28-1.7-.32C15.5 4.01 15.15 4 12 4Zm0 3.06A4.94 4.94 0 1 1 7.06 12 4.94 4.94 0 0 1 12 7.06Zm0 1.8A3.14 3.14 0 1 0 15.14 12 3.14 3.14 0 0 0 12 8.86Zm5.14-.43a1.15 1.15 0 1 1-1.15-1.15 1.15 1.15 0 0 1 1.15 1.15Z" />
    ),
  },
  facebook: {
    label: "Facebook",
    path: (
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    ),
  },
  x: {
    label: "X (Twitter)",
    path: (
      <path d="M18.9 1.75h3.3l-7.2 8.23L23.7 22.25h-6.63l-5.2-6.79-5.94 6.79H2.62l7.7-8.8L1.2 1.75h6.8l4.7 6.21 5.4-6.21Zm-1.16 18.5h1.83L7.34 3.65H5.38L17.74 20.25Z" />
    ),
  },
  tiktok: {
    label: "TikTok",
    path: (
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.2v12.5a2.46 2.46 0 1 1-2.46-2.46c.26 0 .5.04.74.12v-3.3a5.76 5.76 0 0 0-.74-.05 5.76 5.76 0 1 0 5.76 5.76V9.01a7.55 7.55 0 0 0 4.36 1.39V7.2a4.28 4.28 0 0 1-3.4-1.38Z" />
    ),
  },
  snapchat: {
    label: "Snapchat",
    path: (
      <path d="M12 2.2c2.46 0 4.18 1.85 4.28 4.27.03.65 0 1.28-.05 1.86.28.14.62.18.97.05.5-.18.92.06 1.02.43.1.4-.14.71-.63.91-.31.12-.97.3-1.12.67-.1.24.02.55.2.86.5.86 1.32 1.62 2.34 1.97.3.1.5.35.45.67-.08.48-.92.75-1.65.91-.2.04-.31.1-.35.3-.04.19-.1.5-.5.5-.31 0-.72-.1-1.22-.1-.71 0-1.12.1-1.63.6-.61.6-1.32 1.12-2.64 1.12s-2.03-.52-2.64-1.12c-.51-.5-.92-.6-1.63-.6-.5 0-.91.1-1.22.1-.4 0-.46-.31-.5-.5-.04-.2-.15-.26-.35-.3-.73-.16-1.57-.43-1.65-.91-.05-.32.15-.57.45-.67 1.02-.35 1.84-1.11 2.34-1.97.18-.31.3-.62.2-.86-.15-.37-.81-.55-1.12-.67-.49-.2-.73-.51-.63-.91.1-.37.52-.61 1.02-.43.35.13.69.09.97-.05-.05-.58-.08-1.21-.05-1.86C7.82 4.05 9.54 2.2 12 2.2Z" />
    ),
  },
  youtube: {
    label: "YouTube",
    path: (
      <path d="M23 12s0-3.2-.4-4.74a2.5 2.5 0 0 0-1.76-1.77C19.3 5.1 12 5.1 12 5.1s-7.3 0-8.84.39A2.5 2.5 0 0 0 1.4 7.26C1 8.8 1 12 1 12s0 3.2.4 4.74a2.5 2.5 0 0 0 1.76 1.77C4.7 18.9 12 18.9 12 18.9s7.3 0 8.84-.39a2.5 2.5 0 0 0 1.76-1.77C23 15.2 23 12 23 12ZM9.75 15.02V8.98L15 12l-5.25 3.02Z" />
    ),
  },
  linkedin: {
    label: "LinkedIn",
    path: (
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm6 0h3.83v1.64h.05c.53-1 1.84-2.06 3.79-2.06C20.5 8.58 22 10.28 22 13.6V21h-4v-6.56c0-1.56-.03-3.57-2.18-3.57-2.18 0-2.51 1.7-2.51 3.46V21H9V9Z" />
    ),
  },
};

/** Merge two social maps field-by-field (so the URL only needs setting in one language). */
export function mergeSocial(primary: SocialMap | undefined, fallback: SocialMap | undefined): SocialMap {
  const out: SocialMap = {};
  for (const key of ORDER) {
    const value = (primary?.[key]?.trim() || fallback?.[key]?.trim() || "").trim();
    if (value) out[key] = value;
  }
  return out;
}

export function SocialLinks({ social, heading }: { social: SocialMap; heading?: string }) {
  const items = ORDER.filter((key) => typeof social?.[key] === "string" && social[key]!.trim().length > 0);
  if (items.length === 0) return null;

  return (
    <div className="footer-social" dir="ltr">
      {heading ? <span className="footer-social-label">{heading}</span> : null}
      <ul className="footer-social-list">
        {items.map((key) => (
          <li key={key}>
            <a
              className="footer-social-icon"
              href={social[key]!.trim()}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={ICONS[key].label}
              title={ICONS[key].label}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                {ICONS[key].path}
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
