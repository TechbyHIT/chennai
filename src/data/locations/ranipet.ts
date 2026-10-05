import type { Area, Location } from "@/types/location";

/** Ranipet — location record plus every curated area parented to it. */
export const LOCATION: Location = {
  "id": "loc-ranipet",
  "slug": "ranipet",
  "name": "Ranipet",
  "locationType": "town",
  "state": "Tamil Nadu",
  "district": "Ranipet",
  "publicationStatus": "published",
  "allowIndexing": true,
  "isServed": true,
  "introduction": "Ranipet and its adjoining towns of Walajapet and Arcot have growing residential pockets where apartment balconies need discreet safety upgrades.",
  "localDescription": "We serve Ranipet with appointment-based measurement and installation planning, also covering Walajapet and Sholinghur as localities of this hub.",
  "nearbyLocationIds": [
    "loc-vellore",
    "loc-arakkonam",
    "loc-arcot"
  ],
  "landmarkIds": [],
  "propertyTypes": [
    "apartments",
    "independent-houses"
  ],
  "localCharacteristics": [
    "Industrial-residential mix",
    "Growing apartment demand"
  ],
  "serviceDemandNotes": [
    "New apartment balcony safety"
  ],
  "verifiedLocalFacts": [
    "Ranipet is a town in Tamil Nadu, within about 150 km of Chennai"
  ],
  "localDataVerified": true,
  "contentReviewed": true,
  "qualityScore": 82,
  "createdAt": "2026-08-01T00:00:00.000Z",
  "updatedAt": "2026-08-01T00:00:00.000Z"
};

export const AREAS: Area[] = [
  {
    "id": "area-ranipet-walajapet",
    "slug": "walajapet",
    "name": "Walajapet",
    "locationType": "locality",
    "parentId": "loc-ranipet",
    "state": "Tamil Nadu",
    "district": "Ranipet",
    "publicationStatus": "published",
    "allowIndexing": true,
    "isServed": true,
    "introduction": "Walajapet is a town in the Ranipet service region of Tamil Nadu, covered for measurement visits and installations based on appointment scheduling.",
    "localDescription": "In Walajapet, we confirm travel and access during booking, then measure openings on site before sharing a written estimate.",
    "nearbyLocationIds": [],
    "landmarkIds": [],
    "propertyTypes": [
      "independent-houses",
      "apartments"
    ],
    "localCharacteristics": [
      "Town in the Ranipet service region",
      "Independent houses and apartments"
    ],
    "serviceDemandNotes": [
      "Balcony and window safety requests"
    ],
    "verifiedLocalFacts": [
      "Walajapet is in Ranipet district, Tamil Nadu"
    ],
    "localDataVerified": true,
    "contentReviewed": true,
    "qualityScore": 81,
    "createdAt": "2026-08-04T00:00:00.000Z",
    "updatedAt": "2026-08-04T00:00:00.000Z"
  },
  {
    "id": "area-ranipet-sholinghur",
    "slug": "sholinghur",
    "name": "Sholinghur",
    "locationType": "locality",
    "parentId": "loc-ranipet",
    "state": "Tamil Nadu",
    "district": "Ranipet",
    "publicationStatus": "published",
    "allowIndexing": true,
    "isServed": true,
    "introduction": "Sholinghur is a town in the Ranipet service region of Tamil Nadu, covered for measurement visits and installations based on appointment scheduling.",
    "localDescription": "In Sholinghur, we confirm travel and access during booking, then measure openings on site before sharing a written estimate.",
    "nearbyLocationIds": [],
    "landmarkIds": [],
    "propertyTypes": [
      "independent-houses",
      "apartments"
    ],
    "localCharacteristics": [
      "Town in the Ranipet service region",
      "Independent houses and apartments"
    ],
    "serviceDemandNotes": [
      "Balcony and window safety requests"
    ],
    "verifiedLocalFacts": [
      "Sholinghur is in Ranipet district, Tamil Nadu"
    ],
    "localDataVerified": true,
    "contentReviewed": true,
    "qualityScore": 81,
    "createdAt": "2026-08-04T00:00:00.000Z",
    "updatedAt": "2026-08-04T00:00:00.000Z"
  }
];
