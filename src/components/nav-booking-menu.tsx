type BookingProperty = {
  slug: string;
  title: string;
  city: string;
  bookingUrl: string;
};

export default function NavBookingMenu({
  properties,
  label,
  locale,
  fallbackUrl,
}: {
  properties: BookingProperty[];
  label: string;
  locale: "ar" | "en";
  fallbackUrl: string;
}) {
  const bookableProperties = properties.filter((property) => property.bookingUrl.trim());

  if (!bookableProperties.length) {
    return (
      <a className="btn btn-primary nav-book-btn" href={fallbackUrl}>
        {label}
      </a>
    );
  }

  const chooseLabel = locale === "ar" ? "اختر الفندق للحجز" : "Choose a hotel to book";

  return (
    <div className="nav-dropdown nav-booking-dropdown">
      <button
        className="btn btn-primary nav-book-btn nav-booking-trigger"
        type="button"
        aria-haspopup="true"
        aria-label={chooseLabel}
      >
        <span>{label}</span>
        <svg
          className="nav-booking-chevron"
          viewBox="0 0 24 24"
          width="15"
          height="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div className="nav-menu nav-booking-menu" aria-label={chooseLabel} dir={locale === "ar" ? "rtl" : "ltr"}>
        {bookableProperties.map((property) => (
          <a className="nav-booking-option" href={property.bookingUrl} key={property.slug}>
            <span className="nav-booking-option-copy">
              <strong>{property.title}</strong>
              <small>{property.city}</small>
            </span>
            <svg
              className="nav-booking-arrow"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
