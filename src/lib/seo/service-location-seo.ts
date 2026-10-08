import { BUSINESS_CONFIG } from "@/config/business";
import { isChennaiBeltTown } from "@/config/chennai-region";
import { buildLandingKeywords, pickSeededHeadTerm } from "@/data/keyword-clusters";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Area, Location } from "@/types/location";
import type { Service } from "@/types/service";

/** SERP title. The layout template appends " | Glory Grills" (15 characters). */
function landingMetaTitle(serviceName: string, place: string) {
  const withVisit = `${serviceName} in ${place} | Free Site Visit`;
  if (withVisit.length + 15 <= 78) return withVisit;
  const plain = `${serviceName} in ${place}`;
  if (plain.length + 15 <= 78) return plain;
  return plain.slice(0, 62).trim();
}

/**
 * Snippet that answers the query in the first words. Belt towns keep the
 * "near Chennai" phrase; other cities must not mention Chennai.
 */
function landingDescription(serviceName: string, place: string, beltTown: boolean) {
  const where = beltTown ? `${place}, near Chennai,` : place;
  const phone = BUSINESS_CONFIG.phone.display;
  const primary = `${serviceName} in ${where} for apartments and gated communities. Free measurement and a written quote. Call ${phone}.`;
  if (primary.length <= 160) return primary;
  const compact = `${serviceName} in ${where.replace(/,$/, "")}. Free measurement and a written quote. Call ${phone}.`;
  if (compact.length <= 160) return compact;
  return compact.slice(0, 157).trimEnd() + ".";
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
  // Title and H1 stay on the service name so the page can rank for
  // "{service} in {city}". Alias head terms stay in the keyword list only.
  const head = pickSeededHeadTerm(service.slug, seedKey);
  const title = `${service.name} in ${city.name} | ${BUSINESS_CONFIG.name}`;
  // No brand here: the site title template already appends "| Glory Grills".
  const metaTitle = landingMetaTitle(service.name, city.name);
  const beltTown = isChennaiBeltTown(city.slug);
  const metaDescription = landingDescription(service.name, city.name, beltTown);
  const h1 = `${service.name} in ${city.name}`;
  const subtitle = beltTown
    ? `${service.name} installation for apartments and gated communities in ${city.name}, near Chennai. Free measurement, written quote.`
    : `${service.name} installation for apartments and gated communities in ${city.name}, Tamil Nadu. Free measurement, written quote.`;
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
  const place = `${area.name}, ${city.name}`;
  const title = `${service.name} in ${place} | ${BUSINESS_CONFIG.name}`;
  const metaTitle = landingMetaTitle(service.name, place);
  const beltTown = isChennaiBeltTown(city.slug);
  const metaDescription = landingDescription(service.name, place, beltTown);
  const h1 = `${service.name} in ${area.name}, ${city.name}`;
  const subtitle = beltTown
    ? `${service.name} installation for apartments and gated communities in ${area.name}, ${city.name}, near Chennai.`
    : `${service.name} installation for apartments and gated communities in ${area.name}, ${city.name}.`;
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
