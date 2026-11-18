// Exact driving destinations ("lat,lng" of the hotel's pin) for properties whose Google Maps
// listing sends drivers to the wrong place. The "Get directions" button uses these coordinates
// instead of the listing's name; the map and "Open in Google Maps" still show the listing.
//
// Tulip (checked 18 Nov 2026): the Google listing "Tulip by SwissBlue Serviced Apartments -
// Economy Class" (CID 15210534362020518007) has the right pin, but Google ends driving routes
// to it on Khalid Al Hakim St in Ar Rabwah, about 5 km south-west of the hotel. A route to these
// coordinates ends at the hotel on Khalid Ibn Al Walid St. Remove the entry once the Business
// Profile is fixed and a route to the listing ends at the hotel again.
const DIRECTIONS_DESTINATIONS: Record<string, string> = {
  "tulip-alrawdah-serviced-apartments": "24.7329359,46.7844611",
};

export function directionsDestination(slug: string): string | undefined {
  return DIRECTIONS_DESTINATIONS[slug];
}
