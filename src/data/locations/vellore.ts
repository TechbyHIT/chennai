import type { Area, Location } from "@/types/location";

/** Vellore — location record plus every curated area parented to it. */
export const LOCATION: Location = {
  "id": "loc-vellore",
  "slug": "vellore",
  "name": "Vellore",
  "locationType": "city",
  "state": "Tamil Nadu",
  "district": "Vellore",
  "publicationStatus": "published",
  "allowIndexing": true,
  "isServed": true,
  "introduction": "Vellore has dense residential neighbourhoods and apartment pockets where balcony fall protection and pigeon control are everyday needs.",
  "localDescription": "We serve Vellore from our Chennai region coverage with appointment-based measurement for apartments and independent houses, including Katpadi and the surrounding town areas.",
  "nearbyLocationIds": [
    "loc-ranipet",
    "loc-arcot",
    "loc-arani"
  ],
  "landmarkIds": [],
  "propertyTypes": [
    "apartments",
    "independent-houses",
    "high-rise-apartments"
  ],
  "localCharacteristics": [
    "Large residential city",
    "Apartment and independent-house mix"
  ],
  "serviceDemandNotes": [
    "Balcony safety and pigeon control"
  ],
  "verifiedLocalFacts": [
    "Vellore is a city in Tamil Nadu, within about 150 km of Chennai"
  ],
  "localDataVerified": true,
  "contentReviewed": true,
  "qualityScore": 84,
  "createdAt": "2026-08-01T00:00:00.000Z",
  "updatedAt": "2026-08-01T00:00:00.000Z"
};

export const AREAS: Area[] = [
  {
    "id": "area-vellore-katpadi",
    "slug": "katpadi",
    "name": "Katpadi",
    "locationType": "locality",
    "parentId": "loc-vellore",
    "state": "Tamil Nadu",
    "district": "Vellore",
    "publicationStatus": "published",
    "allowIndexing": true,
    "isServed": true,
    "introduction": "Katpadi is a town in the Vellore service region of Tamil Nadu, covered for measurement visits and installations based on appointment scheduling.",
    "localDescription": "In Katpadi, we confirm travel and access during booking, then measure openings on site before sharing a written estimate.",
    "nearbyLocationIds": [],
    "landmarkIds": [],
    "propertyTypes": [
      "independent-houses",
      "apartments"
    ],
    "localCharacteristics": [
      "Town in the Vellore service region",
      "Independent houses and apartments"
    ],
    "serviceDemandNotes": [
      "Balcony and window safety requests"
    ],
    "verifiedLocalFacts": [
      "Katpadi is in Vellore district, Tamil Nadu"
    ],
    "localDataVerified": true,
    "contentReviewed": true,
    "qualityScore": 81,
    "createdAt": "2026-08-04T00:00:00.000Z",
    "updatedAt": "2026-08-04T00:00:00.000Z"
  }
];
