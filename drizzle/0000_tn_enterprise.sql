CREATE TABLE IF NOT EXISTS "geo_nodes" (
  "id" varchar(64) PRIMARY KEY NOT NULL,
  "slug" varchar(160) NOT NULL,
  "name" varchar(200) NOT NULL,
  "type" varchar(40) NOT NULL,
  "parent_id" varchar(64),
  "state" varchar(80) DEFAULT 'Tamil Nadu' NOT NULL,
  "district" varchar(120),
  "publication_status" varchar(20) DEFAULT 'draft' NOT NULL,
  "allow_indexing" boolean DEFAULT false NOT NULL,
  "is_served" boolean DEFAULT false NOT NULL,
  "introduction" text DEFAULT '' NOT NULL,
  "local_description" text DEFAULT '' NOT NULL,
  "property_types" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "local_characteristics" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "service_demand_notes" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "verified_local_facts" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "latitude" double precision,
  "longitude" double precision,
  "local_data_verified" boolean DEFAULT false NOT NULL,
  "content_reviewed" boolean DEFAULT false NOT NULL,
  "quality_score" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "geo_nodes_type_slug_uidx" ON "geo_nodes" ("type","slug");
CREATE INDEX IF NOT EXISTS "geo_nodes_parent_idx" ON "geo_nodes" ("parent_id");
CREATE INDEX IF NOT EXISTS "geo_nodes_type_idx" ON "geo_nodes" ("type");
CREATE INDEX IF NOT EXISTS "geo_nodes_status_idx" ON "geo_nodes" ("publication_status");
CREATE INDEX IF NOT EXISTS "geo_nodes_served_idx" ON "geo_nodes" ("is_served");

CREATE TABLE IF NOT EXISTS "geo_edges" (
  "id" varchar(64) PRIMARY KEY NOT NULL,
  "from_id" varchar(64) NOT NULL,
  "to_id" varchar(64) NOT NULL,
  "relation" varchar(40) NOT NULL
);
CREATE INDEX IF NOT EXISTS "geo_edges_from_idx" ON "geo_edges" ("from_id");
CREATE INDEX IF NOT EXISTS "geo_edges_to_idx" ON "geo_edges" ("to_id");
CREATE INDEX IF NOT EXISTS "geo_edges_relation_idx" ON "geo_edges" ("relation");

CREATE TABLE IF NOT EXISTS "service_categories" (
  "id" varchar(64) PRIMARY KEY NOT NULL,
  "slug" varchar(120) NOT NULL UNIQUE,
  "name" varchar(160) NOT NULL,
  "description" text DEFAULT '' NOT NULL
);

CREATE TABLE IF NOT EXISTS "services" (
  "id" varchar(64) PRIMARY KEY NOT NULL,
  "slug" varchar(160) NOT NULL UNIQUE,
  "name" varchar(200) NOT NULL,
  "short_name" varchar(120) NOT NULL,
  "category_id" varchar(64) NOT NULL,
  "publication_status" varchar(20) DEFAULT 'draft' NOT NULL,
  "allow_indexing" boolean DEFAULT false NOT NULL,
  "summary" text DEFAULT '' NOT NULL,
  "introduction" text DEFAULT '' NOT NULL,
  "detailed_description" text DEFAULT '' NOT NULL,
  "customer_problems" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "benefits" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "features" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "applications" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "materials" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "specifications" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "installation_steps" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "safety_information" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "maintenance_tips" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "pricing_factors" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "suitable_property_types" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "primary_keywords" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "secondary_keywords" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "customer_questions" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "search_intents" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "related_service_ids" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "hero_image" varchar(300) DEFAULT '' NOT NULL,
  "gallery_images" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "content_reviewed" boolean DEFAULT false NOT NULL,
  "quality_score" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "services_status_idx" ON "services" ("publication_status");
CREATE INDEX IF NOT EXISTS "services_category_idx" ON "services" ("category_id");

CREATE TABLE IF NOT EXISTS "page_records" (
  "id" varchar(64) PRIMARY KEY NOT NULL,
  "path" varchar(500) NOT NULL,
  "slug" varchar(300) NOT NULL,
  "page_type" varchar(40) NOT NULL,
  "title" varchar(300) NOT NULL,
  "meta_description" varchar(400) NOT NULL,
  "h1" varchar(300) NOT NULL,
  "canonical_url" varchar(600) NOT NULL,
  "og_title" varchar(300) DEFAULT '' NOT NULL,
  "og_description" varchar(400) DEFAULT '' NOT NULL,
  "og_image" varchar(300) DEFAULT '' NOT NULL,
  "og_image_alt" varchar(300) DEFAULT '' NOT NULL,
  "twitter_title" varchar(300) DEFAULT '' NOT NULL,
  "twitter_description" varchar(400) DEFAULT '' NOT NULL,
  "service_id" varchar(64),
  "location_id" varchar(64),
  "area_id" varchar(64),
  "property_type_id" varchar(64),
  "problem_id" varchar(64),
  "guide_id" varchar(64),
  "blog_post_id" varchar(64),
  "publication_status" varchar(20) DEFAULT 'draft' NOT NULL,
  "allow_indexing" boolean DEFAULT false NOT NULL,
  "content_reviewed" boolean DEFAULT false NOT NULL,
  "local_data_verified" boolean DEFAULT false NOT NULL,
  "quality_score" integer DEFAULT 0 NOT NULL,
  "similarity_score" double precision DEFAULT 0 NOT NULL,
  "word_count" integer DEFAULT 0 NOT NULL,
  "minimum_required_word_count" integer DEFAULT 700 NOT NULL,
  "has_unique_metadata" boolean DEFAULT false NOT NULL,
  "has_unique_content" boolean DEFAULT false NOT NULL,
  "has_valid_canonical" boolean DEFAULT false NOT NULL,
  "has_internal_links" boolean DEFAULT false NOT NULL,
  "has_valid_schema" boolean DEFAULT false NOT NULL,
  "crawl_priority" varchar(20) DEFAULT 'low' NOT NULL,
  "sitemap_group" varchar(60),
  "search_intent" varchar(300) DEFAULT '' NOT NULL,
  "introduction" text DEFAULT '' NOT NULL,
  "placeholders" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "last_content_change_at" timestamp with time zone,
  "published_at" timestamp with time zone,
  "last_reviewed_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "page_records_path_uidx" ON "page_records" ("path");
CREATE UNIQUE INDEX IF NOT EXISTS "page_records_canonical_uidx" ON "page_records" ("canonical_url");
CREATE INDEX IF NOT EXISTS "page_records_type_idx" ON "page_records" ("page_type");
CREATE INDEX IF NOT EXISTS "page_records_status_idx" ON "page_records" ("publication_status");
CREATE INDEX IF NOT EXISTS "page_records_index_idx" ON "page_records" ("allow_indexing");
CREATE INDEX IF NOT EXISTS "page_records_service_idx" ON "page_records" ("service_id");
CREATE INDEX IF NOT EXISTS "page_records_location_idx" ON "page_records" ("location_id");
CREATE INDEX IF NOT EXISTS "page_records_area_idx" ON "page_records" ("area_id");
CREATE INDEX IF NOT EXISTS "page_records_quality_idx" ON "page_records" ("quality_score");
CREATE INDEX IF NOT EXISTS "page_records_sitemap_idx" ON "page_records" ("sitemap_group");
CREATE INDEX IF NOT EXISTS "page_records_updated_idx" ON "page_records" ("updated_at");

CREATE TABLE IF NOT EXISTS "media_assets" (
  "id" varchar(64) PRIMARY KEY NOT NULL,
  "path" varchar(400) NOT NULL,
  "alt" varchar(300) DEFAULT '' NOT NULL,
  "caption" varchar(400) DEFAULT '' NOT NULL,
  "width" integer DEFAULT 1200 NOT NULL,
  "height" integer DEFAULT 800 NOT NULL,
  "service_id" varchar(64),
  "location_id" varchar(64)
);
CREATE INDEX IF NOT EXISTS "media_assets_service_idx" ON "media_assets" ("service_id");

CREATE TABLE IF NOT EXISTS "reviews" (
  "id" varchar(64) PRIMARY KEY NOT NULL,
  "author_name" varchar(120) NOT NULL,
  "location_label" varchar(160) DEFAULT '' NOT NULL,
  "service_id" varchar(64),
  "quote" text NOT NULL,
  "rating" integer,
  "verified" boolean DEFAULT false NOT NULL,
  "published" boolean DEFAULT false NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "redirects" (
  "id" varchar(64) PRIMARY KEY NOT NULL,
  "from_path" varchar(500) NOT NULL,
  "to_path" varchar(500) NOT NULL,
  "status_code" integer DEFAULT 301 NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "redirects_from_uidx" ON "redirects" ("from_path");
