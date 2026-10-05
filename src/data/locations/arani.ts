import type { Area, Location } from "@/types/location";

/** Arani — location record plus every curated area parented to it. */
export const LOCATION: Location = {
  "id": "loc-arani",
  "slug": "arani",
  "name": "Arani",
  "locationType": "town",
  "state": "Tamil Nadu",
  "district": "Tiruvannamalai",
  "publicationStatus": "published",
  "allowIndexing": true,
  "isServed": true,
  "introduction": "Arani has town housing and growing apartment pockets where balconies and open edges need practical safety planning.",
  "localDescription": "We serve Arani with appointment-based measurement for apartments and independent houses within our Chennai region coverage.",
  "nearbyLocationIds": [
    "loc-vellore",
    "loc-cheyyar",
    "loc-arcot"
  ],
  "landmarkIds": [],
  "propertyTypes": [
    "apartments",
    "independent-houses"
  ],
  "localCharacteristics": [
    "Textile town housing",
    "Growing apartment pockets"
  ],
  "serviceDemandNotes": [
    "Balcony safety for family homes"
  ],
  "verifiedLocalFacts": [
    "Arani is a town in Tamil Nadu, within about 150 km of Chennai"
  ],
  "localDataVerified": true,
  "contentReviewed": true,
  "qualityScore": 82,
  "createdAt": "2026-08-01T00:00:00.000Z",
  "updatedAt": "2026-08-01T00:00:00.000Z"
};

export const AREAS: Area[] = [];
