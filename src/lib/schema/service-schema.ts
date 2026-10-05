import { BUSINESS_CONFIG } from "@/config/business";
import { getMainService } from "@/config/main-services";
import { getServiceBySlug } from "@/lib/data/repositories";
import type { FAQItem } from "@/types/content";
import type { Area, Location } from "@/types/location";
import type { Service } from "@/types/service";

/**
 * Honest Service JSON-LD.
 * Review / AggregateRating / price intentionally omitted until verified data exists.
 */
function placeAreaServed(location?: Location, area?: Area) {
  if (area) {
    return {
      "@type": "Place",
      name: location ? `${area.name}, ${location.name}` : area.name,
      containedInPlace: { "@type": "State", name: "Tamil Nadu" },
    };
  }
  if (location) {
    return {
      "@type": "City",
      name: location.name,
      containedInPlace: { "@type": "State", name: "Tamil Nadu" },
    };
  }
  return undefined;
}

export function serviceSchema(
  service: Service,
  canonicalUrl: string,
  context: { location?: Location; area?: Area } = {},
) {
  const pillar = getMainService(service.slug);
  const placeName = context.area?.name ?? context.location?.name;
  const areaServed = placeAreaServed(context.location, context.area);

  const variants = (pillar?.related ?? [])
    .map((slug) => getServiceBySlug(slug))
    .filter((item): item is Service => Boolean(item) && item?.publicationStatus === "published");

  const keywords = Array.from(
    new Set([...(pillar?.keywords ?? []), ...service.primaryKeywords]),
  ).slice(0, 12);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: placeName ? `${service.name} in ${placeName}` : service.name,
    description: service.summary,
    url: canonicalUrl,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: BUSINESS_CONFIG.name,
      url: BUSINESS_CONFIG.websiteUrl,
      telephone: BUSINESS_CONFIG.phone.raw,
      areaServed: {
        "@type": "State",
        name: "Tamil Nadu",
      },
    },
    areaServed: areaServed ?? {
      "@type": "State",
      name: "Tamil Nadu",
    },
    serviceType: service.name,
    ...(keywords.length ? { keywords: keywords.join(", ") } : {}),
    ...(pillar ? { category: pillar.label } : {}),
    ...(variants.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${service.name} options`,
            itemListElement: [service, ...variants].map((item) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: item.name },
            })),
          },
        }
      : {}),
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
      ...serviceSchema(service, url, { location, area }),
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
