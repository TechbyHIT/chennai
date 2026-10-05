import type { Area, Location } from "@/types/location";

/** Madurai — location record plus every curated area parented to it. */
export const LOCATION: Location = {
  "id": "loc-madurai",
  "slug": "madurai",
  "name": "Madurai",
  "locationType": "city",
  "state": "Tamil Nadu",
  "district": "Madurai",
  "publicationStatus": "published",
  "allowIndexing": true,
  "isServed": true,
  "introduction": "Madurai homes and apartments often need practical balcony and window protection that keeps living spaces open and usable.",
  "localDescription": "In Madurai, we assess openings, access and household safety needs before recommending an invisible grill layout.",
  "nearbyLocationIds": [
    "loc-tiruchirappalli"
  ],
  "landmarkIds": [],
  "propertyTypes": [
    "apartments",
    "independent-houses"
  ],
  "localCharacteristics": [
    "Established residential pockets",
    "Independent houses and apartments"
  ],
  "serviceDemandNotes": [
    "Window and balcony protection requests"
  ],
  "verifiedLocalFacts": [
    "Madurai is a major city in Tamil Nadu"
  ],
  "localDataVerified": true,
  "contentReviewed": true,
  "qualityScore": 86,
  "createdAt": "2026-08-01T00:00:00.000Z",
  "updatedAt": "2026-08-01T00:00:00.000Z"
};

