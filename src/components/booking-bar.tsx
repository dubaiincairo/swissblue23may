"use client";

import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { DatePicker } from "@/components/date-picker";
import type { EditableSiteContent } from "@/lib/editable-content";

type Property = { slug: string; title: string };

type Locale = "ar" | "en";

type BookingLabels = EditableSiteContent["ar"]["ui"]["bookingBar"];
type DropdownPosition = { left: number; top: number; width: number; maxHeight: number };

const DROPDOWN_GAP = 10;
const DROPDOWN_MIN_WIDTH = 320;
const DROPDOWN_MAX_WIDTH = 520;
const DROPDOWN_MAX_HEIGHT = 330;
const VIEWPORT_MARGIN = 12;

function isoDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return isoDate(d);
}

function subscribeToClientDate(onStoreChange: () => void) {
  const timeout = window.setTimeout(onStoreChange, 0);
  return () => window.clearTimeout(timeout);
}

function getClientToday() {
  return isoDate(new Date());
}

function getServerToday() {
  return "";
}

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
        <span>{selectedProperty?.title ?? ""}</span>
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
                    <span>{property.title}</span>
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
  const router = useRouter();

  const [slug, setSlug] = useState(properties[0]?.slug ?? "");
  const [selectedCheckin, setSelectedCheckin] = useState("");
  const [selectedCheckout, setSelectedCheckout] = useState("");
  const today = useSyncExternalStore(subscribeToClientDate, getClientToday, getServerToday);
  const [adults, setAdults] = useState(2);
  const rootRef = useRef<HTMLDivElement>(null);
  const defaultCheckin = today ? addDays(today, 1) : "";
  const defaultCheckout = today ? addDays(today, 2) : "";
  const checkin = selectedCheckin || defaultCheckin;
  const requestedCheckout = selectedCheckout || defaultCheckout;
  const checkout =
    checkin && requestedCheckout && requestedCheckout <= checkin
      ? addDays(checkin, 1)
      : requestedCheckout;

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

  function search() {
    if (!slug) return;
    const prefix = locale === "ar" ? "" : "/en";
    const params = new URLSearchParams();
    if (checkin) params.set("checkin", checkin);
    if (checkout) params.set("checkout", checkout);
    params.set("adults", String(adults));
    router.push(`${prefix}/hotels/${slug}?${params.toString()}`);
  }

  return (
    <div
      ref={rootRef}
      className="booking-bar reveal-scale-up"
      style={{ "--delay": "450ms" } as React.CSSProperties}
    >
      <label className="booking-field">
        <span>{t.property}</span>
        <BookingDestinationDropdown
          properties={properties}
          locale={locale}
          label={t.property}
          value={slug}
          onChange={setSlug}
        />
      </label>

      <label className="booking-field">
        <span>{t.checkin}</span>
        <DatePicker
          value={checkin}
          min={today || undefined}
          locale={locale}
          ariaLabel={t.checkin}
          variant="booking"
          allowClear={false}
          onChange={setSelectedCheckin}
        />
      </label>

      <label className="booking-field">
        <span>{t.checkout}</span>
        <DatePicker
          value={checkout}
          min={checkin ? addDays(checkin, 1) : today || undefined}
          locale={locale}
          ariaLabel={t.checkout}
          variant="booking"
          allowClear={false}
          onChange={setSelectedCheckout}
        />
      </label>

      <div className="booking-field">
        <span>{t.guests}</span>
        <div className="booking-stepper" role="group" aria-label={t.guests}>
          <button
            type="button"
            className="booking-step"
            onClick={() => setAdults((n) => Math.max(1, n - 1))}
            disabled={adults <= 1}
            aria-label={t.less}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14" />
            </svg>
          </button>
          <span className="booking-step-value" aria-live="polite">
            {adults}
            <span className="booking-step-unit"> {adults === 1 ? t.adult : t.adults}</span>
          </span>
          <button
            type="button"
            className="booking-step"
            onClick={() => setAdults((n) => Math.min(12, n + 1))}
            disabled={adults >= 12}
            aria-label={t.more}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary booking-search min-h-[54px] justify-center"
        onClick={search}
      >
        {t.search}
      </button>
    </div>
  );
}
