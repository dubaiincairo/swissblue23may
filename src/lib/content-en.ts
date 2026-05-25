export const BOOKING_URL =
  "https://letsbook.me/booking/yanoljacloudsolution?checkin=2026-05-19&checkout=2026-05-20&adults=2&children=0";

export const heroImage =
  "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-saad-alaiyadhi-131639221-10141408-scaled.jpg";

export const jazanImage =
  "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-jepoyous-18500929-2.jpg";

export const jeddahImage =
  "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-abdullah-alallah-314142096-28506330.jpg";

export const navItemsEn = [
  { label: "Hospitality Properties", href: "/en/hotels" },
  { label: "Rooms & Suites", href: "/en/rooms-suites" },
  { label: "Offers & Discounts", href: "/en/offers" },
  { label: "Loyalty Program", href: "/en/loyalty" },
  { label: "Services", href: "/en/amenities-services" },
  { label: "Destinations / Cities", href: "/en/destinations" },
  { label: "Dining Experience", href: "/en/dining" },
  { label: "Corporate Deals", href: "/en/corporate-deals" },
  { label: "Group Bookings", href: "/en/group-bookings" },
  { label: "About Us", href: "/en/about" },
  { label: "Contact Us", href: "/en/contact" },
];

export const navGroupsEn = [
  {
    label: "Stay",
    links: [
      { label: "Hospitality Properties", href: "/en/hotels" },
      { label: "Rooms & Suites", href: "/en/rooms-suites" },
    ],
  },
  {
    label: "Experience",
    links: [
      { label: "Services", href: "/en/amenities-services" },
      { label: "Dining Experience", href: "/en/dining" },
      { label: "Destinations / Cities", href: "/en/destinations" },
    ],
  },
  {
    label: "Offers",
    links: [
      { label: "Offers & Discounts", href: "/en/offers" },
      { label: "Loyalty Program", href: "/en/loyalty" },
    ],
  },
  {
    label: "Business",
    links: [
      { label: "Corporate Deals", href: "/en/corporate-deals" },
      { label: "Group Bookings", href: "/en/group-bookings" },
      { label: "Meetings & Events", href: "/en/meetings-events" },
    ],
  },
  {
    label: "About",
    links: [
      { label: "About Us", href: "/en/about" },
      { label: "Contact Us", href: "/en/contact" },
    ],
  },
];

export const footerSectionsEn = [
  {
    title: "Explore Swiss Blue",
    links: [
      { label: "Hospitality Properties", href: "/en/hotels" },
      { label: "Rooms & Suites", href: "/en/rooms-suites" },
      { label: "Offers & Discounts", href: "/en/offers" },
      { label: "Loyalty Program", href: "/en/loyalty" },
      { label: "Destinations / Cities", href: "/en/destinations" },
    ],
  },
  {
    title: "Services & Experiences",
    links: [
      { label: "Services & Amenities", href: "/en/amenities-services" },
      { label: "Dining Experience", href: "/en/dining" },
      { label: "Corporate Deals", href: "/en/corporate-deals" },
      { label: "Group Bookings", href: "/en/group-bookings" },
      { label: "FAQ", href: "/en/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/en/about" },
      { label: "Contact Us", href: "/en/contact" },
      { label: "Direct Booking", href: BOOKING_URL },
    ],
  },
];

export const footerContactEn = [
  "Central reservation support for individual guests",
  "Corporate and group deals specialist",
  "SwissBlue Concierge AI assistant",
];

export const propertyAmenitiesEn = [
  "High-speed Wi-Fi",
  "Breakfast buffet",
  "Restaurant and cafe",
  "Room service",
  "Taxi service",
  "Safe locker",
  "Coffee, tea, and minibar",
  "Guest reception and support",
];

