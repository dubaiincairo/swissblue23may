import Image from "next/image";

const BOOKING_URL =
  "https://letsbook.me/booking/yanoljacloudsolution?checkin=2026-05-19&checkout=2026-05-20&adults=2&children=0";

const stats = [
  { value: "282", label: "Rooms and apartments mapped" },
  { value: "6", label: "Properties in the portfolio" },
  { value: "3", label: "Saudi city markets" },
  { value: "6mo", label: "Category review cycle" },
];

const hotels = [
  {
    title: "SwissBlue Hotel Jeddah",
    units: "76 units",
    description:
      "A full hotel inventory with Superior, Deluxe, Junior Suite, Executive Suite, and Presidential Suite categories.",
    href: "https://swissbluehotels.com/swiss-blue-hera/",
  },
  {
    title: "SwissBlue Apart-Hotel Jazan",
    units: "55 units",
    description:
      "Studio, one-bedroom, and two-bedroom apartments with clear city-view and family-apartment options.",
    href: "https://swissbluehotels.com/04_swissblue-jazan/",
  },
  {
    title: "Al Zahraa Serviced Apartments",
    units: "46 units",
    description:
      "Serviced apartments on Prince Sultan Road, organized by studio, one-bedroom, two-bedroom, and city-view categories.",
    href: "https://swissbluehotels.com/02_swissblue-al-zahra/",
  },
  {
    title: "Al Samer Serviced Apartments",
    units: "33 units",
    description:
      "Business-ready studios and apartments with premium one-bedroom and two-bedroom city-view categories.",
    href: "https://swissbluehotels.com/03_swissblue-al-samer/",
  },
  {
    title: "Vinas Riyadh Serviced Apartments",
    units: "35 units",
    description:
      "A Riyadh apartment inventory with one-bedroom, two-bedroom, and three-bedroom options for longer stays.",
    href: "https://swissbluehotels.com/",
  },
  {
    title: "Tulip Alrawdah Serviced Apartments",
    units: "37 units",
    description:
      "Studio, one-bedroom, and two-bedroom apartment categories with selected city-view upgrades.",
    href: "https://swissbluehotels.com/",
  },
];

const amenities = [
  "Premium deluxe rooms and suites",
  "Free and fast Wi-Fi",
  "Breakfast buffet",
  "Restaurant and cafe",
  "Indoor pool",
  "Fully equipped gym",
  "Meeting rooms",
  "Safe locker",
  "Temperature control",
  "Taxi service",
  "Walk-in shower",
  "Coffee, tea tray, and minibar",
];

const categoryPrinciples = [
  {
    title: "Marketing-first room structure",
    description:
      "Categories are shaped for visibility and conversion on booking platforms, not only for back-office operations.",
  },
  {
    title: "Clear guest choice",
    description:
      "Room names separate view, bed setup, bedrooms, bathrooms, and living-room availability so guests can compare quickly.",
  },
  {
    title: "Price ladder clarity",
    description:
      "Higher-tier categories create visible value steps, helping guests choose the stay that fits their budget and occasion.",
  },
];

const portfolioMix = [
  {
    property: "SwissBlue Hotel Jeddah",
    market: "Jeddah",
    total: "76",
    signature: "Hotel rooms, junior suites, executive suites, presidential suites",
  },
  {
    property: "SwissBlue Apart-Hotel Jazan",
    market: "Jazan",
    total: "55",
    signature: "Studios, one-bedroom apartments, family apartments",
  },
  {
    property: "Al Zahraa Serviced Apartments",
    market: "Jeddah",
    total: "46",
    signature: "Studios, one-bedroom apartments, two-bedroom city-view apartments",
  },
  {
    property: "Al Samer Serviced Apartments",
    market: "Jeddah",
    total: "33",
    signature: "Business studios, premium one-bedroom, two-bedroom city-view apartments",
  },
  {
    property: "Vinas Riyadh Serviced Apartments",
    market: "Riyadh",
    total: "35",
    signature: "One-bedroom, two-bedroom, and three-bedroom apartment layouts",
  },
  {
    property: "Tulip Alrawdah Serviced Apartments",
    market: "Riyadh",
    total: "37",
    signature: "Studios, one-bedroom stays, and city-view two-bedroom apartments",
  },
];

const roomHighlights = [
  {
    title: "Superior and Deluxe Rooms",
    detail:
      "King and twin configurations for short stays, business trips, and value-focused city visits.",
  },
  {
    title: "Junior and Executive Suites",
    detail:
      "One- and two-bedroom suite options with living-room space for longer or more comfortable stays.",
  },
  {
    title: "Serviced Apartments",
    detail:
      "Studios, one-bedroom, two-bedroom, and selected three-bedroom layouts for families and extended stays.",
  },
  {
    title: "City-View Upgrades",
    detail:
      "Dedicated city-view categories give premium rooms and apartments a stronger identity on booking pages.",
  },
];

