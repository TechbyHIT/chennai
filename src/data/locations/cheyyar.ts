import type { Area, Location } from "@/types/location";

/** Cheyyar — location record plus every curated area parented to it. */
export const LOCATION: Location = {
  "id": "loc-cheyyar",
  "slug": "cheyyar",
  "name": "Cheyyar",
  "locationType": "town",
  "state": "Tamil Nadu",
  "district": "Tiruvannamalai",
  "publicationStatus": "published",
  "allowIndexing": true,
  "isServed": true,
  "introduction": "Cheyyar has town housing and industrial-area apartments where balcony safety upgrades suit working-family homes.",
  "localDescription": "We serve Cheyyar with appointment-based measurement for apartments and independent houses within our Chennai region coverage.",
  "nearbyLocationIds": [
    "loc-vandavasi",
    "loc-arani",
    "loc-kanchipuram"
  ],
  "landmarkIds": [],
  "propertyTypes": [
    "apartments",
    "independent-houses"
  ],
  "localCharacteristics": [
    "Industrial-town housing",
    "Working-family apartments"
  ],
  "serviceDemandNotes": [
    "Balcony safety for apartments"
  ],
  "verifiedLocalFacts": [
    "Cheyyar is a town in Tamil Nadu, within about 150 km of Chennai"
  ],
  "localDataVerified": true,
  "contentReviewed": true,
  "qualityScore": 82,
  "createdAt": "2026-08-01T00:00:00.000Z",
  "updatedAt": "2026-08-01T00:00:00.000Z"
};

export const AREAS: Area[] = [];
