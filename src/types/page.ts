import type { PublicationStatus } from "./business";

export type PageType =
  | "home"
  | "core"
  | "service"
  | "location"
  | "area"
  | "service-location"
  | "service-area"
  | "solution"
  | "property-type-service"
  | "guide"
  | "blog";

export type CrawlPriority = "critical" | "high" | "medium" | "low";

export type PageRecord = {
  id: string;
  path: string;
  slug: string;
  pageType: PageType;

  title: string;
  metaDescription: string;
  h1: string;
  canonicalUrl: string;

  openGraphTitle: string;
  openGraphDescription: string;
  openGraphImage: string;
  openGraphImageAlt: string;
  twitterTitle: string;
  twitterDescription: string;

  serviceId?: string;
  locationId?: string;
  areaId?: string;
  propertyTypeId?: string;
  problemId?: string;
  guideId?: string;
  blogPostId?: string;

  publicationStatus: PublicationStatus;
  allowIndexing: boolean;
  contentReviewed: boolean;
  localDataVerified: boolean;

  qualityScore: number;
  similarityScore: number;
  wordCount: number;
  minimumRequiredWordCount: number;

  hasUniqueMetadata: boolean;
  hasUniqueContent: boolean;
  hasValidCanonical: boolean;
  hasInternalLinks: boolean;
  hasValidSchema: boolean;

  crawlPriority: CrawlPriority;
  sitemapGroup?: string;
  lastContentChangeAt?: string;
  publishedAt?: string;
  lastReviewedAt?: string;
  createdAt: string;
  updatedAt: string;

  searchIntent: string;
  introduction: string;
  placeholders: string[];
};

export type PageIndexabilityInput = {
  publicationStatus: PublicationStatus;
  allowIndexing: boolean;
  qualityScore: number;
  contentReviewed: boolean;
  localDataVerified: boolean;
  hasUniqueMetadata: boolean;
  hasUniqueContent: boolean;
  hasValidCanonical: boolean;
  hasInternalLinks: boolean;
  hasValidSchema: boolean;
  wordCount: number;
  minimumRequiredWordCount: number;
  similarityScore: number;
};
