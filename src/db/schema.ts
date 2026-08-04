import {
  boolean,
  doublePrecision,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const geoNodes = pgTable(
  "geo_nodes",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    slug: varchar("slug", { length: 160 }).notNull(),
    name: varchar("name", { length: 200 }).notNull(),
    type: varchar("type", { length: 40 }).notNull(),
    parentId: varchar("parent_id", { length: 64 }),
    state: varchar("state", { length: 80 }).notNull().default("Tamil Nadu"),
    district: varchar("district", { length: 120 }),
    publicationStatus: varchar("publication_status", { length: 20 })
      .notNull()
      .default("draft"),
    allowIndexing: boolean("allow_indexing").notNull().default(false),
    isServed: boolean("is_served").notNull().default(false),
    introduction: text("introduction").notNull().default(""),
    localDescription: text("local_description").notNull().default(""),
    propertyTypes: jsonb("property_types").$type<string[]>().notNull().default([]),
    localCharacteristics: jsonb("local_characteristics")
      .$type<string[]>()
      .notNull()
      .default([]),
    serviceDemandNotes: jsonb("service_demand_notes")
      .$type<string[]>()
      .notNull()
      .default([]),
    verifiedLocalFacts: jsonb("verified_local_facts")
      .$type<string[]>()
      .notNull()
      .default([]),
    latitude: doublePrecision("latitude"),
    longitude: doublePrecision("longitude"),
    localDataVerified: boolean("local_data_verified").notNull().default(false),
    contentReviewed: boolean("content_reviewed").notNull().default(false),
    qualityScore: integer("quality_score").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("geo_nodes_type_slug_uidx").on(table.type, table.slug),
    index("geo_nodes_parent_idx").on(table.parentId),
    index("geo_nodes_type_idx").on(table.type),
    index("geo_nodes_status_idx").on(table.publicationStatus),
    index("geo_nodes_served_idx").on(table.isServed),
  ],
);

export const geoEdges = pgTable(
  "geo_edges",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    fromId: varchar("from_id", { length: 64 }).notNull(),
    toId: varchar("to_id", { length: 64 }).notNull(),
    relation: varchar("relation", { length: 40 }).notNull(),
  },
  (table) => [
    index("geo_edges_from_idx").on(table.fromId),
    index("geo_edges_to_idx").on(table.toId),
    index("geo_edges_relation_idx").on(table.relation),
  ],
);

export const serviceCategories = pgTable("service_categories", {
  id: varchar("id", { length: 64 }).primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  description: text("description").notNull().default(""),
});

export const services = pgTable(
  "services",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    slug: varchar("slug", { length: 160 }).notNull().unique(),
    name: varchar("name", { length: 200 }).notNull(),
    shortName: varchar("short_name", { length: 120 }).notNull(),
    categoryId: varchar("category_id", { length: 64 }).notNull(),
    publicationStatus: varchar("publication_status", { length: 20 })
      .notNull()
      .default("draft"),
    allowIndexing: boolean("allow_indexing").notNull().default(false),
    summary: text("summary").notNull().default(""),
    introduction: text("introduction").notNull().default(""),
    detailedDescription: text("detailed_description").notNull().default(""),
    customerProblems: jsonb("customer_problems").$type<string[]>().notNull().default([]),
    benefits: jsonb("benefits").$type<string[]>().notNull().default([]),
    features: jsonb("features").$type<string[]>().notNull().default([]),
    applications: jsonb("applications").$type<string[]>().notNull().default([]),
    materials: jsonb("materials").$type<string[]>().notNull().default([]),
    specifications: jsonb("specifications").$type<string[]>().notNull().default([]),
    installationSteps: jsonb("installation_steps").$type<string[]>().notNull().default([]),
    safetyInformation: jsonb("safety_information").$type<string[]>().notNull().default([]),
    maintenanceTips: jsonb("maintenance_tips").$type<string[]>().notNull().default([]),
    pricingFactors: jsonb("pricing_factors").$type<string[]>().notNull().default([]),
    suitablePropertyTypes: jsonb("suitable_property_types")
      .$type<string[]>()
      .notNull()
      .default([]),
    primaryKeywords: jsonb("primary_keywords").$type<string[]>().notNull().default([]),
    secondaryKeywords: jsonb("secondary_keywords").$type<string[]>().notNull().default([]),
    customerQuestions: jsonb("customer_questions").$type<string[]>().notNull().default([]),
    searchIntents: jsonb("search_intents").$type<string[]>().notNull().default([]),
    relatedServiceIds: jsonb("related_service_ids").$type<string[]>().notNull().default([]),
    heroImage: varchar("hero_image", { length: 300 }).notNull().default(""),
    galleryImages: jsonb("gallery_images").$type<string[]>().notNull().default([]),
    contentReviewed: boolean("content_reviewed").notNull().default(false),
    qualityScore: integer("quality_score").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("services_status_idx").on(table.publicationStatus),
    index("services_category_idx").on(table.categoryId),
  ],
);

