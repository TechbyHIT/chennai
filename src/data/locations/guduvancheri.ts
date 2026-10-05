import type { Area, Location } from "@/types/location";

/** Guduvancheri — location record plus every curated area parented to it. */
export const LOCATION: Location = {
  "id": "loc-guduvancheri",
  "slug": "guduvancheri",
  "name": "Guduvancheri",
  "locationType": "city",
  "parentId": "geo-district-chengalpattu",
  "state": "Tamil Nadu",
  "district": "Chengalpattu",
  "publicationStatus": "published",
  "allowIndexing": true,
  "isServed": true,
  "introduction": "Guduvancheri is covered for site assessment and installation based on appointment availability in Tamil Nadu.",
  "localDescription": "We schedule measurements in Guduvancheri for eligible balcony, window and netting projects after confirming access and requirements.",
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
    "Guduvancheri is in Chengalpattu district, Tamil Nadu"
  ],
  "localDataVerified": true,
  "contentReviewed": true,
  "qualityScore": 82,
  "createdAt": "2026-08-01T00:00:00.000Z",
  "updatedAt": "2026-08-01T00:00:00.000Z"
};

export const AREAS: Area[] = [
  {
    "id": "area-guduvancheri-shriram-shankari",
    "slug": "shriram-shankari",
    "name": "Shriram Shankari",
    "locationType": "locality",
    "parentId": "loc-guduvancheri",
    "state": "Tamil Nadu",
    "district": "Chengalpattu",
    "publicationStatus": "published",
    "allowIndexing": true,
    "isServed": true,
    "introduction": "Shriram Shankari in Guduvancheri, Guduvancheri is an apartment complex where balcony and window openings across residential towers need measured fall protection and bird control.",
    "localDescription": "In Shriram Shankari, we measure balcony and window openings tower-wise for invisible grills, safety nets and bird control, working around society access rules, with fixing points confirmed during the site visit.",
    "nearbyLocationIds": [],
    "landmarkIds": [],
    "propertyTypes": [
      "apartments",
      "high-rise-apartments"
    ],
    "localCharacteristics": [
      "Apartment complex",
      "High-rise and mid-rise towers",
      "Society-managed maintenance"
    ],
    "serviceDemandNotes": [
      "Apartment balcony safety",
      "Child and pet safety in flats",
      "Pigeon control for balconies"
    ],
    "verifiedLocalFacts": [
      "Shriram Shankari is a residential project in Guduvancheri, Guduvancheri, Tamil Nadu"
    ],
    "localDataVerified": true,
    "contentReviewed": true,
    "qualityScore": 84,
    "createdAt": "2026-08-04T00:00:00.000Z",
    "updatedAt": "2026-08-04T00:00:00.000Z"
  }
];
