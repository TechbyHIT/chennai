import type { Metadata } from "next";
import { BUSINESS_CONFIG } from "@/config/business";
import { isPageIndexable } from "@/lib/seo/is-page-indexable";
import { generateRobots } from "@/lib/seo/generate-robots";
import type { PageRecord } from "@/types/page";

export function generatePageMetadata(page: PageRecord): Metadata {
  const indexable = isPageIndexable(page);

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: page.canonicalUrl,
    },
    robots: generateRobots(indexable),
    openGraph: {
      title: page.openGraphTitle,
      description: page.openGraphDescription,
      url: page.canonicalUrl,
      siteName: BUSINESS_CONFIG.name,
      type: "website",
      images: [
        {
          url: page.openGraphImage,
          width: 1200,
          height: 630,
          alt: page.openGraphImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.twitterTitle,
      description: page.twitterDescription,
      images: [page.openGraphImage],
    },
  };
}
