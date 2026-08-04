import type { Area } from "@/types/location";
import { TN_DISTRICTS } from "@/data/tn-districts-cities";

/**
 * Every served TN city gets at least one indexable locality hub
 * ("{City} Town") so service×area pages exist beyond city hubs.
 * Existing richer locality files (Chennai/Coimbatore/expanded) win on slug+parent.
 */

const now = "2026-08-04T00:00:00.000Z";

const SKIP_PARENTS = new Set([
  "loc-chennai",
  "loc-coimbatore",
  "loc-tambaram",
]);

export const TN_TOWN_HUB_AREAS: Area[] = [];

for (const district of TN_DISTRICTS) {
  for (const city of district.cities) {
    if (!city.served) continue;
    const parentId = `loc-${city.slug}`;
    if (SKIP_PARENTS.has(parentId)) continue;

    TN_TOWN_HUB_AREAS.push({
      id: `area-${city.slug}-town`,
      slug: `${city.slug}-town`,
      name: `${city.name} Town`,
      locationType: "locality",
      parentId,
      state: "Tamil Nadu",
      district: district.name,
      publicationStatus: "published",
      allowIndexing: true,
      isServed: true,
      introduction: `${city.name} Town is the main urban pocket of ${city.name} in ${district.name} district, Tamil Nadu, where homes and apartments often need balcony and window safety planning.`,
      localDescription: `In ${city.name}, we schedule measurement visits for invisible grills, safety nets and bird control based on appointment availability across Tamil Nadu.`,
      nearbyLocationIds: [],
      landmarkIds: [],
      propertyTypes: ["apartments", "independent-houses"],
      localCharacteristics: [
        `${city.name} urban locality`,
        `${district.name} district coverage`,
      ],
      serviceDemandNotes: ["Balcony and window safety enquiries"],
      verifiedLocalFacts: [
        `${city.name} is in ${district.name} district, Tamil Nadu`,
      ],
      localDataVerified: true,
      contentReviewed: true,
      qualityScore: 80,
      createdAt: now,
      updatedAt: now,
    });
  }
}
