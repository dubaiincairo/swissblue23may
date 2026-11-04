// Google Ads landing pages (/stay/<branch>): ad branch slug → property slug on the site and its booking page.
export type AdLandingBranch = {
  slug: string;
  propertySlug: string;
  bookingUrl: string;
};

export const AD_LANDING_BRANCHES: AdLandingBranch[] = [
  { slug: "heraa", propertySlug: "swiss-blue-jeddah", bookingUrl: "https://book.swissblue.sa/booking/swissbluehera" },
  { slug: "alzahraa", propertySlug: "al-zahraa-serviced-apartments", bookingUrl: "https://book.swissblue.sa/booking/swissbluealzahra" },
  { slug: "alsamer", propertySlug: "al-samer-serviced-apartments", bookingUrl: "https://book.swissblue.sa/booking/swissbluealsamer" },
  { slug: "vinas", propertySlug: "vinas-riyadh-serviced-apartments", bookingUrl: "https://book.swissblue.sa/booking/vinashotel" },
  { slug: "tulip", propertySlug: "tulip-alrawdah-serviced-apartments", bookingUrl: "https://book.swissblue.sa/booking/tuliphotel" },
];

export function findAdLandingBranch(slug: string): AdLandingBranch | undefined {
  return AD_LANDING_BRANCHES.find((branch) => branch.slug === slug);
}

export const DIRECT_BOOKING_DISCOUNT = "10%";