export const pageRecords = pgTable(
  "page_records",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    path: varchar("path", { length: 500 }).notNull(),
    slug: varchar("slug", { length: 300 }).notNull(),
    pageType: varchar("page_type", { length: 40 }).notNull(),
    title: varchar("title", { length: 300 }).notNull(),
    metaDescription: varchar("meta_description", { length: 400 }).notNull(),
    h1: varchar("h1", { length: 300 }).notNull(),
    canonicalUrl: varchar("canonical_url", { length: 600 }).notNull(),
    openGraphTitle: varchar("og_title", { length: 300 }).notNull().default(""),
    openGraphDescription: varchar("og_description", { length: 400 }).notNull().default(""),
    openGraphImage: varchar("og_image", { length: 300 }).notNull().default(""),
    openGraphImageAlt: varchar("og_image_alt", { length: 300 }).notNull().default(""),
    twitterTitle: varchar("twitter_title", { length: 300 }).notNull().default(""),
    twitterDescription: varchar("twitter_description", { length: 400 }).notNull().default(""),
    serviceId: varchar("service_id", { length: 64 }),
    locationId: varchar("location_id", { length: 64 }),
    areaId: varchar("area_id", { length: 64 }),
    propertyTypeId: varchar("property_type_id", { length: 64 }),
    problemId: varchar("problem_id", { length: 64 }),
    guideId: varchar("guide_id", { length: 64 }),
    blogPostId: varchar("blog_post_id", { length: 64 }),
    publicationStatus: varchar("publication_status", { length: 20 })
      .notNull()
      .default("draft"),
    allowIndexing: boolean("allow_indexing").notNull().default(false),
    contentReviewed: boolean("content_reviewed").notNull().default(false),
    localDataVerified: boolean("local_data_verified").notNull().default(false),
    qualityScore: integer("quality_score").notNull().default(0),
    similarityScore: doublePrecision("similarity_score").notNull().default(0),
    wordCount: integer("word_count").notNull().default(0),
    minimumRequiredWordCount: integer("minimum_required_word_count").notNull().default(700),
    hasUniqueMetadata: boolean("has_unique_metadata").notNull().default(false),
    hasUniqueContent: boolean("has_unique_content").notNull().default(false),
    hasValidCanonical: boolean("has_valid_canonical").notNull().default(false),
    hasInternalLinks: boolean("has_internal_links").notNull().default(false),
    hasValidSchema: boolean("has_valid_schema").notNull().default(false),
    crawlPriority: varchar("crawl_priority", { length: 20 }).notNull().default("low"),
    sitemapGroup: varchar("sitemap_group", { length: 60 }),
    searchIntent: varchar("search_intent", { length: 300 }).notNull().default(""),
    introduction: text("introduction").notNull().default(""),
    placeholders: jsonb("placeholders").$type<string[]>().notNull().default([]),
    lastContentChangeAt: timestamp("last_content_change_at", { withTimezone: true }),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    lastReviewedAt: timestamp("last_reviewed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("page_records_path_uidx").on(table.path),
    uniqueIndex("page_records_canonical_uidx").on(table.canonicalUrl),
    index("page_records_type_idx").on(table.pageType),
    index("page_records_status_idx").on(table.publicationStatus),
    index("page_records_index_idx").on(table.allowIndexing),
    index("page_records_service_idx").on(table.serviceId),
    index("page_records_location_idx").on(table.locationId),
    index("page_records_area_idx").on(table.areaId),
    index("page_records_quality_idx").on(table.qualityScore),
    index("page_records_sitemap_idx").on(table.sitemapGroup),
    index("page_records_updated_idx").on(table.updatedAt),
  ],
);

export const mediaAssets = pgTable(
  "media_assets",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    path: varchar("path", { length: 400 }).notNull(),
    alt: varchar("alt", { length: 300 }).notNull().default(""),
    caption: varchar("caption", { length: 400 }).notNull().default(""),
    width: integer("width").notNull().default(1200),
    height: integer("height").notNull().default(800),
    serviceId: varchar("service_id", { length: 64 }),
    locationId: varchar("location_id", { length: 64 }),
  },
  (table) => [index("media_assets_service_idx").on(table.serviceId)],
);

export const reviews = pgTable("reviews", {
  id: varchar("id", { length: 64 }).primaryKey(),
  authorName: varchar("author_name", { length: 120 }).notNull(),
  locationLabel: varchar("location_label", { length: 160 }).notNull().default(""),
  serviceId: varchar("service_id", { length: 64 }),
  quote: text("quote").notNull(),
  rating: integer("rating"),
  verified: boolean("verified").notNull().default(false),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const redirects = pgTable(
  "redirects",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    fromPath: varchar("from_path", { length: 500 }).notNull(),
    toPath: varchar("to_path", { length: 500 }).notNull(),
    statusCode: integer("status_code").notNull().default(301),
  },
  (table) => [uniqueIndex("redirects_from_uidx").on(table.fromPath)],
);
