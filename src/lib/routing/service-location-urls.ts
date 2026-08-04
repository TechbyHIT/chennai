import { toSlug } from "@/lib/utils/slug";

export const STATE_SLUG = "tamil-nadu";
export const STATE_NAME = "Tamil Nadu";

/** Preferred city-service URL: /{service}-in-{city}/ */
export function buildServiceInCityPath(serviceSlug: string, citySlug: string): string {
  return `/${serviceSlug}-in-${citySlug}/`;
}

/** Preferred area-service URL: /{service}/{state}/{city}/{area}/ */
export function buildServiceStateCityAreaPath(
  serviceSlug: string,
  citySlug: string,
  areaSlug: string,
  stateSlug: string = STATE_SLUG,
): string {
  return `/${serviceSlug}/${stateSlug}/${citySlug}/${areaSlug}/`;
}

export function parseServiceInCitySlug(
  compoundSlug: string,
): { serviceSlug: string; citySlug: string } | null {
  const marker = "-in-";
  const index = compoundSlug.lastIndexOf(marker);
  if (index <= 0) return null;

  const serviceSlug = compoundSlug.slice(0, index);
  const citySlug = compoundSlug.slice(index + marker.length);
  if (!serviceSlug || !citySlug) return null;
  if (serviceSlug.includes("/") || citySlug.includes("/")) return null;
  return { serviceSlug, citySlug };
}

export function isServiceInCitySlug(compoundSlug: string): boolean {
  return parseServiceInCitySlug(compoundSlug) !== null;
}

export function toStateSlug(stateName: string): string {
  return toSlug(stateName);
}

/** Legacy URLs kept for redirects. */
export function buildLegacyServiceLocationPath(
  locationSlug: string,
  serviceSlug: string,
): string {
  return `/${locationSlug}/${serviceSlug}/`;
}

export function buildLegacyServiceAreaPath(
  locationSlug: string,
  areaSlug: string,
  serviceSlug: string,
): string {
  return `/${locationSlug}/${areaSlug}/${serviceSlug}/`;
}
