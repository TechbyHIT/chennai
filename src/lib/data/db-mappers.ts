import type { geoNodes, services } from "@/db/schema";
import type { Area, Location, LocationType } from "@/types/location";
import type { Service } from "@/types/service";

type GeoRow = typeof geoNodes.$inferSelect;
type ServiceRow = typeof services.$inferSelect;

export function mapGeoNodeToLocation(row: GeoRow): Location {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    locationType: row.type as LocationType,
    parentId: row.parentId ?? undefined,
    state: row.state,
    district: row.district ?? undefined,
    publicationStatus: row.publicationStatus as Location["publicationStatus"],
    allowIndexing: row.allowIndexing,
    isServed: row.isServed,
    introduction: row.introduction,
    localDescription: row.localDescription,
    nearbyLocationIds: [],
    landmarkIds: [],
    propertyTypes: row.propertyTypes ?? [],
    localCharacteristics: row.localCharacteristics ?? [],
    serviceDemandNotes: row.serviceDemandNotes ?? [],
    verifiedLocalFacts: row.verifiedLocalFacts ?? [],
    latitude: row.latitude ?? undefined,
    longitude: row.longitude ?? undefined,
    localDataVerified: row.localDataVerified,
    contentReviewed: row.contentReviewed,
    qualityScore: row.qualityScore,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export function mapGeoNodeToArea(row: GeoRow): Area {
  const location = mapGeoNodeToLocation(row);
  return {
    ...location,
    locationType: row.type === "locality" ? "locality" : "area",
    parentId: row.parentId ?? "",
  };
}

export function mapServiceRow(row: ServiceRow): Service {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortName: row.shortName,
    categoryId: row.categoryId,
    publicationStatus: row.publicationStatus as Service["publicationStatus"],
    allowIndexing: row.allowIndexing,
    summary: row.summary,
    introduction: row.introduction,
    detailedDescription: row.detailedDescription,
    customerProblems: row.customerProblems ?? [],
    benefits: row.benefits ?? [],
    features: row.features ?? [],
    applications: row.applications ?? [],
    materials: row.materials ?? [],
    specifications: row.specifications ?? [],
    installationSteps: row.installationSteps ?? [],
    safetyInformation: row.safetyInformation ?? [],
    maintenanceTips: row.maintenanceTips ?? [],
    pricingFactors: row.pricingFactors ?? [],
    suitablePropertyTypes: row.suitablePropertyTypes ?? [],
    primaryKeywords: row.primaryKeywords ?? [],
    secondaryKeywords: row.secondaryKeywords ?? [],
    customerQuestions: row.customerQuestions ?? [],
    searchIntents: row.searchIntents ?? [],
    relatedServiceIds: row.relatedServiceIds ?? [],
    heroImage: row.heroImage,
    galleryImages: row.galleryImages ?? [],
    contentReviewed: row.contentReviewed,
    qualityScore: row.qualityScore,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}
