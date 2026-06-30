"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Locale = "ar" | "en";
type DatePickerVariant = "booking" | "form";
type DatePickerAlign = "start" | "end";
type DatePickerPlacement = "bottom" | "top";
type DatePickerPosition = { left: number; top: number; width: number };

type DatePickerProps = {
  name?: string;
  value?: string;
  defaultValue?: string;
  min?: string;
  locale: Locale;
  ariaLabel: string;
  placeholder?: string;
  variant?: DatePickerVariant;
  align?: DatePickerAlign;
  allowClear?: boolean;
  onChange?: (value: string) => void;
};

const WEEK_START = 0;
const MONTH_GRID_SIZE = 42;
const POPOVER_WIDTH = 280;
const POPOVER_HEIGHT = 344;
const POPOVER_GAP = 10;
const VIEWPORT_MARGIN = 12;

function isoDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

function parseIsoDate(value: string | undefined) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function formatDisplayDate(value: string, locale: Locale) {
  const date = parseIsoDate(value);
  if (!date) return "";

  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA-u-ca-gregory" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function monthLabel(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA-u-ca-gregory" : "en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function weekdayLabels(locale: Locale) {
  const formatter = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA-u-ca-gregory" : "en-US", {
    weekday: "narrow",
  });
  const sunday = new Date(2026, 5, 7);

  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(sunday);
    day.setDate(sunday.getDate() + index);
    return formatter.format(day);
  });
}

function calendarDays(viewDate: Date) {
  const monthStart = startOfMonth(viewDate);
  const start = new Date(monthStart);
  const offset = (monthStart.getDay() - WEEK_START + 7) % 7;
  start.setDate(monthStart.getDate() - offset);

  return Array.from({ length: MONTH_GRID_SIZE }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return {
      date,
      iso: isoDate(date),
      inCurrentMonth: date.getMonth() === viewDate.getMonth(),
    };
  });
}

export function DatePicker({
  name,
  value,
  defaultValue = "",
  min,
  locale,
  ariaLabel,
  placeholder,
  variant = "form",
  align = "start",
  allowClear = true,
  onChange,
}: DatePickerProps) {
  const controlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = controlled ? value : internalValue;
  const selectedDate = parseIsoDate(selectedValue);
  const minDate = parseIsoDate(min);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DatePickerPlacement>("bottom");
  const [popoverPosition, setPopoverPosition] = useState<DatePickerPosition | null>(null);
  const [viewDate, setViewDate] = useState(() => startOfMonth(selectedDate ?? minDate ?? new Date()));
  const rootRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const today = isoDate(new Date());
  const days = useMemo(() => calendarDays(viewDate), [viewDate]);
  const weekdays = useMemo(() => weekdayLabels(locale), [locale]);
  const displayValue = selectedValue ? formatDisplayDate(selectedValue, locale) : "";
  const popoverStyle: CSSProperties | undefined = popoverPosition
    ? { left: popoverPosition.left, top: popoverPosition.top, width: popoverPosition.width }
    : undefined;

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (!rootRef.current?.contains(target) && !popoverRef.current?.contains(target)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
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

  function updateDate(nextValue: string) {
    if (!controlled) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  }

  function selectDate(nextValue: string) {
    updateDate(nextValue);
    setOpen(false);
  }

  function togglePicker() {
    const rect = rootRef.current?.getBoundingClientRect();
    if (rect) {
      const width = Math.min(POPOVER_WIDTH, window.innerWidth - VIEWPORT_MARGIN * 2);
      const preferredLeft = align === "end" ? rect.right - width : rect.left;
      const left = Math.min(
        Math.max(preferredLeft, VIEWPORT_MARGIN),
        window.innerWidth - width - VIEWPORT_MARGIN,
      );
      const belowTop = rect.bottom + POPOVER_GAP;
      const aboveTop = rect.top - POPOVER_HEIGHT - POPOVER_GAP;
      const top =
        belowTop + POPOVER_HEIGHT <= window.innerHeight - VIEWPORT_MARGIN
          ? belowTop
          : aboveTop >= VIEWPORT_MARGIN
            ? aboveTop
            : Math.max(VIEWPORT_MARGIN, window.innerHeight - POPOVER_HEIGHT - VIEWPORT_MARGIN);

      setPlacement(top < rect.top ? "top" : "bottom");
      setPopoverPosition({ left, top, width });
    }
    setViewDate(startOfMonth(parseIsoDate(selectedValue) ?? minDate ?? new Date()));
    setOpen((current) => !current);
  }

  const clearLabel = locale === "ar" ? "مسح" : "Clear";
  const todayLabel = locale === "ar" ? "اليوم" : "Today";
  const previousMonthLabel = locale === "ar" ? "الشهر السابق" : "Previous month";
  const nextMonthLabel = locale === "ar" ? "الشهر التالي" : "Next month";
  const isTodayDisabled = Boolean(min && today < min);
  const popover = (
    <div
      className="date-picker-popover"
      role="dialog"
      aria-label={ariaLabel}
      dir={locale === "ar" ? "rtl" : "ltr"}
      ref={popoverRef}
      style={popoverStyle}
    >
      <div className="date-picker-head">
        <strong>{monthLabel(viewDate, locale)}</strong>
        <div className="date-picker-nav">
          <button
            type="button"
            aria-label={previousMonthLabel}
            onClick={() => setViewDate((current) => addMonths(current, -1))}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={nextMonthLabel}
            onClick={() => setViewDate((current) => addMonths(current, 1))}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="date-picker-weekdays" aria-hidden="true">
        {weekdays.map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>

      <div className="date-picker-grid">
        {days.map((day) => {
          const disabled = Boolean(min && day.iso < min);
          return (
            <button
              key={day.iso}
              type="button"
              className={[
                "date-picker-day",
                !day.inCurrentMonth ? "is-outside" : "",
                day.iso === selectedValue ? "is-selected" : "",
                day.iso === today ? "is-today" : "",
              ].filter(Boolean).join(" ")}
              disabled={disabled}
              aria-pressed={day.iso === selectedValue}
              onClick={() => selectDate(day.iso)}
            >
              {day.date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="date-picker-actions">
        {allowClear ? (
          <button type="button" onClick={() => updateDate("")} disabled={!selectedValue}>
            {clearLabel}
          </button>
        ) : (
          <span />
        )}
        <button type="button" onClick={() => selectDate(today)} disabled={isTodayDisabled}>
          {todayLabel}
        </button>
      </div>
    </div>
  );

  return (
    <div
      className={`date-picker date-picker-${variant} date-picker-align-${align}`}
      data-placement={placement}
      ref={rootRef}
    >
      {name ? <input name={name} type="hidden" value={selectedValue} readOnly /> : null}
      <button
        type="button"
        className={displayValue ? "date-picker-button" : "date-picker-button is-empty"}
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={togglePicker}
      >
        <span>{displayValue || placeholder || (locale === "ar" ? "يوم/شهر/سنة" : "dd/mm/yyyy")}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <path d="M3 10h18" />
          <rect x="3" y="4" width="18" height="18" rx="4" />
        </svg>
      </button>

      {open ? createPortal(popover, document.body) : null}
    </div>
  );
}
