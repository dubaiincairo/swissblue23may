import type React from "react";

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
  buttonClassName = "btn btn-primary nav-book-btn",
  dropdownClassName = "nav-booking-dropdown",
  menuClassName = "nav-booking-menu",
}: {
  properties: BookingProperty[];
  label: React.ReactNode;
  locale: "ar" | "en";
  fallbackUrl: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  menuClassName?: string;
}) {
  const bookableProperties = properties.filter((property) => property.bookingUrl.trim());

  if (!bookableProperties.length) {
    return (
      <a className={buttonClassName} href={fallbackUrl}>
        {label}
      </a>
    );
  }

  const chooseLabel = locale === "ar" ? "اختر الفندق للحجز" : "Choose a hotel to book";

  return (
    <div className={`nav-dropdown ${dropdownClassName}`}>
      <button
        className={buttonClassName}
        type="button"
        aria-haspopup="true"
        aria-label={chooseLabel}
      >
        {label}
      </button>

      <div className={`nav-menu ${menuClassName}`} aria-label={chooseLabel} dir={locale === "ar" ? "rtl" : "ltr"}>
        {bookableProperties.map((property) => (
          <a className="nav-booking-option" href={property.bookingUrl} key={property.slug}>
            <span className="nav-booking-option-copy">
              <strong>{property.title}</strong>
              <small>{property.city}</small>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
