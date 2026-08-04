import type { Area } from "@/types/location";
import { CHENNAI_AREAS } from "@/data/chennai-areas";
import { COIMBATORE_AREAS } from "@/data/coimbatore-areas";
import { COIMBATORE_HUB_AREAS } from "@/data/coimbatore-hub-areas";
import { EXPANDED_TN_AREAS } from "@/data/expanded-tn-areas";
import { TN_TOWN_HUB_AREAS } from "@/data/tn-town-hub-areas";

const now = "2026-08-01T00:00:00.000Z";

const OTHER_TN_AREAS: Area[] = [
  {
    id: "area-anna-nagar-madurai",
    slug: "anna-nagar-madurai",
    name: "Anna Nagar Madurai",
    locationType: "area",
    parentId: "loc-madurai",
    state: "Tamil Nadu",
    district: "Madurai",
    publicationStatus: "published",
    allowIndexing: true,
    isServed: true,
    introduction:
      "Anna Nagar in Madurai has residential homes and apartments that can use discreet balcony and window safety upgrades.",
    localDescription:
      "For Anna Nagar Madurai, we plan measurement visits and recommend spacing based on real opening conditions.",
    nearbyLocationIds: ["area-k-k-nagar-madurai", "area-thirunagar"],
    landmarkIds: [],
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["Residential locality in Madurai"],
    serviceDemandNotes: ["Balcony and window protection"],
    verifiedLocalFacts: ["Anna Nagar is a residential locality in Madurai, Tamil Nadu"],
    localDataVerified: true,
    contentReviewed: true,
    qualityScore: 82,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "area-k-k-nagar-madurai",
    slug: "kk-nagar-madurai",
    name: "KK Nagar Madurai",
    locationType: "area",
    parentId: "loc-madurai",
    state: "Tamil Nadu",
    district: "Madurai",
    publicationStatus: "published",
    allowIndexing: true,
    isServed: true,
    introduction:
      "KK Nagar Madurai homes often need practical fall protection for balconies and upper-floor windows.",
    localDescription:
      "Our KK Nagar Madurai service coverage focuses on accurate measurement and clear installation scope.",
    nearbyLocationIds: ["area-anna-nagar-madurai", "area-thirunagar"],
    landmarkIds: [],
    propertyTypes: ["independent-houses", "apartments"],
    localCharacteristics: ["Established residential neighbourhood"],
    serviceDemandNotes: ["Family safety for open edges"],
    verifiedLocalFacts: ["KK Nagar is a locality in Madurai, Tamil Nadu"],
    localDataVerified: true,
    contentReviewed: true,
    qualityScore: 81,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "area-thirunagar",
    slug: "thirunagar",
    name: "Thirunagar",
    locationType: "area",
    parentId: "loc-madurai",
    state: "Tamil Nadu",
    district: "Madurai",
    publicationStatus: "published",
    allowIndexing: true,
    isServed: true,
    introduction:
      "Thirunagar residential properties can benefit from invisible grill solutions that keep outdoor spaces usable.",
    localDescription:
      "In Thirunagar, we discuss openings, access and household needs before confirming an installation plan.",
    nearbyLocationIds: ["area-anna-nagar-madurai", "area-k-k-nagar-madurai"],
    landmarkIds: [],
    propertyTypes: ["independent-houses", "apartments"],
    localCharacteristics: ["Residential locality"],
    serviceDemandNotes: ["Balcony safety upgrades"],
    verifiedLocalFacts: ["Thirunagar is a locality in Madurai, Tamil Nadu"],
    localDataVerified: true,
    contentReviewed: true,
    qualityScore: 80,
    createdAt: now,
    updatedAt: now,
  },
];

const merged: Area[] = [
  ...CHENNAI_AREAS,
  ...COIMBATORE_AREAS,
  ...COIMBATORE_HUB_AREAS,
  ...OTHER_TN_AREAS,
  ...EXPANDED_TN_AREAS,
  ...TN_TOWN_HUB_AREAS,
];

// Guard against duplicate slug+parent pairs across the merged seed files.
const seen = new Set<string>();
export const INITIAL_AREAS: Area[] = merged.filter((area) => {
  const key = `${area.parentId}::${area.slug}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});
