import { BUSINESS_CONFIG } from "@/config/business";
import { isChennaiBeltTown } from "@/config/chennai-region";
import {
  buildLandingKeywords,
  formatHeadTermForTitle,
  pickSeededHeadTerm,
} from "@/data/keyword-clusters";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Area, Location } from "@/types/location";
import type { Service } from "@/types/service";

function pricingHrefNote(head: string, place: string) {
  return `Compare ${head} price, cost and installation charges in ${place} after a free measurement visit — rates depend on openings, material grade and access.`;
}

/**
 * Every service carries apartment intent — completed, ready-to-move and
 * under-construction — because modifier rotation alone would only cover a
 * subset of pages. Sports nets use apartment-complex phrasing (play areas,
 * terrace cricket) instead of flat-level phrasing.
 */
function prependApartmentStatusPhrases(
  keywords: string[],
  head: string,
  serviceName: string,
  place: string,
  serviceSlug: string,
) {
  const phrases =
    serviceSlug === "sports-nets"
      ? [
          `${head} for apartment complex in ${place}`,
          `${serviceName} for gated community in ${place}`,
        ]
      : [
          `${head} for apartments in ${place}`,
          `${serviceName} for ready to move flats in ${place}`,
          `${head} for gated community in ${place}`,
        ];
  for (const phrase of phrases) {
    if (!keywords.includes(phrase)) keywords.unshift(phrase);
  }
}

export function buildServiceCitySeo(service: Service, city: Location) {
  const path = `/${service.slug}-in-${city.slug}/`;
  const seedKey = `${service.slug}|${city.slug}`;
  const head = pickSeededHeadTerm(service.slug, seedKey);
  const headTitle = formatHeadTermForTitle(head);
  const title = `${headTitle} in ${city.name} | ${BUSINESS_CONFIG.name}`;
  // No brand here: the site title template already appends "| Glory Grills".
  const metaTitle = `${headTitle} in ${city.name} | Free Site Visit`;
  const beltTown = isChennaiBeltTown(city.slug);
  const metaDescription = `Looking for ${head} in ${city.name}${beltTown ? " near Chennai" : ""}? ${pricingHrefNote(head, city.name)} Call ${BUSINESS_CONFIG.phone.display}.`;
  const h1 = `${headTitle} in ${city.name}`;
  const subtitle = beltTown
    ? `Measured ${head} installation for apartments, villas and homes in ${city.name}, within our Chennai service region.`
    : `Measured ${head} installation for apartments, villas and homes in ${city.name}, Tamil Nadu.`;
  const keywords = buildLandingKeywords({
    serviceSlug: service.slug,
    serviceName: service.name,
    placeLabel: city.name,
    cityName: city.name,
    seedKey,
    limit: beltTown ? 36 : 40,
  });
  prependApartmentStatusPhrases(keywords, head, service.name, city.name, service.slug);
  if (beltTown) {
    // Belt towns also target "near Chennai" / "Chennai" phrasing.
    keywords.unshift(
      `${head} ${city.name} Chennai`,
      `${head} near Chennai`,
      `${service.name} in ${city.name} near Chennai`,
      `${head} ${city.name} Tamil Nadu`,
    );
  }

  return {
    path,
    slug: `${service.slug}-in-${city.slug}`,
    title,
    metaTitle,
    metaDescription,
    h1,
    subtitle,
    canonicalUrl: generateCanonical(path),
    keywords,
  };
}

export function buildServiceAreaSeo(
  service: Service,
  city: Location,
  area: Area,
) {
  const stateSlug = "tamil-nadu";
  const path = `/${service.slug}/${stateSlug}/${city.slug}/${area.slug}/`;
  const seedKey = `${service.slug}|${city.slug}|${area.slug}`;
  const head = pickSeededHeadTerm(service.slug, seedKey);
  const headTitle = formatHeadTermForTitle(head);
  const place = `${area.name}, ${city.name}`;
  const title = `${headTitle} in ${place} | ${BUSINESS_CONFIG.name}`;
  const metaTitle = `${headTitle} in ${place} | Free Site Visit`;
  const metaDescription = `Looking for ${head} in ${area.name}, ${city.name}, Tamil Nadu? ${pricingHrefNote(head, area.name)} Call ${BUSINESS_CONFIG.phone.display}.`;
  const h1 = `${headTitle} in ${area.name}, ${city.name}`;
  const subtitle = `Measured ${head} installation for apartments and homes in ${area.name}, ${city.name}.`;
  const keywords = buildLandingKeywords({
    serviceSlug: service.slug,
    serviceName: service.name,
    placeLabel: area.name,
    cityName: city.name,
    seedKey,
    limit: 40,
  });
  prependApartmentStatusPhrases(keywords, head, service.name, area.name, service.slug);

  return {
    path,
    slug: `${service.slug}-${stateSlug}-${city.slug}-${area.slug}`,
    title,
    metaTitle,
    metaDescription,
    h1,
    subtitle,
    canonicalUrl: generateCanonical(path),
    keywords,
  };
}
