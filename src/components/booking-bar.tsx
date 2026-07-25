"use client";

import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import { BOOKING_URL } from "@/lib/content";
import { trackAnalyticsEvent } from "@/lib/analytics-events";
import type { EditableSiteContent } from "@/lib/editable-content";

type Property = { slug: string; title: string; city: string };

type Locale = "ar" | "en";

type BookingLabels = EditableSiteContent["ar"]["ui"]["bookingBar"];
type DropdownPosition = { left: number; top: number; width: number; maxHeight: number };

const DROPDOWN_GAP = 10;
const DROPDOWN_MIN_WIDTH = 320;
const DROPDOWN_MAX_WIDTH = 520;
const DROPDOWN_MAX_HEIGHT = 330;
const VIEWPORT_MARGIN = 12;

function BookingDestinationDropdown({
  properties,
  locale,
  label,
  value,
  onChange,
}: {
  properties: Property[];
  locale: Locale;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const selectedIndex = Math.max(
    0,
    properties.findIndex((property) => property.slug === value),
  );
  const selectedProperty = properties[selectedIndex] ?? properties[0];
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const [position, setPosition] = useState<DropdownPosition | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const isArabic = locale === "ar";
  const popoverStyle: CSSProperties | undefined = position
    ? {
        left: position.left,
        maxHeight: position.maxHeight,
        top: position.top,
        width: position.width,
      }
    : undefined;

  const listboxId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (!rootRef.current?.contains(target) && !popoverRef.current?.contains(target)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function placeDropdown() {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;

    const availableWidth = window.innerWidth - VIEWPORT_MARGIN * 2;
    const width = Math.min(
      Math.max(rect.width, Math.min(DROPDOWN_MIN_WIDTH, availableWidth)),
      DROPDOWN_MAX_WIDTH,
      availableWidth,
    );
    const preferredLeft = isArabic ? rect.right - width : rect.left;
    const left = Math.min(
      Math.max(preferredLeft, VIEWPORT_MARGIN),
      window.innerWidth - width - VIEWPORT_MARGIN,
    );
    const preferredHeight = Math.min(DROPDOWN_MAX_HEIGHT, properties.length * 52 + 16);
    const belowTop = rect.bottom + DROPDOWN_GAP;
    const belowSpace = window.innerHeight - belowTop - VIEWPORT_MARGIN;
    const aboveSpace = rect.top - DROPDOWN_GAP - VIEWPORT_MARGIN;
    const opensAbove = belowSpace < preferredHeight && aboveSpace > belowSpace;
    const maxHeight = Math.max(168, Math.min(preferredHeight, opensAbove ? aboveSpace : belowSpace));
    const top = opensAbove ? Math.max(VIEWPORT_MARGIN, rect.top - DROPDOWN_GAP - maxHeight) : belowTop;

    setPosition({ left, maxHeight, top, width });
  }

  function openDropdown() {
    placeDropdown();
    setActiveIndex(selectedIndex);
    setOpen(true);
  }

  function toggleDropdown() {
    if (open) {
      setOpen(false);
      return;
    }
    openDropdown();
  }

  function selectProperty(next: Property) {
    onChange(next.slug);
    setOpen(false);
  }

  function onButtonKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        openDropdown();
      }
      setActiveIndex((current) => {
        if (!properties.length) return 0;
        const step = event.key === "ArrowDown" ? 1 : -1;
        return (current + step + properties.length) % properties.length;
      });
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open && properties[activeIndex]) {
        selectProperty(properties[activeIndex]);
        return;
      }
      openDropdown();
    }

    if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
    }
  }

  function onListKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (!properties.length) return;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((current) => (current + step + properties.length) % properties.length);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(properties.length - 1);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectProperty(properties[activeIndex]);
    }
  }

  return (
    <div className="booking-destination" ref={rootRef}>
      <button
        type="button"
        className={`booking-control booking-destination-trigger${open ? " is-open" : ""}`}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        onClick={toggleDropdown}
        onKeyDown={onButtonKeyDown}
      >
        <span className="booking-destination-value">
          <strong>{selectedProperty?.title ?? ""}</strong>
          <small>{selectedProperty?.city ?? ""}</small>
        </span>
        <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open
        ? createPortal(
            <div
              id={listboxId}
              className="booking-destination-popover"
              role="listbox"
              aria-label={label}
              dir={isArabic ? "rtl" : "ltr"}
              ref={popoverRef}
              style={popoverStyle}
              tabIndex={-1}
              onKeyDown={onListKeyDown}
            >
              {properties.map((property, index) => {
                const selected = property.slug === value;
                return (
                  <button
                    key={property.slug}
                    type="button"
                    className={[
                      "booking-destination-option",
                      selected ? "is-selected" : "",
                      index === activeIndex ? "is-active" : "",
                    ].filter(Boolean).join(" ")}
                    role="option"
                    aria-selected={selected}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => selectProperty(property)}
                  >
                    <span className="booking-destination-option-copy">
                      <strong>{property.title}</strong>
                      <small>{property.city}</small>
                    </span>
                    {selected ? (
                      <svg viewBox="0 0 24 24" aria-hidden="true" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m5 12 4 4L19 6" />
                      </svg>
                    ) : null}
                  </button>
                );
              })}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

export default function BookingBar({
  properties,
  locale,
  labels,
}: {
  properties: Property[];
  locale: Locale;
  labels: BookingLabels;
}) {
  const t = labels;
  const [slug, setSlug] = useState(properties[0]?.slug ?? "");
  const rootRef = useRef<HTMLDivElement>(null);
  const defaultPropertyLabel = locale === "ar" ? "المنشأة" : "Property";
  const defaultBookNowLabel = locale === "ar" ? "احجز الآن" : "Book now";
  const propertyLabel =
    !t.property.trim() || t.property === "Destination" || t.property === "الوجهة"
      ? defaultPropertyLabel
      : t.property;
  const bookNowLabel =
    !t.search.trim() || t.search === "Check availability" || t.search === "تحقق من التوفر"
      ? defaultBookNowLabel
      : t.search;
  const helperText =
    locale === "ar" ? "اختر المنشأة المناسبة لإقامتك" : "Choose the property for your stay";
  const eyebrow =
    locale === "ar"
      ? "مستوى خدمات يليق بزوار المملكة"
      : "A level of service worthy of visitors to the Kingdom";
  const secureLabel = locale === "ar" ? "حجز آمن" : "Secure booking";
  const bestRateLabel = locale === "ar" ? "أفضل سعر متاح" : "Best available rate";

  // Publish the rendered bar height so the hero carousel dots can sit a fixed
  // gap above the (variable-height) stacked bar on mobile, instead of relying
  // on a brittle hard-coded offset.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const root = document.documentElement;
    const apply = () => root.style.setProperty("--hero-booking-h", `${el.offsetHeight}px`);
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--hero-booking-h");
    };
  }, []);

  function selectProperty(nextSlug: string) {
    setSlug(nextSlug);
    trackAnalyticsEvent("property_selected", { locale, property_slug: nextSlug });
  }

  function search() {
    trackAnalyticsEvent("booking_cta_click", { locale, property_slug: slug, placement: "booking_bar" });
    window.location.assign(BOOKING_URL);
  }

  return (
    <div
      ref={rootRef}
      className="booking-bar reveal-scale-up"
      style={{ "--delay": "450ms" } as React.CSSProperties}
    >
      <div className="booking-intro">
        <span className="booking-eyebrow">{eyebrow}</span>
        <strong>{bookNowLabel}</strong>
        <span className="booking-helper">{helperText}</span>
      </div>

      <div className="booking-field">
        <span>{propertyLabel}</span>
        <BookingDestinationDropdown
          properties={properties}
          locale={locale}
          label={propertyLabel}
          value={slug}
          onChange={selectProperty}
        />
      </div>

      <button
        type="button"
        className="btn btn-primary booking-search min-h-[54px] justify-center"
        onClick={search}
      >
        <span>{bookNowLabel}</span>
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>

      <div
        className="booking-assurance"
        aria-label={locale === "ar" ? "مزايا الحجز" : "Booking benefits"}
      >
        <span>
          <ShieldCheck aria-hidden="true" />
          {secureLabel}
        </span>
        <span>
          <BadgeCheck aria-hidden="true" />
          {bestRateLabel}
        </span>
      </div>
    </div>
  );
}