export const hotelsEn = [
  {
    slug: "swiss-blue-jeddah",
    title: "Swiss Blue Hotel Jeddah",
    city: "Jeddah",
    type: "Hotel",
    units: "76 rooms and suites",
    image: heroImage,
    summary:
      "A practical city hotel for business guests, family visits, and short stays, with clear room and suite categories near Jeddah's Red Sea energy.",
    positioning:
      "Swiss Blue Hotel Jeddah is the full hotel destination within the portfolio, combining practical rooms, elevated suites, and daily hospitality services. It is built for business guests who need clarity and speed, families looking for hotel comfort, and short-stay guests who want convenient access to Jeddah's key destinations.",
    unitTypes: [
      { title: "Superior King Room", count: "10 rooms", description: "Comfortable back-view rooms for short stays and business trips." },
      { title: "Superior Twin Room", count: "6 rooms", description: "Twin-bed rooms with practical essentials for business or shared stays." },
      { title: "Deluxe King Room", count: "6 rooms", description: "City-view rooms with a clearer value step for urban travelers." },
      { title: "Junior Suite", count: "6 suites", description: "City-view suites with added space and a living area." },
      { title: "Deluxe Junior Suite", count: "36 suites", description: "Expanded suite options with king or twin bedding and a separate living area." },
      { title: "Executive Suite", count: "6 suites", description: "Two-bedroom suite comfort for business and longer stays." },
      { title: "Presidential Suite", count: "6 suites", description: "The highest city-view suite tier for premium stays." },
    ],
    amenities: [...propertyAmenitiesEn, "Meeting rooms", "Fully equipped gym", "Indoor pool at selected property"],
    locationHighlight:
      "A practical Jeddah location connecting guests to business routes, shopping, dining, and Red Sea destinations.",
    landmarks: ["Jeddah Corniche", "Historic Jeddah Al Balad", "Red Sea Mall", "King Abdulaziz International Airport"],
    gallery: [heroImage, jeddahImage, jazanImage],
    source: "https://swissbluehotels.com/swiss-blue-hera/",
  },
  {
    slug: "swiss-blue-jazan",
    title: "Swiss Blue Apart-Hotel Jazan",
    city: "Jazan",
    type: "Apart-hotel",
    units: "55 serviced apartments",
    image: jazanImage,
    summary:
      "Practical serviced apartments in Jazan for short and extended stays, suitable for families, business guests, and regional visits.",
    positioning:
      "Swiss Blue Apart-Hotel Jazan offers a flexible stay for guests who need more space than a traditional room while keeping hotel-style support. It serves business travelers, families, and guests who prefer a calmer long-stay base.",
    unitTypes: [
      { title: "Deluxe King Studio", count: "1 studio", description: "A compact studio for simple, practical stays." },
      { title: "One-Bedroom Apartments", count: "37 apartments", description: "Superior, deluxe, and premium layouts with living space." },
      { title: "Two-Bedroom Apartments", count: "17 apartments", description: "Family, superior, and deluxe layouts with more space and privacy." },
    ],
    amenities: [...propertyAmenitiesEn, "Parking", "Laundry on request"],
    locationHighlight:
      "A location that supports business movement and regional visits in Jazan, with convenient access to daily services.",
    landmarks: ["Jazan Waterfront", "Jazan Airport", "Business areas", "Markets and restaurants"],
    gallery: [jazanImage, heroImage, jeddahImage],
    source: "https://swissbluehotels.com/04_swissblue-jazan/",
  },
  {
    slug: "al-zahraa-serviced-apartments",
    title: "Al Zahraa Serviced Apartments",
    city: "Jeddah",
    type: "Serviced apartments",
    units: "46 apartments",
    image: jeddahImage,
    summary:
      "Serviced apartments on Prince Sultan Road for guests who want a practical location, comfortable space, and selected city views.",
    positioning:
      "Al Zahraa Serviced Apartments serve guests who prefer serviced-apartment living in Jeddah with easy access to services, restaurants, and shopping. The categories suit families, business guests, and medium-length stays that need space and privacy.",
    unitTypes: [
      { title: "Studios", count: "2 studios", description: "King and twin studio choices for short, simple stays." },
      { title: "One-Bedroom Apartments", count: "35 apartments", description: "Superior and deluxe categories with back-view and city-view options." },
      { title: "Two-Bedroom Apartments", count: "9 apartments", description: "Superior and deluxe family layouts with two bathrooms." },
    ],
    amenities: [...propertyAmenitiesEn, "Scheduled housekeeping", "Nearby parking"],
    locationHighlight:
      "A Prince Sultan Road location near shopping, dining, and key daily services in Jeddah.",
    landmarks: ["Prince Sultan Road", "Red Sea Mall", "Waterfront", "Restaurants and cafes"],
    gallery: [jeddahImage, heroImage, jazanImage],
    source: "https://swissbluehotels.com/02_swissblue-al-zahra/",
  },
  {
    slug: "al-samer-serviced-apartments",
    title: "Al Samer Serviced Apartments",
    city: "Jeddah",
    type: "Serviced apartments",
    units: "33 apartments",
    image: heroImage,
    summary:
      "Serviced studios and apartments in Jeddah for business guests and families, with practical one- and two-bedroom options.",
    positioning:
      "Al Samer is a practical serviced-apartment choice in Jeddah. It combines privacy, space, and helpful daily service for short and medium-length stays.",
    unitTypes: [
      { title: "Deluxe Studios", count: "8 studios", description: "King and twin studio options for business and individual stays." },
      { title: "One-Bedroom Apartments", count: "10 apartments", description: "Superior, deluxe, and premium options for added comfort." },
      { title: "Two-Bedroom Apartments", count: "14 apartments", description: "Family, superior, and deluxe layouts for families and groups." },
    ],
    amenities: [...propertyAmenitiesEn, "Housekeeping", "Long-stay booking support"],
    locationHighlight:
      "A convenient Jeddah base for moving across residential districts and daily-service areas.",
    landmarks: ["Main Jeddah roads", "Daily service areas", "Restaurants", "Shopping centers"],
    gallery: [heroImage, jeddahImage, jazanImage],
    source: "https://swissbluehotels.com/03_swissblue-al-samer/",
  },
  {
    slug: "vinas-riyadh-serviced-apartments",
    title: "Vinas Riyadh Serviced Apartments",
    city: "Riyadh",
    type: "Serviced apartments",
    units: "35 apartments",
    image: jeddahImage,
    summary:
      "Riyadh serviced apartments with one-, two-, and three-bedroom options for longer stays and larger groups.",
    positioning:
      "Vinas Riyadh provides a comfortable capital-city base for business guests, families, and long-stay needs. The experience focuses on space, privacy, and the ability to settle in longer with practical hotel support.",
    unitTypes: [
      { title: "One-Bedroom Apartments", count: "21 apartments", description: "Superior, city-view, deluxe, and premium layouts." },
      { title: "Two-Bedroom Apartments", count: "13 apartments", description: "Family, superior, and deluxe options with flexible living space." },
      { title: "Three-Bedroom Superior Apartment", count: "1 apartment", description: "A wider layout for larger families and corporate stays." },
    ],
    amenities: [...propertyAmenitiesEn, "Monthly-stay support", "Corporate-friendly services"],
    locationHighlight:
      "A practical Riyadh location for access to business districts, lifestyle areas, and daily services.",
    landmarks: ["Business districts", "Main Riyadh roads", "Shopping centers", "Restaurants and cafes"],
    gallery: [jeddahImage, heroImage, jazanImage],
    source: "https://swissbluehotels.com/",
  },
  {
    slug: "tulip-alrawdah-serviced-apartments",
    title: "Tulip Alrawdah Serviced Apartments",
    city: "Riyadh",
    type: "Apart-hotel",
    units: "37 apartments",
    image: jazanImage,
    summary:
      "Studios, one-bedroom, and two-bedroom apartments in Riyadh with selected city-view options for practical family and business stays.",
    positioning:
      "Tulip Alrawdah combines serviced-apartment flexibility with the daily support guests expect. It suits short and medium stays, especially for guests who need multiple layout choices in Riyadh.",
    unitTypes: [
      { title: "Studios", count: "8 studios", description: "King and deluxe king studio options for short stays." },
      { title: "One-Bedroom Apartments", count: "26 apartments", description: "Superior and deluxe options, including selected city views." },
      { title: "Two-Bedroom Apartments", count: "4 apartments", description: "Deluxe and city-view two-bedroom layouts." },
    ],
    amenities: [...propertyAmenitiesEn, "Housekeeping", "Monthly-stay options"],
    locationHighlight:
      "A practical Riyadh location near active neighborhoods, daily services, and main movement routes.",
    landmarks: ["Riyadh neighborhoods", "Business areas", "Restaurants and cafes", "Daily services"],
    gallery: [jazanImage, jeddahImage, heroImage],
    source: "https://swissbluehotels.com/",
  },
];

