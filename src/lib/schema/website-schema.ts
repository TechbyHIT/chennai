import { BUSINESS_CONFIG } from "@/config/business";
import { SITE_CONFIG } from "@/config/site";

/**
 * WebSite entity with SearchAction so Google can surface a sitelinks searchbox
 * and AI assistants can discover the on-site search endpoint.
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    name: BUSINESS_CONFIG.name,
    alternateName: "Glory Invisible Grills Tamil Nadu",
    url: `${SITE_CONFIG.url}/`,
    description: SITE_CONFIG.description,
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/search/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Speakable markup helps voice assistants read the right parts of a page aloud.
 * CSS selectors must match real elements rendered on the page.
 */
export function speakableSchema(pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: pageUrl,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]"],
    },
  };
}

/** CollectionPage for hub/listing pages that enumerate child entities. */
export function collectionPageSchema(input: {
  name: string;
  description: string;
  url: string;
  items: Array<{ name: string; url: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: input.url,
    isPartOf: { "@id": `${SITE_CONFIG.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: input.items.length,
      itemListElement: input.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

/** HowTo for installation/process explainers. Steps must reflect real process. */
export function howToSchema(input: {
  name: string;
  description: string;
  url: string;
  steps: Array<{ name: string; text: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    url: input.url,
    step: input.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
