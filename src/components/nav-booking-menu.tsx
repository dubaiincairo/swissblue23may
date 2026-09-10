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
        className="btn btn-primary nav-book-btn"
        type="button"
        aria-haspopup="true"
        aria-label={chooseLabel}
      >
        {label}
      </button>

      <div className="nav-menu nav-booking-menu" aria-label={chooseLabel} dir={locale === "ar" ? "rtl" : "ltr"}>
        {bookableProperties.map((property) => (
          <a href={property.bookingUrl} key={property.slug}>
            {property.title} — {property.city}
          </a>
        ))}
      </div>
    </div>
  );
}
