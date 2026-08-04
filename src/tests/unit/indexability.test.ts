import { describe, expect, it } from "vitest";
import {
  evaluateIndexIf,
  evaluateLandingIndexIf,
} from "@/lib/seo/index-if-gate";
import { isPageIndexable } from "@/lib/seo/is-page-indexable";
import { getLocationBySlug, getServiceBySlug } from "@/lib/data/file-repositories";
import { buildServiceCitySeo } from "@/lib/seo/service-location-seo";

const goodPage = {
  publicationStatus: "published" as const,
  allowIndexing: true,
  qualityScore: 90,
  contentReviewed: true,
  localDataVerified: true,
  hasUniqueMetadata: true,
  hasUniqueContent: true,
  hasValidCanonical: true,
  hasInternalLinks: true,
  hasValidSchema: true,
  wordCount: 1200,
  minimumRequiredWordCount: 1000,
  similarityScore: 0.08,
  title: "Invisible Grills in Coimbatore | Glory Invisible Grills",
  metaDescription:
    "Looking for invisible grills in Coimbatore? Book a measurement visit for apartments and homes. Call +91 88707 77330.",
  h1: "Invisible Grills in Coimbatore",
  introduction: "Coimbatore homes need measured balcony safety planning.",
  searchIntent: "invisible grills installation in Coimbatore",
  canonicalUrl: "https://gloryinvisiblegrills.in/invisible-grills-in-coimbatore/",
  placeholders: [] as string[],
};

describe("INDEX IF gate", () => {
  it("indexes when every checklist item passes (unique title ≥90%)", () => {
    const result = evaluateIndexIf(goodPage);
    expect(result.uniqueness).toBeGreaterThanOrEqual(0.9);
    expect(result.failed).toEqual([]);
    expect(result.indexable).toBe(true);
    expect(isPageIndexable(goodPage)).toBe(true);
  });

  it("rejects draft pages", () => {
    expect(
      isPageIndexable({ ...goodPage, publicationStatus: "draft" }),
    ).toBe(false);
  });

  it("rejects titles below 90% uniqueness (similarity > 0.10)", () => {
    const result = evaluateIndexIf({ ...goodPage, similarityScore: 0.2 });
    expect(result.checks.uniqueTitle).toBe(false);
    expect(result.indexable).toBe(false);
  });

  it("rejects thin content under word threshold", () => {
    expect(
      isPageIndexable({
        ...goodPage,
        wordCount: 200,
        minimumRequiredWordCount: 1000,
      }),
    ).toBe(false);
  });

  it("passes landing INDEX IF for a real Coimbatore city page", () => {
    const service = getServiceBySlug("invisible-grills");
    const city = getLocationBySlug("coimbatore");
    expect(service && city).toBeTruthy();
    if (!service || !city) return;
    const seo = buildServiceCitySeo(service, city);
    const result = evaluateLandingIndexIf({
      service,
      city,
      title: seo.metaTitle,
      metaDescription: seo.metaDescription,
      h1: seo.h1,
      path: seo.path,
      canonicalUrl: seo.canonicalUrl,
    });
    expect(result.indexable).toBe(true);
    expect(result.uniqueness).toBeGreaterThanOrEqual(0.9);
  });
});