const guestPaths = [
  {
    title: "Business trip",
    description:
      "Choose a Superior or Deluxe room with fast Wi-Fi, direct access to city routes, and essential workday comfort.",
    tags: ["King or twin beds", "Short stays", "Airport access"],
  },
  {
    title: "Extended city stay",
    description:
      "Book a serviced apartment with a living room, kitchenette-style comfort, and more breathing space for longer visits.",
    tags: ["Living room", "One bedroom", "Serviced apartment"],
  },
  {
    title: "Family stay",
    description:
      "Select two-bedroom family apartments with Super King and twin-bed configurations for group comfort.",
    tags: ["Two bedrooms", "Family layout", "More privacy"],
  },
  {
    title: "Premium view",
    description:
      "Move into Deluxe, Premium, or city-view categories when the location and outlook matter most.",
    tags: ["City view", "Higher tier", "Clear value step"],
  },
];

const experiences = [
  {
    title: "Jeddah city stays",
    image:
      "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-abdullah-alallah-314142096-28506330.jpg",
  },
  {
    title: "Red Sea moments",
    image:
      "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-saad-alaiyadhi-131639221-10141408-scaled.jpg",
  },
  {
    title: "Jazan business access",
    image:
      "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-jepoyous-18500929-2.jpg",
  },
];