export const loyaltyProgramEn = {
  title: "Swiss Blue Loyalty Program",
  subtitle: "Direct benefits for returning guests",
  description:
    "A loyalty program for business travelers, families, and long-stay guests, giving priority access to offers, upgrades based on availability, and direct-booking benefits through Swiss Blue channels.",
  benefits: [
    "Priority access to direct-booking offers",
    "Upgrade priority when available",
    "Benefits for monthly and repeat stays",
    "Faster reservations support",
  ],
};

export const accommodationCategoriesEn = [
  {
    title: "Hotels",
    text: "Rooms, suites, and full hotel services for business guests, short visits, and travelers who want a direct hotel experience.",
  },
  {
    title: "Apart-hotels",
    text: "A blend of hotel comfort and apartment-style space, ideal for families, medium-length stays, and guests who need more flexibility.",
  },
  {
    title: "Serviced Apartments",
    text: "Longer stays, more space, and higher privacy for companies, relocations, and monthly accommodation needs.",
  },
];

export const offersEn = [
  {
    title: "Business Stay",
    text: "Daily comfort, fast Wi-Fi, meeting support, and practical city locations for productive travel.",
  },
  {
    title: "Family Apartment Stay",
    text: "Multi-bedroom layouts, more privacy, and serviced comfort for easier family visits.",
  },
  {
    title: "Monthly Stay",
    text: "Better value for guests who need a reliable long-stay base in Jeddah, Jazan, or Riyadh.",
  },
  {
    title: "Book Direct Benefits",
    text: "Clearer rates, direct reservations support, and priority category assistance when available.",
  },
];

