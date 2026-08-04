import { BUSINESS_CONFIG } from "@/config/business";
import type { PageRecord } from "@/types/page";

export function webPageSchema(page: PageRecord) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.metaDescription,
    url: page.canonicalUrl,
    isPartOf: {
      "@type": "WebSite",
      name: BUSINESS_CONFIG.name,
      url: BUSINESS_CONFIG.websiteUrl,
    },
  };
}
