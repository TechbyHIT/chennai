import { BUSINESS_CONFIG } from "@/config/business";
import { evaluateLandingIndexIf } from "@/lib/seo/index-if-gate";
import { generateRobots } from "@/lib/seo/generate-robots";
import type { Area, Location } from "@/types/location";
import type { Service } from "@/types/service";
import type { Metadata } from "next";

type LandingSeoInput = {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  h1: string;
  path: string;
  openGraphImage?: string;
  keywords?: string[];
  service?: Service;
  city?: Location;
  area?: Area;
};

/**
 * Full metadata bundle for programmatic service×city / service×area landings.
 * Robots index only when INDEX IF checklist passes.
 */
export function generateLandingMetadata(seo: LandingSeoInput): Metadata {
  const image = seo.openGraphImage ?? BUSINESS_CONFIG.defaultOpenGraphImage;

  const indexGate =
    seo.service && seo.city
      ? evaluateLandingIndexIf({
          service: seo.service,
          city: seo.city,
          area: seo.area,
          title: seo.metaTitle,
          metaDescription: seo.metaDescription,
          h1: seo.h1,
          path: seo.path,
          canonicalUrl: seo.canonicalUrl,
        })
      : { indexable: false, uniqueness: 0, checks: {} as never, failed: ["uniqueTitle"] as never };

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    ...(seo.keywords && seo.keywords.length > 0
      ? { keywords: seo.keywords }
      : {}),
    alternates: { canonical: seo.canonicalUrl },
    robots: generateRobots(indexGate.indexable),
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: seo.canonicalUrl,
      siteName: BUSINESS_CONFIG.name,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: seo.h1,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: [image],
    },
    other: {
      "x-index-if-uniqueness": String(Math.round(indexGate.uniqueness * 100)),
      ...(indexGate.failed.length
        ? { "x-index-if-failed": indexGate.failed.join(",") }
        : {}),
    },
  };
}