export const corporateDealsEn = [
  {
    title: "Group Bookings",
    text: "Professional coordination for teams and delegations, including unit types, arrival and departure dates, and guest requirements.",
  },
  {
    title: "Meeting Rooms",
    text: "Practical meeting solutions for small and mid-sized groups, with basic hospitality and connected accommodation options when needed.",
  },
  {
    title: "Official Contracting",
    text: "Clear corporate contracting steps covering legal documents, company data, authorization letters, and booking/payment terms.",
  },
  {
    title: "Professional Communication",
    text: "A dedicated path for HR, procurement, and executive teams to ensure faster replies and accurate proposals.",
  },
];

export const destinationsEn = [
  {
    title: "Jeddah",
    text: "The Red Sea city that brings together business, shopping, dining, the waterfront, and Historic Jeddah. Ideal for weekends, family visits, and business travel.",
    howToEnjoy: ["Visit Jeddah Corniche and the waterfront", "Explore Historic Jeddah Al Balad", "Try restaurants and cafes", "Shop in modern malls"],
    image: heroImage,
  },
  {
    title: "Riyadh",
    text: "The region's fast-growing capital for business, events, modern lifestyle, long stays, and corporate bookings.",
    howToEnjoy: ["Visit Boulevard Riyadh and entertainment destinations", "Plan business meetings", "Discover premium restaurants", "Choose monthly stays for corporate assignments"],
    image: jeddahImage,
  },
  {
    title: "Jazan",
    text: "A lively southern city for regional visits, business travel, and quieter stays, close to the sea, nature, and daily services.",
    howToEnjoy: ["Visit the waterfront", "Explore local markets", "Plan regional business visits", "Choose an apart-hotel for longer stays"],
    image: jazanImage,
  },
];

