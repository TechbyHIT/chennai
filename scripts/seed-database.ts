/**
 * Seed PostgreSQL from file data (services, TN geo_nodes, areas).
 * Usage: DATABASE_URL=... npm run db:seed
 */
import { eq } from "drizzle-orm";
import { getDb } from "../src/db/client";
import {
  geoEdges,
  geoNodes,
  serviceCategories,
  services,
} from "../src/db/schema";
import { INITIAL_AREAS } from "../src/data/initial-areas";
import { SERVICE_CATEGORIES } from "../src/data/initial-services";
import { INITIAL_SERVICES } from "../src/data/initial-services";
import { buildTamilNaduLocations } from "../src/lib/geo/build-tn-locations";

function asDate(value: string) {
  return new Date(value);
}

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required for db:seed");
  }

  const db = getDb();
  const locations = buildTamilNaduLocations();

  console.log(`Seeding ${SERVICE_CATEGORIES.length} categories…`);
  for (const cat of SERVICE_CATEGORIES) {
    await db
      .insert(serviceCategories)
      .values({
        id: cat.id,
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
      })
      .onConflictDoUpdate({
        target: serviceCategories.id,
        set: {
          slug: cat.slug,
          name: cat.name,
          description: cat.description,
        },
      });
  }

  console.log(`Seeding ${INITIAL_SERVICES.length} services…`);
  for (const svc of INITIAL_SERVICES) {
    await db
      .insert(services)
      .values({
        id: svc.id,
        slug: svc.slug,
        name: svc.name,
        shortName: svc.shortName,
        categoryId: svc.categoryId,
        publicationStatus: svc.publicationStatus,
        allowIndexing: svc.allowIndexing,
        summary: svc.summary,
        introduction: svc.introduction,
        detailedDescription: svc.detailedDescription,
        customerProblems: svc.customerProblems,
        benefits: svc.benefits,
        features: svc.features,
        applications: svc.applications,
        materials: svc.materials,
        specifications: svc.specifications,
        installationSteps: svc.installationSteps,
        safetyInformation: svc.safetyInformation,
        maintenanceTips: svc.maintenanceTips,
        pricingFactors: svc.pricingFactors,
        suitablePropertyTypes: svc.suitablePropertyTypes,
        primaryKeywords: svc.primaryKeywords,
        secondaryKeywords: svc.secondaryKeywords,
        customerQuestions: svc.customerQuestions,
        searchIntents: svc.searchIntents,
        relatedServiceIds: svc.relatedServiceIds,
        heroImage: svc.heroImage,
        galleryImages: svc.galleryImages,
        contentReviewed: svc.contentReviewed,
        qualityScore: svc.qualityScore,
        createdAt: asDate(svc.createdAt),
        updatedAt: asDate(svc.updatedAt),
      })
      .onConflictDoUpdate({
        target: services.id,
        set: {
          slug: svc.slug,
          name: svc.name,
          summary: svc.summary,
          publicationStatus: svc.publicationStatus,
          allowIndexing: svc.allowIndexing,
          qualityScore: svc.qualityScore,
          updatedAt: asDate(svc.updatedAt),
        },
      });
  }

  console.log(`Seeding ${locations.length} geo nodes (state/district/city)…`);
  for (const loc of locations) {
    await db
      .insert(geoNodes)
      .values({
        id: loc.id,
        slug: loc.slug,
        name: loc.name,
        type: loc.locationType,
        parentId: loc.parentId ?? null,
        state: loc.state,
        district: loc.district ?? null,
        publicationStatus: loc.publicationStatus,
        allowIndexing: loc.allowIndexing,
        isServed: loc.isServed,
        introduction: loc.introduction,
        localDescription: loc.localDescription,
        propertyTypes: loc.propertyTypes,
        localCharacteristics: loc.localCharacteristics,
        serviceDemandNotes: loc.serviceDemandNotes,
        verifiedLocalFacts: loc.verifiedLocalFacts,
        latitude: loc.latitude ?? null,
        longitude: loc.longitude ?? null,
        localDataVerified: loc.localDataVerified,
        contentReviewed: loc.contentReviewed,
        qualityScore: loc.qualityScore,
        createdAt: asDate(loc.createdAt),
        updatedAt: asDate(loc.updatedAt),
      })
      .onConflictDoUpdate({
        target: geoNodes.id,
        set: {
          name: loc.name,
          type: loc.locationType,
          parentId: loc.parentId ?? null,
          publicationStatus: loc.publicationStatus,
          allowIndexing: loc.allowIndexing,
          isServed: loc.isServed,
          qualityScore: loc.qualityScore,
          updatedAt: asDate(loc.updatedAt),
        },
      });

    for (const nearbyId of loc.nearbyLocationIds) {
      const edgeId = `edge-nearby-${loc.id}-${nearbyId}`;
      await db
        .insert(geoEdges)
        .values({
          id: edgeId,
          fromId: loc.id,
          toId: nearbyId,
          relation: "nearby",
        })
        .onConflictDoNothing();
    }

    if (loc.parentId) {
      const edgeId = `edge-parent-${loc.id}`;
      await db
        .insert(geoEdges)
        .values({
          id: edgeId,
          fromId: loc.id,
          toId: loc.parentId,
          relation: "parent",
        })
        .onConflictDoNothing();
    }
  }

  console.log(`Seeding ${INITIAL_AREAS.length} area/locality nodes…`);
  for (const area of INITIAL_AREAS) {
    await db
      .insert(geoNodes)
      .values({
        id: area.id,
        slug: area.slug,
        name: area.name,
        type: area.locationType,
        parentId: area.parentId,
        state: area.state,
        district: area.district ?? null,
        publicationStatus: area.publicationStatus,
        allowIndexing: area.allowIndexing,
        isServed: area.isServed,
        introduction: area.introduction,
        localDescription: area.localDescription,
        propertyTypes: area.propertyTypes,
        localCharacteristics: area.localCharacteristics,
        serviceDemandNotes: area.serviceDemandNotes,
        verifiedLocalFacts: area.verifiedLocalFacts,
        latitude: area.latitude ?? null,
        longitude: area.longitude ?? null,
        localDataVerified: area.localDataVerified,
        contentReviewed: area.contentReviewed,
        qualityScore: area.qualityScore,
        createdAt: asDate(area.createdAt),
        updatedAt: asDate(area.updatedAt),
      })
      .onConflictDoUpdate({
        target: geoNodes.id,
        set: {
          name: area.name,
          parentId: area.parentId,
          publicationStatus: area.publicationStatus,
          allowIndexing: area.allowIndexing,
          isServed: area.isServed,
          qualityScore: area.qualityScore,
          updatedAt: asDate(area.updatedAt),
        },
      });

    await db
      .insert(geoEdges)
      .values({
        id: `edge-parent-${area.id}`,
        fromId: area.id,
        toId: area.parentId,
        relation: "parent",
      })
      .onConflictDoNothing();
  }

  const cityCount = await db
    .select()
    .from(geoNodes)
    .where(eq(geoNodes.type, "city"));
  console.log(`Done. Cities in geo_nodes: ${cityCount.length}`);
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
