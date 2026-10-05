import type { Area, Location } from "@/types/location";

/** Arakkonam — location record plus every curated area parented to it. */
export const LOCATION: Location = {
  "id": "loc-arakkonam",
  "slug": "arakkonam",
  "name": "Arakkonam",
  "locationType": "town",
  "state": "Tamil Nadu",
  "district": "Ranipet",
  "publicationStatus": "published",
  "allowIndexing": true,
  "isServed": true,
  "introduction": "Arakkonam has railway-settlement housing and newer apartment pockets where balcony and window safety upgrades are practical.",
  "localDescription": "We serve Arakkonam with appointment-based measurement for apartments and independent houses within our Chennai region coverage.",
  "nearbyLocationIds": [
    "loc-ranipet",
    "loc-tiruttani",
    "loc-tiruvallur"
  ],
  "landmarkIds": [],
  "propertyTypes": [
    "apartments",
    "independent-houses"
  ],
  "localCharacteristics": [
    "Railway town housing",
    "Apartment pockets"
  ],
  "serviceDemandNotes": [
    "Balcony and window safety requests"
  ],
  "verifiedLocalFacts": [
    "Arakkonam is a town in Tamil Nadu, within about 150 km of Chennai"
  ],
  "localDataVerified": true,
  "contentReviewed": true,
  "qualityScore": 82,
  "createdAt": "2026-08-01T00:00:00.000Z",
  "updatedAt": "2026-08-01T00:00:00.000Z"
};

export const AREAS: Area[] = [];
