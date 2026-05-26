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

  return (
    <section className="property-map-section mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" dir={isArabic ? "rtl" : "ltr"}>
      <div className="property-map-card">
        <div className="property-map-copy">
          <span className="eyebrow">{isArabic ? "الموقع على الخريطة" : "Map location"}</span>
          <h2>{isArabic ? `موقع ${title}` : `${title} location`}</h2>
          <p>
            {isArabic
              ? "استعرض موقع الوجهة على خرائط Google لتخطيط الوصول والتنقل حول المنطقة."
              : "View the property on Google Maps to plan arrival and nearby movement."}
          </p>
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
