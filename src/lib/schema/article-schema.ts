import { BUSINESS_CONFIG } from "@/config/business";
import type { BlogPost, Guide } from "@/types/content";

export function articleSchema(
  item: Guide | BlogPost,
  url: string,
  type: "Article" | "BlogPosting" = "Article",
) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    headline: item.title,
    description: item.summary,
    url,
    author: {
      "@type": "Organization",
      name: item.author,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${BUSINESS_CONFIG.websiteUrl}${BUSINESS_CONFIG.logo}`,
      },
    },
    dateModified: item.updatedAt,
  };
}
