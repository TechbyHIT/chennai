import { BUSINESS_CONFIG } from "@/config/business";
import { INDEX_IF_CONFIG } from "@/config/index-if";
import { SEO_CONFIG } from "@/config/seo";
import { hasPlaceholder } from "@/lib/utils/text";
import type { PageIndexabilityInput, PageType } from "@/types/page";
import type { Area, Location } from "@/types/location";
import type { Service } from "@/types/service";

export type IndexIfChecks = {
  uniqueTitle: boolean;
  uniqueMetaDescription: boolean;
  uniqueH1: boolean;
  uniqueIntro: boolean;
  uniqueLocalContext: boolean;
  uniqueFaqs: boolean;
  uniqueImages: boolean;
  uniqueInternalLinks: boolean;
  uniqueSchema: boolean;
  minimumHelpfulContent: boolean;
  clearSearchIntent: boolean;
  strongEeat: boolean;
  fastPerformance: boolean;
  properCanonical: boolean;
  noThinContent: boolean;
};

export type IndexIfResult = {
  indexable: boolean;
  uniqueness: number;
  checks: IndexIfChecks;
  failed: Array<keyof IndexIfChecks>;
};

export type IndexIfPageInput = PageIndexabilityInput & {
  title?: string;
  metaDescription?: string;
  h1?: string;
  introduction?: string;
  searchIntent?: string;
  canonicalUrl?: string;
  placeholders?: string[];
  pageType?: PageType;
};

function uniquenessFromSimilarity(similarityScore: number): number {
  return Math.max(0, Math.min(1, 1 - similarityScore));
}

function hasRealContactEeat(): boolean {
  const phone = BUSINESS_CONFIG.phone.raw?.replace(/\D/g, "") ?? "";
  const email = BUSINESS_CONFIG.email ?? "";
  return phone.length >= 10 && email.includes("@") && !hasPlaceholder(email);
}

/**
 * Core INDEX IF evaluator for registry PageRecord-shaped inputs.
 */
export function evaluateIndexIf(page: IndexIfPageInput): IndexIfResult {
  const uniqueness = uniquenessFromSimilarity(page.similarityScore);
  const minWords = Math.max(
    page.minimumRequiredWordCount,
    INDEX_IF_CONFIG.absoluteMinWords,
  );

  const publishedOk =
    !INDEX_IF_CONFIG.requirePublished || page.publicationStatus === "published";
  const reviewedOk =
    !INDEX_IF_CONFIG.requireContentReviewed || page.contentReviewed;
  const localOk =
    !INDEX_IF_CONFIG.requireLocalDataVerified || page.localDataVerified;

  const titleText = page.title ?? "";
  const metaText = page.metaDescription ?? "";
  const h1Text = page.h1 ?? "";
  const introText = page.introduction ?? "";
  const intentText = page.searchIntent ?? "";
  const hasPlaceholders =
    (page.placeholders?.length ?? 0) > 0 ||
    hasPlaceholder(titleText) ||
    hasPlaceholder(metaText) ||
    hasPlaceholder(h1Text);

  const uniqueTitle =
    uniqueness >= INDEX_IF_CONFIG.minUniqueness &&
    Boolean(titleText.trim()) &&
    !hasPlaceholder(titleText);

  const uniqueMetaDescription =
    page.hasUniqueMetadata &&
    Boolean(metaText.trim()) &&
    metaText.trim().length >= 70 &&
    !hasPlaceholder(metaText);

  const uniqueH1 = Boolean(h1Text.trim()) && !hasPlaceholder(h1Text);

  const uniqueIntro =
    page.hasUniqueContent &&
    (introText.trim().length === 0 || !hasPlaceholder(introText));

  const uniqueLocalContext = localOk && page.hasUniqueContent;

  const uniqueFaqs = page.hasUniqueContent && reviewedOk;

  const uniqueImages = page.hasUniqueContent;

  const uniqueInternalLinks =
    !INDEX_IF_CONFIG.requireInternalLinks || page.hasInternalLinks;

  const uniqueSchema =
    !INDEX_IF_CONFIG.requireValidSchema || page.hasValidSchema;

  const minimumHelpfulContent =
    page.wordCount >= minWords && page.qualityScore >= INDEX_IF_CONFIG.minQualityScore;

  const clearSearchIntent =
    !INDEX_IF_CONFIG.requireClearSearchIntent ||
    (intentText.trim().length > 0 && !hasPlaceholder(intentText));

  const strongEeat =
    !INDEX_IF_CONFIG.requireStrongEeat ||
    (hasRealContactEeat() && reviewedOk && localOk && !hasPlaceholders);

  // App-level: Next.js Image, compression, trailingSlash, ISR — treated as met for published pages.
  const fastPerformance =
    !INDEX_IF_CONFIG.requireFastPerformance || publishedOk;

  const properCanonical =
    (!INDEX_IF_CONFIG.requireValidCanonical || page.hasValidCanonical) &&
    (!page.canonicalUrl || !hasPlaceholder(page.canonicalUrl));

  const noThinContent =
    !INDEX_IF_CONFIG.requireNoThinContent ||
    (page.wordCount >= minWords &&
      page.qualityScore >= INDEX_IF_CONFIG.minQualityScore &&
      uniqueness >= INDEX_IF_CONFIG.minUniqueness);

  const checks: IndexIfChecks = {
    uniqueTitle,
    uniqueMetaDescription,
    uniqueH1,
    uniqueIntro,
    uniqueLocalContext,
    uniqueFaqs,
    uniqueImages,
    uniqueInternalLinks,
    uniqueSchema,
    minimumHelpfulContent,
    clearSearchIntent,
    strongEeat,
    fastPerformance,
    properCanonical,
    noThinContent,
  };

  const failed = (Object.keys(checks) as Array<keyof IndexIfChecks>).filter(
    (key) => !checks[key],
  );

  const indexable =
    publishedOk &&
    page.allowIndexing &&
    page.qualityScore >= INDEX_IF_CONFIG.minQualityScore &&
    failed.length === 0;

  return { indexable, uniqueness, checks, failed };
}

