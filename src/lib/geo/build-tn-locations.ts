import { INITIAL_LOCATIONS } from "@/data/initial-locations";
import { TN_DISTRICTS, TN_STATE } from "@/data/tn-districts-cities";
import type { Location } from "@/types/location";

const now = "2026-08-01T00:00:00.000Z";

function districtId(slug: string) {
  return `geo-district-${slug}`;
}

function cityId(slug: string) {
  return `loc-${slug}`;
}

/**
 * Merge curated INITIAL_LOCATIONS with expanded TN district/city coverage.
 * Existing city records win on content; new cities get honest draft/review defaults.
 */
export function buildTamilNaduLocations(): Location[] {
  const bySlug = new Map(INITIAL_LOCATIONS.map((loc) => [loc.slug, loc]));
  const result: Location[] = [
    {
      id: TN_STATE.id,
      slug: TN_STATE.slug,
      name: TN_STATE.name,
      locationType: "state",
      state: "Tamil Nadu",
      publicationStatus: "published",
      allowIndexing: true,
      isServed: true,
      introduction:
        "Glory Invisible Grills serves selected cities and areas across Tamil Nadu with measured invisible grill, safety net and related home safety installations.",
      localDescription:
        "Coverage is limited to locations we can genuinely survey and install. District and city pages expand as verified local content is ready.",
      nearbyLocationIds: [],
      landmarkIds: [],
      propertyTypes: ["apartments", "independent-houses", "high-rise-apartments", "villas"],
      localCharacteristics: [
        "Coastal and inland climate variation",
        "Dense apartment corridors in major cities",
      ],
      serviceDemandNotes: ["Balcony and window safety demand in urban housing"],
      verifiedLocalFacts: ["Tamil Nadu is a state in southern India"],
      localDataVerified: true,
      contentReviewed: true,
      qualityScore: 90,
      createdAt: now,
      updatedAt: now,
    },
  ];

  for (const district of TN_DISTRICTS) {
    result.push({
      id: districtId(district.slug),
      slug: district.slug,
      name: district.name,
      locationType: "district",
      parentId: TN_STATE.id,
      state: "Tamil Nadu",
      district: district.name,
      publicationStatus: "review",
      allowIndexing: false,
      isServed: district.cities.some((c) => c.served),
      introduction: `${district.name} district coverage for selected Glory Invisible Grills services in Tamil Nadu.`,
      localDescription: `City and area pages under ${district.name} publish when local verification and content quality gates are met.`,
      nearbyLocationIds: [],
      landmarkIds: [],
      propertyTypes: ["apartments", "independent-houses"],
      localCharacteristics: [],
      serviceDemandNotes: [],
      verifiedLocalFacts: [`${district.name} is a district in Tamil Nadu`],
      localDataVerified: true,
      contentReviewed: false,
      qualityScore: 70,
      createdAt: now,
      updatedAt: now,
    });

    for (const city of district.cities) {
      const existing = bySlug.get(city.slug);
      if (existing) {
        result.push({
          ...existing,
          parentId: districtId(district.slug),
          district: district.name,
          locationType: existing.locationType === "area" ? "city" : existing.locationType,
        });
        bySlug.delete(city.slug);
        continue;
      }

      const served = Boolean(city.served);
      result.push({
        id: cityId(city.slug),
        slug: city.slug,
        name: city.name,
        locationType: "city",
        parentId: districtId(district.slug),
        state: "Tamil Nadu",
        district: district.name,
        publicationStatus: served ? "published" : "review",
        allowIndexing: served,
        isServed: served,
        introduction: `${city.name} is covered for site assessment and installation based on appointment availability in Tamil Nadu.`,
        localDescription: served
          ? `We schedule measurements in ${city.name} for eligible balcony, window and netting projects after confirming access and requirements.`
          : `Service pages for ${city.name} remain limited until local verification and content modules meet publishing gates.`,
        nearbyLocationIds: [],
        landmarkIds: [],
        propertyTypes: ["apartments", "independent-houses"],
        localCharacteristics: [],
        serviceDemandNotes: served ? ["Balcony and window safety requests"] : [],
        verifiedLocalFacts: [`${city.name} is in ${district.name} district, Tamil Nadu`],
        localDataVerified: served,
        contentReviewed: served,
        qualityScore: served ? 82 : 68,
        createdAt: now,
        updatedAt: now,
      });
    }
  }

  // Keep any curated cities not listed in district seed (safety net)
  for (const leftover of bySlug.values()) {
    if (leftover.state === "Tamil Nadu") {
      result.push(leftover);
    }
  }

  return result;
}
