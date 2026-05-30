"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Property = { slug: string; title: string };

type Locale = "ar" | "en";

const LABELS: Record<
  Locale,
  {
    property: string;
    checkin: string;
    checkout: string;
    guests: string;
    adult: string;
    adults: string;
    search: string;
    less: string;
    more: string;
  }
> = {
  ar: {
    property: "الوجهة",
    checkin: "تاريخ الوصول",
    checkout: "تاريخ المغادرة",
    guests: "الضيوف",
    adult: "بالغ",
    adults: "بالغين",
    search: "تحقق من التوفر",
    less: "إنقاص عدد البالغين",
    more: "زيادة عدد البالغين",
  },
  en: {
    property: "Destination",
    checkin: "Check-in",
    checkout: "Check-out",
    guests: "Guests",
    adult: "adult",
    adults: "adults",
    search: "Check availability",
    less: "Fewer adults",
    more: "More adults",
  },
};

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

export default function BookingBar({
  properties,
  locale,
}: {
  properties: Property[];
  locale: Locale;
}) {
  const t = LABELS[locale];
  const router = useRouter();

  const [slug, setSlug] = useState(properties[0]?.slug ?? "");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [today, setToday] = useState("");
  const [adults, setAdults] = useState(2);

  // Compute dates on the client only to avoid SSR/hydration mismatch.
  useEffect(() => {
    const now = new Date();
    const todayIso = isoDate(now);
    setToday(todayIso);
    setCheckin(addDays(todayIso, 1));
    setCheckout(addDays(todayIso, 2));
  }, []);

  // Keep checkout strictly after checkin.
  useEffect(() => {
    if (checkin && checkout && checkout <= checkin) {
      setCheckout(addDays(checkin, 1));
    }
  }, [checkin, checkout]);

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
      className="booking-bar reveal-scale-up"
      style={{ "--delay": "450ms" } as React.CSSProperties}
    >
      <label className="booking-field">
        <span>{t.property}</span>
        <select
          className="booking-control booking-select"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          aria-label={t.property}
        >
          {properties.map((property) => (
            <option key={property.slug} value={property.slug}>
              {property.title}
            </option>
          ))}
        </select>
      </label>

      <label className="booking-field">
        <span>{t.checkin}</span>
        <input
          className="booking-control booking-date"
          type="date"
          value={checkin}
          min={today || undefined}
          onChange={(event) => setCheckin(event.target.value)}
          aria-label={t.checkin}
        />
      </label>

      <label className="booking-field">
        <span>{t.checkout}</span>
        <input
          className="booking-control booking-date"
          type="date"
          value={checkout}
          min={checkin ? addDays(checkin, 1) : today || undefined}
          onChange={(event) => setCheckout(event.target.value)}
          aria-label={t.checkout}
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
            {adults} {adults === 1 ? t.adult : t.adults}
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
