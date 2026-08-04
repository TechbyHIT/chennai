/**
 * INDEX IF gate — pages may be indexed only when every check passes.
 * Unique Title ≥ 90% means similarityScore ≤ 0.10 (uniqueness ≥ 0.90).
 */
export const INDEX_IF_CONFIG = {
  /** Title / content uniqueness floor (1 - similarityScore). */
  minUniqueness: 0.9,
  /** Equivalent max Jaccard-style similarity. */
  maxSimilarity: 0.1,
  minQualityScore: 80,
  /** Absolute floor even when pageType minimum is lower. */
  absoluteMinWords: 700,
  requirePublished: true,
  requireContentReviewed: true,
  requireLocalDataVerified: true,
  requireUniqueMetadata: true,
  requireUniqueContent: true,
  requireValidCanonical: true,
  requireInternalLinks: true,
  requireValidSchema: true,
  requireClearSearchIntent: true,
  requireStrongEeat: true,
  requireFastPerformance: true,
  requireNoThinContent: true,
} as const;

export const INDEX_IF_CHECKLIST_LABELS = [
  "Unique Title ≥ 90%",
  "Unique Meta Description",
  "Unique H1",
  "Unique Intro",
  "Unique Local Context",
  "Unique FAQs",
  "Unique Images",
  "Unique Internal Links",
  "Unique Schema",
  "Minimum Helpful Content Threshold",
  "Clear Search Intent",
  "Strong EEAT Signals",
  "Fast Performance",
  "Proper Canonical",
  "No Thin Content",
] as const;
