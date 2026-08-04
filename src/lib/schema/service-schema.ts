import { BUSINESS_CONFIG } from "@/config/business";
import type { FAQItem } from "@/types/content";
import type { Area, Location } from "@/types/location";
import type { Service } from "@/types/service";

/**
 * Honest Service JSON-LD.
 * Review / AggregateRating intentionally omitted until verified reviews exist.
 */
export function serviceSchema(service: Service, canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    url: canonicalUrl,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: BUSINESS_CONFIG.name,
      telephone: BUSINESS_CONFIG.phone.raw,
      areaServed: {
        "@type": "State",
        name: "Tamil Nadu",
      },
    },
    areaServed: {
      "@type": "State",
      name: "Tamil Nadu",
    },
    serviceType: service.name,
  };
}

export function serviceJsonLd(input: {
  service: Service;
  path: string;
  location?: Location;
  area?: Area;
  faqs?: FAQItem[];
}) {
  const { service, path, location, area, faqs } = input;
  const place = area?.name ?? location?.name;
  const url = `${BUSINESS_CONFIG.websiteUrl.replace(/\/$/, "")}${path}`;

  const graph: Record<string, unknown>[] = [
    {
      ...serviceSchema(service, url),
      name: place ? `${service.name} in ${place}` : service.name,
    },
    {
      "@type": "WebPage",
      name: place ? `${service.name} in ${place}` : service.name,
      url,
      isPartOf: {
        "@type": "WebSite",
        name: BUSINESS_CONFIG.name,
        url: BUSINESS_CONFIG.websiteUrl,
      },
    },
  ];

  if (faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  if (service.heroImage) {
    graph.push({
      "@type": "ImageObject",
      contentUrl: `${BUSINESS_CONFIG.websiteUrl.replace(/\/$/, "")}${service.heroImage}`,
      caption: `${service.name} installation reference`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