const reviews = [
  {
    quote:
      "Immaculate suites, friendly 24-hour staff and unbeatable location near the Red Sea Mall.",
    name: "Ahmed A.",
    city: "Riyadh",
  },
  {
    quote:
      "Having a kitchenette and washing machine made our two-week family stay so easy.",
    name: "Sara K.",
    city: "Dubai",
  },
  {
    quote: "Fast Wi-Fi and free parking were perfect for my business meetings.",
    name: "Thomas L.",
    city: "Geneva",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <nav className="sticky top-0 z-30 border-b border-[var(--border)] bg-white/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a
            className="flex items-center gap-3"
            href="#top"
            aria-label="Swiss Blue Hotels home"
          >
            <Image
              className="h-10 w-auto"
              src="https://swissbluehotels.com/wp-content/uploads/2024/03/%D9%84%D9%88%D8%AC%D9%88-%D8%B3%D9%88%D9%8A%D8%B3-%D8%A8%D9%84%D9%88.png"
              alt="Swiss Blue Hotels"
              width={190}
              height={80}
              priority
            />
          </a>
          <div className="hidden items-center gap-6 text-sm font-medium text-[var(--text-secondary)] md:flex">
            <a className="transition hover:text-[var(--primary)]" href="#hotels">
              Hotels
            </a>
            <a className="transition hover:text-[var(--primary)]" href="#amenities">
              Amenities
            </a>
            <a className="transition hover:text-[var(--primary)]" href="#destination">
              Destination
            </a>
          </div>
          <a
            className="btn btn-primary"
            href={BOOKING_URL}
          >
            Book now
          </a>
        </div>
      </nav>

      <section
        id="top"
        className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:py-8"
      >
        <div className="card flex min-h-[560px] flex-col justify-between overflow-hidden p-6 sm:p-8 lg:p-10">
          <div>
            <span className="eyebrow">Hotels and serviced apartments</span>
            <h1 className="mt-5 max-w-3xl text-[40px] font-bold leading-[1.08] text-balance sm:text-[56px] lg:text-[68px]">
              A clearer way to choose your Swiss Blue stay.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
              Swiss Blue brings together hotels and serviced apartments across
              Jeddah, Jazan, Riyadh, and Alrawdah, with room categories designed
              to make every stay easier to compare, book, and enjoy.
            </p>

            <div className="mt-8 rounded-[16px] border border-[var(--border)] bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <span className="eyebrow">Quick booking</span>
                  <h2 className="mt-2 text-xl font-bold">
                    Reserve your Swiss Blue stay
                  </h2>
                </div>
                <a className="btn btn-primary justify-center" href={BOOKING_URL}>
                  Book now
                </a>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[12px] bg-[var(--background-subtle)] p-3">
                  <div className="text-xs font-bold uppercase text-[var(--text-tertiary)]">
                    Check-in
                  </div>
                  <div className="mt-1 font-semibold">19 May 2026</div>
                </div>
                <div className="rounded-[12px] bg-[var(--background-subtle)] p-3">
                  <div className="text-xs font-bold uppercase text-[var(--text-tertiary)]">
                    Check-out
                  </div>
                  <div className="mt-1 font-semibold">20 May 2026</div>
                </div>
                <div className="rounded-[12px] bg-[var(--background-subtle)] p-3">
                  <div className="text-xs font-bold uppercase text-[var(--text-tertiary)]">
                    Guests
                  </div>
                  <div className="mt-1 font-semibold">2 adults</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {stats.map((stat) => (
              <div
                className="rounded-[16px] border border-[var(--border)] bg-[var(--background-subtle)] p-4"
                key={stat.label}
              >
                <div className="font-mono text-2xl font-bold tabular-nums text-[var(--primary)]">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-[var(--text-secondary)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <figure className="card overflow-hidden">
            <Image
              className="h-[420px] w-full object-cover sm:h-[520px]"
              src="https://swissbluehotels.com/wp-content/uploads/2025/07/little-john-482458-unsplash_s.jpg"
              alt="Comfortable Swiss Blue Hotels guest room"
              width={1024}
              height={680}
              priority
            />
          </figure>
          <div className="card grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <span className="eyebrow">Rooms and suites</span>
              <p className="mt-2 text-lg font-semibold">
                A richer booking experience built around views, bed types,
                living spaces, bedrooms, and stay purpose.
              </p>
            </div>
            <a
              className="btn btn-secondary justify-self-start sm:justify-self-end"
              href="#hotels"
            >
              Explore hotels
            </a>
          </div>
        </div>
      </section>

      <section id="hotels" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">Portfolio inventory</span>
            <h2 className="mt-3 text-3xl font-bold sm:text-[40px]">
              Six properties, one clearer category system.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
            The new classification translates the full room and apartment
            inventory into guest-friendly choices, improving separation between
            categories and strengthening how each unit type appears online.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {hotels.map((hotel, index) => (
            <article className="card flex flex-col p-5" key={hotel.title}>
              <div className="mb-8 flex items-center justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-light)] font-mono text-sm font-bold text-[var(--primary)]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-bold text-[var(--text-secondary)]">
                  {hotel.units}
                </span>
              </div>
              <h3 className="text-xl font-semibold">{hotel.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-[var(--text-secondary)]">
                {hotel.description}
              </p>
              <a className="mt-6 text-sm font-bold text-[var(--primary)]" href={hotel.href}>
                Discover hotel
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="card overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="bg-[var(--background-dark)] p-6 text-white sm:p-8 lg:p-10">
              <span className="eyebrow text-white/70">Room category strategy</span>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[40px]">
                Built to improve visibility, choice, and conversion.
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/70">
                The classification separates room and apartment types by the
                details guests care about most, creating a stronger booking page
                with more meaningful options.
              </p>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-3">
              {categoryPrinciples.map((principle) => (
                <article className="rounded-[16px] border border-[var(--border)] bg-white p-5" key={principle.title}>
                  <h3 className="text-lg font-bold">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                    {principle.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">Portfolio at a glance</span>
            <h2 className="mt-3 text-3xl font-bold sm:text-[40px]">
              Every property has a sharper commercial role.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
            The document turns operational inventory into a sales-ready
            portfolio map, making it easier to position each property by
            location, unit count, and signature stay type.
          </p>
        </div>

        <div className="card overflow-hidden">
          <div className="hidden grid-cols-[1.1fr_0.55fr_0.35fr_1.2fr] gap-4 border-b border-[var(--border)] bg-[var(--background-subtle)] px-5 py-3 text-xs font-bold uppercase text-[var(--text-tertiary)] md:grid">
            <span>Property</span>
            <span>Market</span>
            <span>Units</span>
            <span>Signature inventory</span>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {portfolioMix.map((item) => (
              <article
                className="grid gap-3 px-5 py-4 text-sm md:grid-cols-[1.1fr_0.55fr_0.35fr_1.2fr] md:items-center"
                key={item.property}
              >
                <h3 className="font-bold">{item.property}</h3>
                <span className="text-[var(--text-secondary)]">{item.market}</span>
                <span className="font-mono font-bold text-[var(--primary)]">
                  {item.total}
                </span>
                <p className="leading-6 text-[var(--text-secondary)]">
                  {item.signature}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">Stay categories</span>
            <h2 className="mt-3 text-3xl font-bold sm:text-[40px]">
              From efficient rooms to family apartments.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
            Category names now tell a fuller story: Superior, Deluxe, Premium,
            Junior Suite, Executive Suite, Presidential Suite, and family
            apartments each carry a clearer promise.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {roomHighlights.map((room) => (
            <article className="card p-5" key={room.title}>
              <h3 className="text-xl font-semibold">{room.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                {room.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="card overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[0.74fr_1.26fr]">
            <div className="bg-[var(--background-promo-soft)] p-6 sm:p-8 lg:p-10">
              <span className="eyebrow">Find the right stay</span>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[40px]">
                Categories that answer real guest intent.
              </h2>
              <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
                Instead of making guests decode room numbers or internal
                labels, the classification turns inventory features into clear
                booking reasons: trip length, view, bed setup, living space, and
                family needs.
              </p>
              <a className="btn btn-primary mt-8" href={BOOKING_URL}>
                Compare available stays
              </a>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              {guestPaths.map((path) => (
                <article className="rounded-[16px] border border-[var(--border)] bg-white p-5" key={path.title}>
                  <h3 className="text-xl font-bold">{path.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                    {path.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {path.tags.map((tag) => (
                      <span
                        className="rounded-full bg-[var(--primary-light)] px-3 py-1 text-xs font-bold text-[var(--primary)]"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="amenities"
        className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"
      >
        <div className="card bg-[var(--background-dark)] p-6 text-white sm:p-8 lg:p-10">
          <span className="eyebrow text-white/70">Services and facilities</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[40px]">
            Exceptional amenities for a memorable stay.
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/70">
            Across the portfolio, each stay is supported by practical hotel
            essentials: breakfast, wellness, meeting rooms, room service,
            parking, secure storage, and connected comfort for short or extended
            visits.
          </p>
          <a
            className="btn btn-primary mt-8"
            href={BOOKING_URL}
          >
            Book your room and suite
          </a>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((amenity) => (
            <div
              className="rounded-[16px] border border-[var(--border)] bg-white p-4 text-sm font-semibold shadow-sm"
              key={amenity}
            >
              {amenity}
            </div>
          ))}
        </div>
      </section>

      <section id="destination" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="card overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="bg-[var(--background-promo-soft)] p-6 sm:p-8 lg:p-10">
              <span className="eyebrow">Discover Jeddah</span>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[40px]">
                Stay close to city energy, Red Sea experiences, and airport
                access.
              </h2>
              <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
                The Swiss Blue site features Jeddah experiences including scuba
                diving, city tours, and snorkeling, alongside Jazan access for
                commercial travelers.
              </p>
            </div>
            <div className="grid gap-0 sm:grid-cols-3">
              {experiences.map((experience) => (
                <figure
                  className="group relative min-h-[280px] overflow-hidden"
                  key={experience.title}
                >
                  <Image
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    src={experience.image}
                    alt={experience.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
                  />
                  <figcaption className="absolute inset-x-3 bottom-3 rounded-[14px] bg-white/92 p-3 text-sm font-semibold shadow-sm backdrop-blur">
                    {experience.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div className="card p-6 sm:p-8">
          <span className="eyebrow">Guest reviews</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-[40px]">
            Comfort guests remember.
          </h2>
          <div className="mt-6 grid gap-4">
            {reviews.map((review) => (
              <blockquote
                className="rounded-[16px] border border-[var(--border)] bg-[var(--background-subtle)] p-4"
                key={review.name}
              >
                <p className="text-sm leading-6 text-[var(--text-secondary)]">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <footer className="mt-3 text-sm font-bold">
                  {review.name}
                  <span className="font-normal text-[var(--text-tertiary)]">
                    {" "}
                    / {review.city}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        <div className="card bg-[var(--background-promo-soft)] p-6 sm:p-8">
          <span className="eyebrow">Visit us</span>
          <h2 className="mt-3 text-2xl font-bold">Head Office</h2>
          <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
            Albawadi District, Hira Street, Jeddah 23421, Saudi Arabia.
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <a className="block font-bold text-[var(--primary)]" href="tel:+966126129000">
              +966 (12) 612-9000
            </a>
            <a
              className="block font-bold text-[var(--primary)]"
              href="mailto:info@swissbluehotels.com"
            >
              info@swissbluehotels.com
            </a>
          </div>
          <a
            className="btn btn-primary mt-8 w-full justify-center"
            href={BOOKING_URL}
          >
            Check availability
          </a>
        </div>
      </section>

      <footer className="mt-10 border-t border-[var(--border)] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-[var(--text-secondary)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Swiss Blue Hotels content draft - website and room classification document</p>
          <a className="font-semibold text-[var(--primary)]" href="https://swissbluehotels.com/">
            Source website
          </a>
        </div>
      </footer>
    </main>
  );
}
