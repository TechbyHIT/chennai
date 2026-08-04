export const ROUTE_PATTERNS = {
  home: "/",
  about: "/about/",
  contact: "/contact/",
  services: "/services/",
  service: "/services/[serviceSlug]/",
  locations: "/locations/",
  location: "/locations/[locationSlug]/",
  area: "/locations/[locationSlug]/[areaSlug]/",
  serviceLocation: "/[service]-in-[city]/",
  serviceArea: "/[service]/[state]/[city]/[area]/",
  legacyServiceLocation: "/[city]/[service]/",
  legacyServiceArea: "/[city]/[area]/[service]/",
  solutions: "/solutions/",
  solution: "/solutions/[problemSlug]/",
  propertyTypes: "/property-types/",
  propertyTypeService: "/property-types/[propertyTypeSlug]/[serviceSlug]/",
  guides: "/guides/",
  guide: "/guides/[guideSlug]/",
  blog: "/blog/",
  blogPost: "/blog/[postSlug]/",
  gallery: "/gallery/",
  projects: "/projects/",
  testimonials: "/testimonials/",
  faq: "/faq/",
  pricingGuide: "/pricing-guide/",
  materialsGuide: "/materials-guide/",
  installationProcess: "/installation-process/",
  safetyGuide: "/safety-guide/",
  privacy: "/privacy-policy/",
  terms: "/terms-and-conditions/",
  disclaimer: "/disclaimer/",
  thankYou: "/thank-you/",
  admin: "/admin/",
} as const;

export function buildServicePath(serviceSlug: string): string {
  return `/services/${serviceSlug}/`;
}

export function buildLocationPath(locationSlug: string): string {
  return `/locations/${locationSlug}/`;
}

export function buildAreaPath(locationSlug: string, areaSlug: string): string {
  return `/locations/${locationSlug}/${areaSlug}/`;
}

/** Preferred: /{service}-in-{city}/ */
export function buildServiceLocationPath(
  locationSlug: string,
  serviceSlug: string,
): string {
  return `/${serviceSlug}-in-${locationSlug}/`;
}

/** Preferred: /{service}/tamil-nadu/{city}/{area}/ */
export function buildServiceAreaPath(
  locationSlug: string,
  areaSlug: string,
  serviceSlug: string,
): string {
  return `/${serviceSlug}/tamil-nadu/${locationSlug}/${areaSlug}/`;
}

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

export function buildSolutionPath(problemSlug: string): string {
  return `/solutions/${problemSlug}/`;
}

export function buildPropertyTypeServicePath(
  propertyTypeSlug: string,
  serviceSlug: string,
): string {
  return `/property-types/${propertyTypeSlug}/${serviceSlug}/`;
}

export function buildGuidePath(guideSlug: string): string {
  return `/guides/${guideSlug}/`;
}

export function buildBlogPath(postSlug: string): string {
  return `/blog/${postSlug}/`;
}