export const diningOptionsEn = [
  {
    title: "Breakfast",
    text: "A practical breakfast buffet to start the day comfortably, suitable for business trips, families, and short stays.",
  },
  {
    title: "Cafe",
    text: "An easy space for a quick meeting, daily coffee, or a comfortable pause within the property.",
  },
  {
    title: "Restaurant",
    text: "Daily dining options that serve guests inside the hotel or apart-hotel according to availability at each property.",
  },
  {
    title: "Room Service",
    text: "Added convenience for guests who prefer dining inside the room or apartment when available.",
  },
];

export const contactChannelsEn = [
  {
    title: "Central Reservation System",
    text: "A dedicated team to help guests choose the right destination and category, then confirm direct bookings.",
  },
  {
    title: "Corporate Deals Specialist",
    text: "A direct path for corporate bookings, group stays, long stays, and official contracting.",
  },
  {
    title: "SwissBlue Concierge AI",
    text: "A smart chat assistant for quick questions, hotel selection, category comparison, and routing requests to the right team.",
  },
];

export const servicesEn = [
  "High-speed Wi-Fi",
  "Breakfast buffet",
  "Restaurant and cafe",
  "Room service",
  "Meeting rooms",
  "Gym at selected properties",
  "Indoor pool at selected properties",
  "Taxi service",
  "Safe locker",
  "Coffee, tea, and minibar",
  "Parking and access services by property",
  "Monthly and corporate stay support",
];

