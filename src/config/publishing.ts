export const PUBLISHING_CONFIG = {
  defaultBatchSize: 100,
  maxBatchSize: 500,
  phases: {
    1: [
      "home",
      "core",
      "service",
      "location",
      "service-location",
      "guide",
    ] as const,
    2: ["area", "service-area", "solution", "property-type-service"] as const,
    3: ["blog", "guide", "service-area", "solution"] as const,
  },
  qualityThreshold: 80,
  similarityThreshold: 0.7,
  requireHumanReview: true,
} as const;
