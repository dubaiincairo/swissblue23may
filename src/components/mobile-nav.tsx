"use client";

// Accessible off-canvas mobile navigation, portaled to document.body.
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useId, useRef, useState } from "react";

type NavLink = { href: string; label: string };
type NavGroup = { label: string; links: NavLink[] };

type Strings = {
  open: string;
  close: string;
  menu: string;
};

export default function MobileNav({
  groups,
  locale,
  bookingUrl,
  labels,
  bookLabel,
}: {
  groups: NavGroup[];
  locale: "ar" | "en";
  bookingUrl: string;
  labels: Strings;
  bookLabel: string;
}) {
  const t = labels;
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Portal target is only available after mount (avoids SSR mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("overlay-open");
    return () => {
      document.body.style.overflow = previous;
      document.body.classList.remove("overlay-open");
    };
  }, [open]);

  // Escape to close; move focus to the close button on open
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function closeMenu() {
    setOpen(false);
    toggleRef.current?.focus();
  }

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="mobile-nav-toggle"
        aria-label={open ? t.close : t.open}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`mobile-nav-burger${open ? " is-open" : ""}`} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      {mounted && open
        ? createPortal(
            <div className="mobile-nav open" dir={locale === "ar" ? "rtl" : "ltr"}>
              <button
                type="button"
                className="mobile-nav-backdrop"
                aria-label={t.close}
                tabIndex={-1}
                onClick={closeMenu}
              />
        <div
          className="mobile-nav-panel"
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label={t.menu}
        >
          <div className="mobile-nav-head">
            <span className="mobile-nav-title">{t.menu}</span>
            <button
              ref={closeRef}
              type="button"
              className="mobile-nav-close"
              aria-label={t.close}
              onClick={closeMenu}
            >
              ×
            </button>
          </div>

          <nav className="mobile-nav-body" aria-label={t.menu}>
            <ul className="mobile-nav-groups">
              {groups.map((group) => {
                const isOpen = expanded === group.label;
                return (
                  <li className="mobile-nav-group" key={group.label}>
                    <button
                      type="button"
                      className="mobile-nav-group-trigger"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setExpanded((prev) => (prev === group.label ? null : group.label))
                      }
                    >
                      <span>{group.label}</span>
                      <span className={`mobile-nav-chevron${isOpen ? " is-open" : ""}`} aria-hidden="true" />
                    </button>
                    <ul className={`mobile-nav-sublist${isOpen ? " is-open" : ""}`}>
                      {group.links.map((item) => (
                        <li key={`${group.label}-${item.href}`}>
                          <Link
                            className="mobile-nav-link"
                            href={item.href}
                            onClick={closeMenu}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>

            <a className="btn btn-primary mobile-nav-cta" href={bookingUrl}>
              {bookLabel}
            </a>
          </nav>
            </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