export const roomClassificationsEn = [
  {
    property: "Swiss Blue Hotel Jeddah",
    total: "76 units",
    rows: [
      { type: "Superior King Room", bedrooms: "1", bedConfig: "Super King", view: "Back View", bathrooms: "1", livingRooms: "0", totalUnits: "10", rooms: "111, 211, 311, 411, 511, 611, 701, 702, 703, 704" },
      { type: "Superior Twin Room", bedrooms: "1", bedConfig: "2 Single Beds", view: "Back View", bathrooms: "1", livingRooms: "0", totalUnits: "6", rooms: "110, 210, 310, 410, 510, 610" },
      { type: "Deluxe King Room", bedrooms: "1", bedConfig: "Super King", view: "City View", bathrooms: "1", livingRooms: "0", totalUnits: "6", rooms: "105, 205, 305, 405, 505, 605" },
      { type: "Junior Suite", bedrooms: "1", bedConfig: "Super King", view: "City View", bathrooms: "1", livingRooms: "1", totalUnits: "6", rooms: "104, 204, 304, 404, 504, 604" },
      { type: "Deluxe Junior Suite King", bedrooms: "1", bedConfig: "Super King", view: "Back View", bathrooms: "1", livingRooms: "1", totalUnits: "24", rooms: "101, 103, 108, 112, 201, 203, 208, 212, 301, 303, 308, 312, 401, 403, 408, 412, 501, 503, 508, 512, 601, 603, 608, 612" },
      { type: "Deluxe Junior Suite Twin", bedrooms: "1", bedConfig: "2 Single Beds", view: "Back View", bathrooms: "1", livingRooms: "1", totalUnits: "12", rooms: "102, 107, 202, 207, 302, 307, 402, 407, 502, 507, 602, 607" },
      { type: "Executive Suite", bedrooms: "2", bedConfig: "Super King + 2 Single Beds", view: "Back View", bathrooms: "1", livingRooms: "1", totalUnits: "6", rooms: "109, 209, 309, 409, 509, 609" },
      { type: "Presidential Suite", bedrooms: "2", bedConfig: "Super King + 2 Single Beds", view: "City View", bathrooms: "1", livingRooms: "1", totalUnits: "6", rooms: "106, 206, 306, 406, 506, 606" },
    ],
  },
  {
    property: "Swiss Blue Apart-Hotel Jazan",
    total: "55 units",
    rows: [
      { type: "Deluxe King Studio", bedrooms: "1", bedConfig: "Super King", view: "No View", bathrooms: "1", livingRooms: "0", totalUnits: "1", rooms: "601" },
      { type: "One-Bedroom Superior Apartment", bedrooms: "1", bedConfig: "Super King", view: "No View", bathrooms: "1", livingRooms: "1", totalUnits: "25", rooms: "101, 102, 103, 204, 205, 206, 207, 304, 305, 306, 307, 404, 405, 406, 407, 504, 505, 506, 507, 602, 603, 604, 605, 606, 607" },
      { type: "One-Bedroom Deluxe Apartment", bedrooms: "1", bedConfig: "Super King", view: "City View", bathrooms: "1", livingRooms: "1", totalUnits: "8", rooms: "201, 210, 301, 310, 401, 410, 501, 510" },
      { type: "One-Bedroom Premium Apartment", bedrooms: "1", bedConfig: "Super King", view: "City View", bathrooms: "1", livingRooms: "1", totalUnits: "4", rooms: "211, 311, 411, 511" },
      { type: "Two-Bedroom Family Apartment", bedrooms: "2", bedConfig: "Super King + 2 Single Beds", view: "No View", bathrooms: "2", livingRooms: "1", totalUnits: "9", rooms: "104, 203, 208, 303, 308, 403, 408, 503, 508" },
      { type: "Two-Bedroom Superior Apartment", bedrooms: "2", bedConfig: "Super King + 2 Single Beds", view: "City View", bathrooms: "2", livingRooms: "1", totalUnits: "4", rooms: "202, 302, 402, 502" },
      { type: "Two-Bedroom Deluxe Apartment", bedrooms: "2", bedConfig: "Super King + 2 Single Beds", view: "City View", bathrooms: "2", livingRooms: "1", totalUnits: "4", rooms: "209, 309, 409, 509" },
    ],
  },
  {
    property: "Al Zahraa Serviced Apartments",
    total: "46 units",
    rows: [
      { type: "Deluxe King Studio", bedrooms: "1", bedConfig: "Super King", view: "No View", bathrooms: "1", livingRooms: "0", totalUnits: "1", rooms: "101" },
      { type: "Deluxe Double Studio", bedrooms: "1", bedConfig: "2 Single Beds", view: "No View", bathrooms: "1", livingRooms: "0", totalUnits: "1", rooms: "102" },
      { type: "One-Bedroom Superior Apartment", bedrooms: "1", bedConfig: "Super King", view: "Back View", bathrooms: "1", livingRooms: "1", totalUnits: "18", rooms: "202, 203, 204, 205, 302, 303, 304, 305, 402, 403, 404, 405, 502, 503, 504, 505, 602, 604" },
      { type: "Superior Apartment with City View", bedrooms: "1", bedConfig: "Super King", view: "City View", bathrooms: "1", livingRooms: "1", totalUnits: "12", rooms: "206, 208, 209, 306, 308, 309, 406, 408, 409, 506, 508, 509" },
      { type: "One-Bedroom Deluxe Apartment", bedrooms: "1", bedConfig: "2 Single Beds", view: "Back View", bathrooms: "1", livingRooms: "1", totalUnits: "1", rooms: "603" },
      { type: "Deluxe One-Bedroom Apartment with City View", bedrooms: "1", bedConfig: "2 Single Beds", view: "City View", bathrooms: "1", livingRooms: "1", totalUnits: "4", rooms: "207, 307, 407, 507" },
      { type: "Two-Bedroom Superior Apartment", bedrooms: "2", bedConfig: "Super King + 2 Single Beds", view: "Back View", bathrooms: "2", livingRooms: "1", totalUnits: "5", rooms: "201, 301, 401, 501, 601" },
      { type: "Two-Bedroom Deluxe Apartment", bedrooms: "2", bedConfig: "Super King + 2 Single Beds", view: "City View", bathrooms: "2", livingRooms: "1", totalUnits: "4", rooms: "210, 310, 410, 510" },
    ],
  },
  {
    property: "Al Samer Serviced Apartments",
    total: "33 units",
    rows: [
      { type: "Deluxe King Studio", bedrooms: "1", bedConfig: "King / Super King", view: "No View", bathrooms: "1", livingRooms: "0", totalUnits: "5", rooms: "101, 401, 501, 601, 703" },
      { type: "Deluxe Double Studio", bedrooms: "1", bedConfig: "2 Single Beds", view: "No View", bathrooms: "1", livingRooms: "0", totalUnits: "3", rooms: "201, 202, 301" },
      { type: "One-Bedroom Superior Apartment", bedrooms: "1", bedConfig: "Super King", view: "No View", bathrooms: "1", livingRooms: "1", totalUnits: "3", rooms: "504, 604, 704" },
      { type: "One-Bedroom Deluxe Apartment", bedrooms: "1", bedConfig: "2 Single Beds", view: "No View", bathrooms: "1", livingRooms: "1", totalUnits: "2", rooms: "304, 404" },
      { type: "One-Bedroom Premium Apartment", bedrooms: "1", bedConfig: "Super King", view: "No View", bathrooms: "1", livingRooms: "1", totalUnits: "5", rooms: "306, 406, 506, 606, 204, 701" },
      { type: "Two-Bedroom Family Apartment", bedrooms: "2", bedConfig: "Super King + 2 Single Beds", view: "No View", bathrooms: "1", livingRooms: "1", totalUnits: "1", rooms: "702" },
      { type: "Two-Bedroom Superior Apartment", bedrooms: "2", bedConfig: "Super King + 2 Single Beds", view: "No View", bathrooms: "2", livingRooms: "1", totalUnits: "5", rooms: "203, 305, 405, 505, 605" },
      { type: "Two-Bedroom Deluxe Apartment", bedrooms: "2", bedConfig: "Super King + 2 Single Beds", view: "City View", bathrooms: "2", livingRooms: "1", totalUnits: "8", rooms: "302, 303, 402, 403, 502, 503, 602, 603" },
    ],
  },
  {
    property: "Vinas Riyadh Serviced Apartments",
    total: "35 units",
    rows: [
      { type: "One-Bedroom Superior Apartment", bedrooms: "1", bedConfig: "Super King", view: "No View", bathrooms: "1", livingRooms: "1", totalUnits: "5", rooms: "101, 202, 302, 401, 402" },
      { type: "Superior Apartment with City View", bedrooms: "1", bedConfig: "Super King", view: "City View", bathrooms: "1", livingRooms: "1", totalUnits: "9", rooms: "204, 205, 205C, 304, 305, 305C, 404, SV, SV1" },
      { type: "One-Bedroom Deluxe Apartment", bedrooms: "1", bedConfig: "Super King", view: "City View", bathrooms: "1", livingRooms: "2", totalUnits: "6", rooms: "203, 203C, 303, 303C, 403, 403C" },
      { type: "One-Bedroom Premium Apartment", bedrooms: "1", bedConfig: "Super King", view: "No View", bathrooms: "1", livingRooms: "1", totalUnits: "1", rooms: "101C" },
      { type: "Two-Bedroom Family Apartment", bedrooms: "2", bedConfig: "Super King + 2 Single Beds", view: "No View", bathrooms: "1 or 2", livingRooms: "1", totalUnits: "10", rooms: "102, 103C, 104, 201, 207C, 208, 301, 307, 307C, 308" },
      { type: "Two-Bedroom Superior Apartment", bedrooms: "2", bedConfig: "Super King + 2 Single Beds", view: "City View", bathrooms: "2", livingRooms: "1", totalUnits: "2", rooms: "206, 306" },
      { type: "Two-Bedroom Deluxe Apartment", bedrooms: "2", bedConfig: "Super King + 2 Single Beds", view: "City View", bathrooms: "2", livingRooms: "2", totalUnits: "1", rooms: "207" },
      { type: "Three-Bedroom Superior Apartment", bedrooms: "3", bedConfig: "Super King + 4 Single Beds", view: "No View", bathrooms: "2", livingRooms: "2", totalUnits: "1", rooms: "103" },
    ],
  },
  {
    property: "Tulip Alrawdah Serviced Apartments",
    total: "37 units",
    rows: [
      { type: "King Studio", bedrooms: "1", bedConfig: "Super King", view: "No View", bathrooms: "1", livingRooms: "0", totalUnits: "7", rooms: "101, 207, 305, SV1, SV2, SV3, SV4" },
      { type: "Deluxe King Studio", bedrooms: "1", bedConfig: "Super King", view: "City View", bathrooms: "1", livingRooms: "0", totalUnits: "1", rooms: "215" },
      { type: "One-Bedroom Superior Apartment", bedrooms: "1", bedConfig: "Super King", view: "No View", bathrooms: "1", livingRooms: "1", totalUnits: "16", rooms: "203, 204, 204C, 205, 206, 208, 209, 209C, 301, 302, 303, 304, 304C, 306, 307, 307C" },
      { type: "Superior Apartment with City View", bedrooms: "1", bedConfig: "Super King", view: "City View", bathrooms: "1", livingRooms: "1", totalUnits: "7", rooms: "201, 210, 211, 212, 212C, 213, 213C" },
      { type: "One-Bedroom Deluxe Apartment", bedrooms: "1", bedConfig: "2 Single Beds", view: "No View", bathrooms: "1", livingRooms: "1", totalUnits: "2", rooms: "203C, 303C" },
      { type: "Deluxe One-Bedroom Apartment with City View", bedrooms: "1", bedConfig: "2 Single Beds", view: "City View", bathrooms: "1", livingRooms: "1", totalUnits: "1", rooms: "211C" },
      { type: "Two-Bedroom Deluxe Apartment", bedrooms: "2", bedConfig: "Super King + 2 Single Beds", view: "No View", bathrooms: "1", livingRooms: "1", totalUnits: "2", rooms: "207C, 305C" },
      { type: "Two-Bedroom Apartment with City View", bedrooms: "2", bedConfig: "Super King + 2 Single Beds", view: "City View", bathrooms: "1", livingRooms: "1", totalUnits: "2", rooms: "202, 214" },
    ],
  },
];

