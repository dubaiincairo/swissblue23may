const MapPinIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const DirectionsIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

export default function PropertyMap({
  city,
  locale,
  query,
  title,
}: {
  city: string;
  locale: "ar" | "en";
  query?: string;
  title: string;
}) {
  const isArabic = locale === "ar";
  const mapQuery = query?.trim() || `${title} ${city}`;
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
  const openMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;

  return (
    <section
      className="property-map-section mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="property-map-card reveal-scale-up">
        <div className="property-map-copy">
          <span className="eyebrow">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ display: "inline-flex", alignItems: "center", color: "var(--primary)" }}>
                <span style={{ width: 14, height: 14, display: "inline-block" }}>{MapPinIcon}</span>
              </span>
              {isArabic ? "الموقع على الخريطة" : "Map location"}
            </span>
          </span>
          <h2>{isArabic ? `موقع ${title}` : `${title} location`}</h2>
          <p>
            {isArabic
              ? "استعرض موقع الوجهة على خرائط Google لتخطيط الوصول والتنقل بين المعالم القريبة، ثم احصل على الاتجاهات مباشرة من تطبيق الخرائط."
              : "View the property on Google Maps to plan arrival and movement around nearby landmarks, then jump straight into directions from the Maps app."}
          </p>
          <div className="property-map-actions">
            <a
              className="btn btn-primary"
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ alignItems: "center", display: "inline-flex", gap: 8 }}
            >
              <span style={{ width: 16, height: 16, display: "inline-block" }}>{DirectionsIcon}</span>
              {isArabic ? "احصل على الاتجاهات" : "Get directions"}
            </a>
            <a
              className="btn btn-secondary"
              href={openMapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {isArabic ? "فتح في خرائط Google" : "Open in Google Maps"}
            </a>
          </div>
        </div>
        <div className="property-map-frame">
          <iframe
            src={mapUrl}
            title={isArabic ? `خريطة ${title}` : `${title} map`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
