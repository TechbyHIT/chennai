import type { Area, Location } from "@/types/location";

/** Tiruttani — location record plus every curated area parented to it. */
export const LOCATION: Location = {
  "id": "loc-tiruttani",
  "slug": "tiruttani",
  "name": "Tiruttani",
  "locationType": "town",
  "state": "Tamil Nadu",
  "district": "Tiruvallur",
  "publicationStatus": "published",
  "allowIndexing": true,
  "isServed": true,
  "introduction": "Tiruttani has town housing and apartment pockets, also covering nearby Pallipattu, where balcony safety upgrades are practical.",
  "localDescription": "We serve Tiruttani with appointment-based measurement for apartments and independent houses within our Chennai region coverage.",
  "nearbyLocationIds": [
    "loc-tiruvallur",
    "loc-arakkonam"
  ],
  "landmarkIds": [],
  "propertyTypes": [
    "apartments",
    "independent-houses"
  ],
  "localCharacteristics": [
    "Temple town housing",
    "Apartment pockets"
  ],
  "serviceDemandNotes": [
    "Balcony and window safety requests"
  ],
  "verifiedLocalFacts": [
    "Tiruttani is a town in Tamil Nadu, within about 150 km of Chennai"
  ],
  "localDataVerified": true,
  "contentReviewed": true,
  "qualityScore": 82,
  "createdAt": "2026-08-01T00:00:00.000Z",
  "updatedAt": "2026-08-01T00:00:00.000Z"
};

export const AREAS: Area[] = [
  {
    "id": "area-tiruttani-pallipattu",
    "slug": "pallipattu",
    "name": "Pallipattu",
    "locationType": "locality",
    "parentId": "loc-tiruttani",
    "state": "Tamil Nadu",
    "district": "Tiruvallur",
    "publicationStatus": "published",
    "allowIndexing": true,
    "isServed": true,
    "introduction": "Pallipattu is a town in the Tiruttani service region of Tamil Nadu, covered for measurement visits and installations based on appointment scheduling.",
    "localDescription": "In Pallipattu, we confirm travel and access during booking, then measure openings on site before sharing a written estimate.",
    "nearbyLocationIds": [],
    "landmarkIds": [],
    "propertyTypes": [
      "independent-houses",
      "apartments"
    ],
    "localCharacteristics": [
      "Town in the Tiruttani service region",
      "Independent houses and apartments"
    ],
    "serviceDemandNotes": [
      "Balcony and window safety requests"
    ],
    "verifiedLocalFacts": [
      "Pallipattu is in Tiruvallur district, Tamil Nadu"
    ],
    "localDataVerified": true,
    "contentReviewed": true,
    "qualityScore": 81,
    "createdAt": "2026-08-04T00:00:00.000Z",
    "updatedAt": "2026-08-04T00:00:00.000Z"
  }
];