export const stayCategoriesEn = [
  { title: "Hotels", subtitle: "Rooms and suites", text: "Full hotel service for short stays, business travel, and guests who want a direct hotel experience." },
  { title: "Apart-hotels", subtitle: "Apartment space with hotel comfort", text: "Flexible layouts for families, medium-length stays, and guests who want more living space." },
  { title: "Serviced Apartments", subtitle: "Long-stay privacy", text: "More space and daily practicality for corporate assignments, relocations, and monthly stays." },
];

export const apartmentBenefitsEn = [
  "Studio, one-bedroom, two-bedroom, and selected three-bedroom layouts",
  "Living space for families and longer stays",
  "Practical comfort with hotel services",
  "Locations in Jeddah, Jazan, and Riyadh",
  "Suitable for business relocation and monthly stays",
  "More privacy with direct booking support",
];

export const faqsEn = [
  {
    question: "What types of accommodation does Swiss Blue offer?",
    answer:
      "Swiss Blue offers hotels, apart-hotels, and serviced apartments in Jeddah, Jazan, and Riyadh.",
  },
  {
    question: "Can I request monthly stays or corporate rates?",
    answer:
      "Yes. The corporate deals team can support monthly stays, group bookings, and official contracting.",
  },
  {
    question: "Can I book directly online?",
    answer:
      "Yes. Guests can check availability and book directly through the Swiss Blue booking link.",
  },
];
