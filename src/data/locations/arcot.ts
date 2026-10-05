import type { Area, Location } from "@/types/location";

/** Arcot — location record plus every curated area parented to it. */
export const LOCATION: Location = {
  "id": "loc-arcot",
  "slug": "arcot",
  "name": "Arcot",
  "locationType": "town",
  "state": "Tamil Nadu",
  "district": "Ranipet",
  "publicationStatus": "published",
  "allowIndexing": true,
  "isServed": true,
  "introduction": "Arcot has established residential streets and newer apartment buildings where family homes need practical balcony protection.",
  "localDescription": "We serve Arcot with appointment-based measurement and installation planning within our Chennai region coverage.",
  "nearbyLocationIds": [
    "loc-ranipet",
    "loc-vellore",
    "loc-cheyyar"
  ],
  "landmarkIds": [],
  "propertyTypes": [
    "apartments",
    "independent-houses"
  ],
  "localCharacteristics": [
    "Established town housing",
    "New apartment buildings"
  ],
  "serviceDemandNotes": [
    "Family balcony safety"
  ],
  "verifiedLocalFacts": [
    "Arcot is a town in Tamil Nadu, within about 150 km of Chennai"
  ],
  "localDataVerified": true,
  "contentReviewed": true,
  "qualityScore": 82,
  "createdAt": "2026-08-01T00:00:00.000Z",
  "updatedAt": "2026-08-01T00:00:00.000Z"
};

export const AREAS: Area[] = [];
