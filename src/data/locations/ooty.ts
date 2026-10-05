import type { Area, Location } from "@/types/location";

/** Ooty — location record plus every curated area parented to it. */
export const LOCATION: Location = {
  "id": "loc-ooty",
  "slug": "ooty",
  "name": "Ooty",
  "locationType": "city",
  "parentId": "geo-district-nilgiris",
  "state": "Tamil Nadu",
  "district": "The Nilgiris",
  "publicationStatus": "published",
  "allowIndexing": true,
  "isServed": true,
  "introduction": "Ooty is covered for site assessment and installation based on appointment availability in Tamil Nadu.",
  "localDescription": "We schedule measurements in Ooty for eligible balcony, window and netting projects after confirming access and requirements.",
  "nearbyLocationIds": [],
  "landmarkIds": [],
  "propertyTypes": [
    "apartments",
    "independent-houses"
  ],
  "localCharacteristics": [],
  "serviceDemandNotes": [
    "Balcony and window safety requests"
  ],
  "verifiedLocalFacts": [
    "Ooty is in The Nilgiris district, Tamil Nadu"
  ],
  "localDataVerified": true,
  "contentReviewed": true,
  "qualityScore": 82,
  "createdAt": "2026-08-01T00:00:00.000Z",
  "updatedAt": "2026-08-01T00:00:00.000Z"
};

export const AREAS: Area[] = [];