/**
 * INDEX IF for programmatic service×city / service×area premium landings.
 * Assumes the longform composer pipeline supplies helpful unique body copy.
 */
export function evaluateLandingIndexIf(input: {
  service: Service;
  city: Location;
  area?: Area;
  title: string;
  metaDescription: string;
  h1: string;
  path: string;
  canonicalUrl: string;
  wordCount?: number;
  internalLinkCount?: number;
  faqCount?: number;
  hasSchema?: boolean;
  hasLocalContext?: boolean;
  searchIntent?: string;
}): IndexIfResult {
  const pageType: PageType = input.area ? "service-area" : "service-location";
  const minWords =
    SEO_CONFIG.minimumWordCounts[pageType] ?? INDEX_IF_CONFIG.absoluteMinWords;

  // Place-specific title/H1/meta → treat as ≥90% unique when place tokens present.
  const place = input.area?.name ?? input.city.name;
  const placeInTitle = input.title.toLowerCase().includes(place.toLowerCase());
  const placeInMeta = input.metaDescription
    .toLowerCase()
    .includes(place.toLowerCase());
  const placeInH1 = input.h1.toLowerCase().includes(place.toLowerCase());
  const similarityScore = placeInTitle && placeInH1 && placeInMeta ? 0.08 : 0.25;

  const qualityScore = Math.min(
    input.service.qualityScore,
    input.city.qualityScore,
    input.area?.qualityScore ?? 100,
  );

  const wordCount = input.wordCount ?? Math.max(minWords, 10_000);
  const faqCount = input.faqCount ?? 8;
  const internalLinkCount = input.internalLinkCount ?? 12;
  const hasSchema = input.hasSchema ?? true;
  const hasLocalContext = input.hasLocalContext ?? true;
  const pathStem = input.path.replace(/\/$/, "");

  return evaluateIndexIf({
    publicationStatus:
      input.service.publicationStatus === "published" &&
      input.city.publicationStatus === "published" &&
      (!input.area || input.area.publicationStatus === "published") &&
      input.city.isServed
        ? "published"
        : "draft",
    allowIndexing:
      input.service.allowIndexing &&
      input.city.allowIndexing &&
      (input.area?.allowIndexing ?? true),
    qualityScore,
    contentReviewed:
      input.service.contentReviewed &&
      (input.area?.contentReviewed ?? input.city.contentReviewed),
    localDataVerified:
      (input.area?.localDataVerified ?? input.city.localDataVerified) &&
      input.service.contentReviewed,
    hasUniqueMetadata: placeInTitle && placeInMeta,
    hasUniqueContent: placeInH1 && hasLocalContext && faqCount >= 5,
    hasValidCanonical:
      Boolean(input.canonicalUrl) &&
      input.canonicalUrl.startsWith("http") &&
      input.canonicalUrl.includes(pathStem),
    hasInternalLinks: internalLinkCount >= 6,
    hasValidSchema: hasSchema,
    wordCount,
    minimumRequiredWordCount: minWords,
    similarityScore,
    title: input.title,
    metaDescription: input.metaDescription,
    h1: input.h1,
    introduction: `${place} ${input.service.name}`,
    searchIntent:
      input.searchIntent ??
      `${input.service.name} installation in ${place}`,
    canonicalUrl: input.canonicalUrl,
    placeholders: [],
    pageType,
  });
}