export const AREAS: Area[] = [
  {
    "id": "area-anna-nagar-madurai",
    "slug": "anna-nagar-madurai",
    "name": "Anna Nagar Madurai",
    "locationType": "area",
    "parentId": "loc-madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "publicationStatus": "published",
    "allowIndexing": true,
    "isServed": true,
    "introduction": "Anna Nagar in Madurai has residential homes and apartments that can use discreet balcony and window safety upgrades.",
    "localDescription": "For Anna Nagar Madurai, we plan measurement visits and recommend spacing based on real opening conditions.",
    "nearbyLocationIds": [
      "area-k-k-nagar-madurai",
      "area-thirunagar"
    ],
    "landmarkIds": [],
    "propertyTypes": [
      "apartments",
      "independent-houses"
    ],
    "localCharacteristics": [
      "Residential locality in Madurai"
    ],
    "serviceDemandNotes": [
      "Balcony and window protection"
    ],
    "verifiedLocalFacts": [
      "Anna Nagar is a residential locality in Madurai, Tamil Nadu"
    ],
    "localDataVerified": true,
    "contentReviewed": true,
    "qualityScore": 82,
    "createdAt": "2026-08-01T00:00:00.000Z",
    "updatedAt": "2026-08-01T00:00:00.000Z"
  },
  {
    "id": "area-k-k-nagar-madurai",
    "slug": "kk-nagar-madurai",
    "name": "KK Nagar Madurai",
    "locationType": "area",
    "parentId": "loc-madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "publicationStatus": "published",
    "allowIndexing": true,
    "isServed": true,
    "introduction": "KK Nagar Madurai homes often need practical fall protection for balconies and upper-floor windows.",
    "localDescription": "Our KK Nagar Madurai service coverage focuses on accurate measurement and clear installation scope.",
    "nearbyLocationIds": [
      "area-anna-nagar-madurai",
      "area-thirunagar"
    ],
    "landmarkIds": [],
    "propertyTypes": [
      "independent-houses",
      "apartments"
    ],
    "localCharacteristics": [
      "Established residential neighbourhood"
    ],
    "serviceDemandNotes": [
      "Family safety for open edges"
    ],
    "verifiedLocalFacts": [
      "KK Nagar is a locality in Madurai, Tamil Nadu"
    ],
    "localDataVerified": true,
    "contentReviewed": true,
    "qualityScore": 81,
    "createdAt": "2026-08-01T00:00:00.000Z",
    "updatedAt": "2026-08-01T00:00:00.000Z"
  },
  {
    "id": "area-thirunagar",
    "slug": "thirunagar",
    "name": "Thirunagar",
    "locationType": "area",
    "parentId": "loc-madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "publicationStatus": "published",
    "allowIndexing": true,
    "isServed": true,
    "introduction": "Thirunagar residential properties can benefit from invisible grill solutions that keep outdoor spaces usable.",
    "localDescription": "In Thirunagar, we discuss openings, access and household needs before confirming an installation plan.",
    "nearbyLocationIds": [
      "area-anna-nagar-madurai",
      "area-k-k-nagar-madurai"
    ],
    "landmarkIds": [],
    "propertyTypes": [
      "independent-houses",
      "apartments"
    ],
    "localCharacteristics": [
      "Residential locality"
    ],
    "serviceDemandNotes": [
      "Balcony safety upgrades"
    ],
    "verifiedLocalFacts": [
      "Thirunagar is a locality in Madurai, Tamil Nadu"
    ],
    "localDataVerified": true,
    "contentReviewed": true,
    "qualityScore": 80,
    "createdAt": "2026-08-01T00:00:00.000Z",
    "updatedAt": "2026-08-01T00:00:00.000Z"
  },
  {
    "id": "area-madurai-mattuthavani",
    "slug": "mattuthavani",
    "name": "Mattuthavani",
    "locationType": "locality",
    "parentId": "loc-madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "publicationStatus": "published",
    "allowIndexing": true,
    "isServed": true,
    "introduction": "Mattuthavani is a residential locality in the Madurai region of Tamil Nadu where apartments and independent homes often need discreet balcony and window safety planning.",
    "localDescription": "In Mattuthavani, we provide measurement-led recommendations based on opening conditions and household needs, as part of our genuine Tamil Nadu service coverage.",
    "nearbyLocationIds": [],
    "landmarkIds": [],
    "propertyTypes": [
      "apartments",
      "independent-houses"
    ],
    "localCharacteristics": [
      "Madurai residential locality",
      "Apartment and independent-house mix"
    ],
    "serviceDemandNotes": [
      "Balcony and window safety enquiries"
    ],
    "verifiedLocalFacts": [
      "Mattuthavani is in Madurai district, Tamil Nadu"
    ],
    "localDataVerified": true,
    "contentReviewed": true,
    "qualityScore": 81,
    "createdAt": "2026-08-04T00:00:00.000Z",
    "updatedAt": "2026-08-04T00:00:00.000Z"
  },
  {
    "id": "area-madurai-tallakulam",
    "slug": "tallakulam",
    "name": "Tallakulam",
    "locationType": "locality",
    "parentId": "loc-madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "publicationStatus": "published",
    "allowIndexing": true,
    "isServed": true,
    "introduction": "Tallakulam is a residential locality in the Madurai region of Tamil Nadu where apartments and independent homes often need discreet balcony and window safety planning.",
    "localDescription": "In Tallakulam, we provide measurement-led recommendations based on opening conditions and household needs, as part of our genuine Tamil Nadu service coverage.",
    "nearbyLocationIds": [],
    "landmarkIds": [],
    "propertyTypes": [
      "apartments",
      "independent-houses"
    ],
    "localCharacteristics": [
      "Madurai residential locality",
      "Apartment and independent-house mix"
    ],
    "serviceDemandNotes": [
      "Balcony and window safety enquiries"
    ],
    "verifiedLocalFacts": [
      "Tallakulam is in Madurai district, Tamil Nadu"
    ],
    "localDataVerified": true,
    "contentReviewed": true,
    "qualityScore": 81,
    "createdAt": "2026-08-04T00:00:00.000Z",
    "updatedAt": "2026-08-04T00:00:00.000Z"
  },
  {
    "id": "area-madurai-simmakkal",
    "slug": "simmakkal",
    "name": "Simmakkal",
    "locationType": "locality",
    "parentId": "loc-madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "publicationStatus": "published",
    "allowIndexing": true,
    "isServed": true,
    "introduction": "Simmakkal is a residential locality in the Madurai region of Tamil Nadu where apartments and independent homes often need discreet balcony and window safety planning.",
    "localDescription": "In Simmakkal, we provide measurement-led recommendations based on opening conditions and household needs, as part of our genuine Tamil Nadu service coverage.",
    "nearbyLocationIds": [],
    "landmarkIds": [],
    "propertyTypes": [
      "apartments",
      "independent-houses"
    ],
    "localCharacteristics": [
      "Madurai residential locality",
      "Apartment and independent-house mix"
    ],
    "serviceDemandNotes": [
      "Balcony and window safety enquiries"
    ],
    "verifiedLocalFacts": [
      "Simmakkal is in Madurai district, Tamil Nadu"
    ],
    "localDataVerified": true,
    "contentReviewed": true,
    "qualityScore": 81,
    "createdAt": "2026-08-04T00:00:00.000Z",
    "updatedAt": "2026-08-04T00:00:00.000Z"
  },
  {
    "id": "area-madurai-goripalayam",
    "slug": "goripalayam",
    "name": "Goripalayam",
    "locationType": "locality",
    "parentId": "loc-madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "publicationStatus": "published",
    "allowIndexing": true,
    "isServed": true,
    "introduction": "Goripalayam is a residential locality in the Madurai region of Tamil Nadu where apartments and independent homes often need discreet balcony and window safety planning.",
    "localDescription": "In Goripalayam, we provide measurement-led recommendations based on opening conditions and household needs, as part of our genuine Tamil Nadu service coverage.",
    "nearbyLocationIds": [],
    "landmarkIds": [],
    "propertyTypes": [
      "apartments",
      "independent-houses"
    ],
    "localCharacteristics": [
      "Madurai residential locality",
      "Apartment and independent-house mix"
    ],
    "serviceDemandNotes": [
      "Balcony and window safety enquiries"
    ],
    "verifiedLocalFacts": [
      "Goripalayam is in Madurai district, Tamil Nadu"
    ],
    "localDataVerified": true,
    "contentReviewed": true,
    "qualityScore": 81,
    "createdAt": "2026-08-04T00:00:00.000Z",
    "updatedAt": "2026-08-04T00:00:00.000Z"
  },
  {
    "id": "area-madurai-arappalayam",
    "slug": "arappalayam",
    "name": "Arappalayam",
    "locationType": "locality",
    "parentId": "loc-madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "publicationStatus": "published",
    "allowIndexing": true,
    "isServed": true,
    "introduction": "Arappalayam is a residential locality in the Madurai region of Tamil Nadu where apartments and independent homes often need discreet balcony and window safety planning.",
    "localDescription": "In Arappalayam, we provide measurement-led recommendations based on opening conditions and household needs, as part of our genuine Tamil Nadu service coverage.",
    "nearbyLocationIds": [],
    "landmarkIds": [],
    "propertyTypes": [
      "apartments",
      "independent-houses"
    ],
    "localCharacteristics": [
      "Madurai residential locality",
      "Apartment and independent-house mix"
    ],
    "serviceDemandNotes": [
      "Balcony and window safety enquiries"
    ],
    "verifiedLocalFacts": [
      "Arappalayam is in Madurai district, Tamil Nadu"
    ],
    "localDataVerified": true,
    "contentReviewed": true,
    "qualityScore": 81,
    "createdAt": "2026-08-04T00:00:00.000Z",
    "updatedAt": "2026-08-04T00:00:00.000Z"
  },
  {
    "id": "area-madurai-villapuram",
    "slug": "villapuram",
    "name": "Villapuram",
    "locationType": "locality",
    "parentId": "loc-madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "publicationStatus": "published",
    "allowIndexing": true,
    "isServed": true,
    "introduction": "Villapuram is a residential locality in the Madurai region of Tamil Nadu where apartments and independent homes often need discreet balcony and window safety planning.",
    "localDescription": "In Villapuram, we provide measurement-led recommendations based on opening conditions and household needs, as part of our genuine Tamil Nadu service coverage.",
    "nearbyLocationIds": [],
    "landmarkIds": [],
    "propertyTypes": [
      "apartments",
      "independent-houses"
    ],
    "localCharacteristics": [
      "Madurai residential locality",
      "Apartment and independent-house mix"
    ],
    "serviceDemandNotes": [
      "Balcony and window safety enquiries"
    ],
    "verifiedLocalFacts": [
      "Villapuram is in Madurai district, Tamil Nadu"
    ],
    "localDataVerified": true,
    "contentReviewed": true,
    "qualityScore": 81,
    "createdAt": "2026-08-04T00:00:00.000Z",
    "updatedAt": "2026-08-04T00:00:00.000Z"
  },
  {
    "id": "area-madurai-pasumalai",
    "slug": "pasumalai",
    "name": "Pasumalai",
    "locationType": "locality",
    "parentId": "loc-madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "publicationStatus": "published",
    "allowIndexing": true,
    "isServed": true,
    "introduction": "Pasumalai is a residential locality in the Madurai region of Tamil Nadu where apartments and independent homes often need discreet balcony and window safety planning.",
    "localDescription": "In Pasumalai, we provide measurement-led recommendations based on opening conditions and household needs, as part of our genuine Tamil Nadu service coverage.",
    "nearbyLocationIds": [],
    "landmarkIds": [],
    "propertyTypes": [
      "apartments",
      "independent-houses"
    ],
    "localCharacteristics": [
      "Madurai residential locality",
      "Apartment and independent-house mix"
    ],
    "serviceDemandNotes": [
      "Balcony and window safety enquiries"
    ],
    "verifiedLocalFacts": [
      "Pasumalai is in Madurai district, Tamil Nadu"
    ],
    "localDataVerified": true,
    "contentReviewed": true,
    "qualityScore": 81,
    "createdAt": "2026-08-04T00:00:00.000Z",
    "updatedAt": "2026-08-04T00:00:00.000Z"
  },
  {
    "id": "area-madurai-teppakulam",
    "slug": "teppakulam",
    "name": "Teppakulam",
    "locationType": "locality",
    "parentId": "loc-madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "publicationStatus": "published",
    "allowIndexing": true,
    "isServed": true,
    "introduction": "Teppakulam is a residential locality in the Madurai region of Tamil Nadu where apartments and independent homes often need discreet balcony and window safety planning.",
    "localDescription": "In Teppakulam, we provide measurement-led recommendations based on opening conditions and household needs, as part of our genuine Tamil Nadu service coverage.",
    "nearbyLocationIds": [],
    "landmarkIds": [],
    "propertyTypes": [
      "apartments",
      "independent-houses"
    ],
    "localCharacteristics": [
      "Madurai residential locality",
      "Apartment and independent-house mix"
    ],
    "serviceDemandNotes": [
      "Balcony and window safety enquiries"
    ],
    "verifiedLocalFacts": [
      "Teppakulam is in Madurai district, Tamil Nadu"
    ],
    "localDataVerified": true,
    "contentReviewed": true,
    "qualityScore": 81,
    "createdAt": "2026-08-04T00:00:00.000Z",
    "updatedAt": "2026-08-04T00:00:00.000Z"
  },
  {
    "id": "area-madurai-bye-pass-road",
    "slug": "bye-pass-road",
    "name": "Bye Pass Road",
    "locationType": "locality",
    "parentId": "loc-madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "publicationStatus": "published",
    "allowIndexing": true,
    "isServed": true,
    "introduction": "Bye Pass Road is a residential locality in the Madurai region of Tamil Nadu where apartments and independent homes often need discreet balcony and window safety planning.",
    "localDescription": "In Bye Pass Road, we provide measurement-led recommendations based on opening conditions and household needs, as part of our genuine Tamil Nadu service coverage.",
    "nearbyLocationIds": [],
    "landmarkIds": [],
    "propertyTypes": [
      "apartments",
      "independent-houses"
    ],
    "localCharacteristics": [
      "Madurai residential locality",
      "Apartment and independent-house mix"
    ],
    "serviceDemandNotes": [
      "Balcony and window safety enquiries"
    ],
    "verifiedLocalFacts": [
      "Bye Pass Road is in Madurai district, Tamil Nadu"
    ],
    "localDataVerified": true,
    "contentReviewed": true,
    "qualityScore": 81,
    "createdAt": "2026-08-04T00:00:00.000Z",
    "updatedAt": "2026-08-04T00:00:00.000Z"
  },
  {
    "id": "area-madurai-avaniyapuram",
    "slug": "avaniyapuram",
    "name": "Avaniyapuram",
    "locationType": "locality",
    "parentId": "loc-madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "publicationStatus": "published",
    "allowIndexing": true,
    "isServed": true,
    "introduction": "Avaniyapuram is a residential locality in the Madurai region of Tamil Nadu where apartments and independent homes often need discreet balcony and window safety planning.",
    "localDescription": "In Avaniyapuram, we provide measurement-led recommendations based on opening conditions and household needs, as part of our genuine Tamil Nadu service coverage.",
    "nearbyLocationIds": [],
    "landmarkIds": [],
    "propertyTypes": [
      "apartments",
      "independent-houses"
    ],
    "localCharacteristics": [
      "Madurai residential locality",
      "Apartment and independent-house mix"
    ],
    "serviceDemandNotes": [
      "Balcony and window safety enquiries"
    ],
    "verifiedLocalFacts": [
      "Avaniyapuram is in Madurai district, Tamil Nadu"
    ],
    "localDataVerified": true,
    "contentReviewed": true,
    "qualityScore": 81,
    "createdAt": "2026-08-04T00:00:00.000Z",
    "updatedAt": "2026-08-04T00:00:00.000Z"
  },
  {
    "id": "area-madurai-othakadai",
    "slug": "othakadai",
    "name": "Othakadai",
    "locationType": "locality",
    "parentId": "loc-madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "publicationStatus": "published",
    "allowIndexing": true,
    "isServed": true,
    "introduction": "Othakadai is a residential locality in the Madurai region of Tamil Nadu where apartments and independent homes often need discreet balcony and window safety planning.",
    "localDescription": "In Othakadai, we provide measurement-led recommendations based on opening conditions and household needs, as part of our genuine Tamil Nadu service coverage.",
    "nearbyLocationIds": [],
    "landmarkIds": [],
    "propertyTypes": [
      "apartments",
      "independent-houses"
    ],
    "localCharacteristics": [
      "Madurai residential locality",
      "Apartment and independent-house mix"
    ],
    "serviceDemandNotes": [
      "Balcony and window safety enquiries"
    ],
    "verifiedLocalFacts": [
      "Othakadai is in Madurai district, Tamil Nadu"
    ],
    "localDataVerified": true,
    "contentReviewed": true,
    "qualityScore": 81,
    "createdAt": "2026-08-04T00:00:00.000Z",
    "updatedAt": "2026-08-04T00:00:00.000Z"
  },
  {
    "id": "area-madurai-koodal-nagar",
    "slug": "koodal-nagar",
    "name": "Koodal Nagar",
    "locationType": "locality",
    "parentId": "loc-madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "publicationStatus": "published",
    "allowIndexing": true,
    "isServed": true,
    "introduction": "Koodal Nagar is a residential locality in the Madurai region of Tamil Nadu where apartments and independent homes often need discreet balcony and window safety planning.",
    "localDescription": "In Koodal Nagar, we provide measurement-led recommendations based on opening conditions and household needs, as part of our genuine Tamil Nadu service coverage.",
    "nearbyLocationIds": [],
    "landmarkIds": [],
    "propertyTypes": [
      "apartments",
      "independent-houses"
    ],
    "localCharacteristics": [
      "Madurai residential locality",
      "Apartment and independent-house mix"
    ],
    "serviceDemandNotes": [
      "Balcony and window safety enquiries"
    ],
    "verifiedLocalFacts": [
      "Koodal Nagar is in Madurai district, Tamil Nadu"
    ],
    "localDataVerified": true,
    "contentReviewed": true,
    "qualityScore": 81,
    "createdAt": "2026-08-04T00:00:00.000Z",
    "updatedAt": "2026-08-04T00:00:00.000Z"
  }
];
