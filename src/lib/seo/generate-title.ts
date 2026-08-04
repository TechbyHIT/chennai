import { SEO_CONFIG } from "@/config/seo";
import type { PageType } from "@/types/page";

type TitleInput = {
  pageType: PageType;
  serviceName?: string;
  locationName?: string;
  areaName?: string;
  problemName?: string;
  propertyTypeName?: string;
  guideTitle?: string;
  postTitle?: string;
  patternIndex?: number;
};

export function generateTitle(input: TitleInput): string {
  const patterns =
    SEO_CONFIG.titlePatterns[
      input.pageType as keyof typeof SEO_CONFIG.titlePatterns
    ] ?? ["{service} in {location}"];

  const pattern = patterns[input.patternIndex ?? 0] ?? patterns[0] ?? "{service}";

  return pattern
    .replaceAll("{service}", input.serviceName ?? "Invisible Grills")
    .replaceAll("{location}", input.locationName ?? "Tamil Nadu")
    .replaceAll("{city}", input.locationName ?? "Tamil Nadu")
    .replaceAll("{area}", input.areaName ?? "")
    .replaceAll("{problem}", input.problemName ?? "Safety")
    .replaceAll("{guideTitle}", input.guideTitle ?? "Guide")
    .replaceAll("{postTitle}", input.postTitle ?? "Article")
    .replace(/\s+\|/g, " |")
    .replace(/\s{2,}/g, " ")
    .trim();
}
