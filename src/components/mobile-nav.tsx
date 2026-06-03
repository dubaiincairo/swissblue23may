"use client";

// Accessible off-canvas mobile navigation, portaled to document.body.
import Image from "next/image";
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
  logo,
}: {
  groups: NavGroup[];
  locale: "ar" | "en";
  bookingUrl: string;
  labels: Strings;
  bookLabel: string;
  logo?: string;
}) {
  const t = labels;
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
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
                  {logo ? (
                    <Image
                      className="mobile-nav-logo"
                      src={logo}
                      alt=""
                      width={150}
                      height={60}
                    />
                  ) : (
                    <span className="mobile-nav-title">{t.menu}</span>
                  )}
                  <button
                    ref={closeRef}
                    type="button"
                    className="mobile-nav-close"
                    aria-label={t.close}
                    onClick={closeMenu}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                      <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                  </button>
                </div>

                <nav className="mobile-nav-body" aria-label={t.menu}>
                  {groups.map((group) => (
                    <div className="mobile-nav-group" key={group.label}>
                      <span className="mobile-nav-group-label">{group.label}</span>
                      <ul className="mobile-nav-group-links">
                        {group.links.map((item) => (
                          <li key={`${group.label}-${item.href}`}>
                            <Link
                              className="mobile-nav-link"
                              href={item.href}
                              onClick={closeMenu}
                            >
                              <span>{item.label}</span>
                              <svg
                                className="mobile-nav-link-arrow"
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M9 6l6 6-6 6" />
                              </svg>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>

                <div className="mobile-nav-foot">
                  <a className="btn btn-primary mobile-nav-cta" href={bookingUrl}>
                    {bookLabel}
                  </a>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
