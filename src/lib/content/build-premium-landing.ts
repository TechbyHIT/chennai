import { PRICING_STATEMENT } from "@/data/content-modules";
import {
  buildGuidePath,
  buildServicePath,
  buildSolutionPath,
} from "@/config/routes";
import {
  composeAuthoritySections,
  composeUniqueFaqs,
  type AuthoritySection,
} from "@/lib/content/compose-authority-sections";
import {
  composeEncyclopediaArticle,
  type EncyclopediaArticle,
} from "@/lib/content/compose-encyclopedia";
import { getAllIntentKeywordLinks } from "@/data/intent-keyword-expansion";
import { composeClusterSearchPhrases, expandPlaceKeywordPhrases } from "@/data/keyword-clusters";
import { composeNearMeVariants } from "@/data/near-me-modifiers";
import { composeLocalLandingCopy } from "@/lib/content/compose-local-landing-copy";
import {
  composeLongformSeo,
  type LongformArticle,
} from "@/lib/content/compose-longform-seo";
import {
  composeSeoScrollContent,
  type SeoScrollBlock,
} from "@/lib/content/compose-seo-scroll-content";
import { composeUniqueIntro } from "@/lib/content/compose-unique-intro";
import {
  getAreas,
  getGuides,
  getLocations,
  getProblems,
  getServices,
} from "@/lib/data/repositories";
import {
  buildServiceInCityPath,
  buildServiceStateCityAreaPath,
} from "@/lib/routing/service-location-urls";
import type { FAQItem } from "@/types/content";
import type { Area, Location } from "@/types/location";
import type { Service } from "@/types/service";
import type { BreadcrumbItem, InternalLink } from "@/types/seo";

export type PremiumLandingModel = {
  service: Service;
  city: Location;
  area?: Area;
  placeLabel: string;
  placeLabelFull: string;
  seo: {
    title: string;
    metaTitle: string;
    metaDescription: string;
    h1: string;
    subtitle: string;
    path: string;
    slug: string;
    canonicalUrl: string;
    keywords?: string[];
  };
  introduction: string;
  localProblems: string[];
  whoNeedsThis: string[];
  benefits: string[];
  features: Array<{ label: string; value: string }>;
  applications: string[];
  materials: string[];
  installationSteps: Array<{ step: number; title: string; body: string }>;
  whyChooseUs: string[];
  authoritySections: AuthoritySection[];
  seoScrollBlocks: SeoScrollBlock[];
  encyclopedia: EncyclopediaArticle;
  longform: LongformArticle;
  localCopy: ReturnType<typeof composeLocalLandingCopy>;
  serviceAreas: Array<{ name: string; href: string }>;
  nearbyAreas: Array<{ name: string; href: string }>;
  relatedCities: Array<{ name: string; href: string }>;
  relatedServices: Array<{ name: string; href: string }>;
  relatedGuides: Array<{ name: string; href: string }>;
  relatedSolutions: Array<{ name: string; href: string }>;
  searchVariants: Array<{ name: string; href: string }>;
  pricingFactors: string[];
  pricingStatement: string;
  faqs: FAQItem[];
  breadcrumbs: BreadcrumbItem[];
  internalLinks: InternalLink[];
  galleryImages: string[];
  galleryAlts: string[];
  reviewsAvailable: boolean;
  trustPlaceholders: string[];
  jumpNav: Array<{ id: string; label: string; number: number }>;
};

export function buildPremiumLanding(
  service: Service,
  city: Location,
  seo: PremiumLandingModel["seo"],
  area?: Area,
): PremiumLandingModel {
  const placeLabel = area ? area.name : city.name;
  const placeLabelFull = area
    ? `${area.name}, ${city.name}, Tamil Nadu`
    : `${city.name}, Tamil Nadu`;

  const nearbyAreas = getAreas({
    publishedOnly: true,
    parentId: city.id,
    scaledLimit: 64,
  });

  const relatedCities = getLocations({ publishedOnly: true, servedOnly: true }).filter(
    (item) => item.id !== city.id,
  );

  const relatedServices = getServices({ publishedOnly: true }).filter(
    (item) => item.id !== service.id,
  );

  const serviceAreas = nearbyAreas.map((item) => ({
    name: item.name,
    href: buildServiceStateCityAreaPath(service.slug, city.slug, item.slug),
  }));

  const nearbyForSidebar = nearbyAreas
    .filter((item) => item.id !== area?.id)
    .slice(0, 8)
    .map((item) => ({
      name: item.name,
      href: buildServiceStateCityAreaPath(service.slug, city.slug, item.slug),
    }));

  const localCopy = composeLocalLandingCopy({
    service,
    city,
    area,
    nearbyNames: nearbyForSidebar.map((item) => item.name),
  });

  const intentLinks = getAllIntentKeywordLinks().filter((item) => {
    const hay = `${item.label} ${item.href}`.toLowerCase();
    return (
      hay.includes(service.slug.replace(/-/g, " ")) ||
      hay.includes(service.shortName.toLowerCase()) ||
      (service.slug.includes("bird") && hay.includes("bird")) ||
      (service.slug.includes("pigeon") && hay.includes("bird")) ||
      (service.slug.includes("balcony") && hay.includes("balcony")) ||
      (service.slug.includes("window") && hay.includes("window")) ||
      (service.slug.includes("safety") && hay.includes("safety")) ||
      (service.slug.includes("pet") && (hay.includes("pet") || hay.includes("dog") || hay.includes("cat"))) ||
      (service.slug.includes("child") && (hay.includes("child") || hay.includes("family"))) ||
      (service.slug.includes("monkey") && hay.includes("bird")) ||
      (service.slug.includes("building") && (hay.includes("construction") || hay.includes("commercial") || hay.includes("terrace"))) ||
      (service.slug.includes("cloth") && hay.includes("utility"))
    );
  });

  const seedKey = `${service.slug}|${city.slug}|${area?.slug ?? ""}`;
  const cityPath = buildServiceInCityPath(service.slug, city.slug);

  const nearMeVariants = composeNearMeVariants({
    serviceName: service.name,
    serviceShortName: service.shortName,
    cityName: city.name,
    placeLabel,
    placePath: seo.path,
    cityPath,
    seedKey,
  });

  const matrixVariants = composeClusterSearchPhrases({
    serviceSlug: service.slug,
    placeLabel,
    cityName: city.name,
    placePath: seo.path,
    cityPath,
    seedKey,
    limit: 24,
  });

  const placeKeywordPhrases = expandPlaceKeywordPhrases({
    serviceSlug: service.slug,
    placeLabel,
    cityName: city.name,
    seedKey,
    limit: 36,
  });

  const searchVariants = [
    {
      name: `${service.name.toLowerCase()} in ${placeLabel}`,
      href: seo.path,
    },
    {
      name: `${service.name.toLowerCase()} installation ${placeLabel}`,
      href: seo.path,
    },
    {
      name: `${service.shortName.toLowerCase()} near me`,
      href: cityPath,
    },
    {
      name: `best ${service.name.toLowerCase()} in ${city.name}`,
      href: cityPath,
    },
    {
      name: `${service.name.toLowerCase()} cost in ${placeLabel}`,
      href: "/pricing-guide/",
    },
    {
      name: `${service.name.toLowerCase()} price in ${placeLabel}`,
      href: "/pricing-guide/",
    },
    {
      name: `${service.shortName.toLowerCase()} ${city.name}`,
      href: cityPath,
    },
    ...matrixVariants,
    ...placeKeywordPhrases.map((name) => {
      const lower = name.toLowerCase();
      const pricing =
        lower.includes("price") ||
        lower.includes("cost") ||
        lower.includes("rate") ||
        lower.includes("charges") ||
        lower.includes("quote") ||
        lower.includes("estimate");
      return {
        name,
        href: pricing ? "/pricing-guide/" : seo.path,
      };
    }),
    ...nearMeVariants.map((item) => ({
      name: item.name,
      href: item.href,
    })),
    ...intentLinks.slice(0, 24).map((item) => ({
      name: item.label,
      href: item.href,
    })),
  ];

  // Deduplicate search variant labels while keeping first href.
  const seenVariants = new Set<string>();
  const uniqueSearchVariants = searchVariants.filter((item) => {
    const key = item.name.toLowerCase();
    if (seenVariants.has(key)) return false;
    seenVariants.add(key);
    return true;
  });

  const breadcrumbs: BreadcrumbItem[] = area
    ? [
        { name: "Home", href: "/" },
        { name: service.name, href: buildServicePath(service.slug) },
        { name: placeLabel, href: seo.path },
      ]
    : [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services/" },
        { name: service.name, href: buildServicePath(service.slug) },
        { name: city.name, href: seo.path },
      ];

  const relatedGuides = getGuides({ publishedOnly: true }).map((guide) => ({
    name: guide.title,
    href: buildGuidePath(guide.slug),
  }));

  const relatedSolutions = getProblems({ publishedOnly: true }).map((problem) => ({
    name: problem.name,
    href: buildSolutionPath(problem.slug),
  }));

  const internalLinks: InternalLink[] = [
    { href: "/", label: "Home" },
    { href: buildServicePath(service.slug), label: `${service.name} overview` },
    { href: `/locations/${city.slug}/`, label: `${city.name} coverage hub` },
    { href: "/locations/", label: "All Tamil Nadu locations" },
    { href: "/services/", label: "All services" },
    { href: "/pricing-guide/", label: "Pricing guide" },
    { href: "/installation-process/", label: "Installation process" },
    { href: "/materials-guide/", label: "Materials guide" },
    { href: "/safety-guide/", label: "Safety guide" },
    { href: "/faq/", label: "FAQ" },
    { href: "/gallery/", label: "Gallery" },
    { href: "/contact/", label: "Contact / free quote" },
    { href: "/guides/", label: "Guides hub" },
    { href: "/solutions/", label: "Solutions hub" },
    { href: "/property-types/", label: "Property types" },
    ...relatedServices.map((item) => ({
      href: area
        ? buildServiceStateCityAreaPath(item.slug, city.slug, area.slug)
        : buildServiceInCityPath(item.slug, city.slug),
      label: `${item.name} in ${placeLabel}`,
    })),
    ...relatedServices.map((item) => ({
      href: buildServiceInCityPath(item.slug, city.slug),
      label: `${item.name} in ${city.name}`,
    })),
    ...serviceAreas.slice(0, 48).map((item) => ({
      href: item.href,
      label: `${service.shortName} in ${item.name}`,
    })),
    ...relatedCities.map((item) => ({
      href: buildServiceInCityPath(service.slug, item.slug),
      label: `${service.shortName} in ${item.name}`,
    })),
    ...relatedGuides.map((item) => ({ href: item.href, label: item.name })),
    ...relatedSolutions.map((item) => ({ href: item.href, label: item.name })),
  ];

  const uniqueLinkMap = new Map<string, InternalLink>();
  for (const link of internalLinks) {
    if (link.href === seo.path) continue;
    uniqueLinkMap.set(link.href, link);
  }

  const trustPlaceholders = [
    "[YEARS_OF_EXPERIENCE]",
    "[INSTALLATION_COUNT]",
    "[CERTIFICATION_DETAILS]",
  ];

  const authoritySections = composeAuthoritySections({ service, city, area });
  const seoScrollBlocks = composeSeoScrollContent({ service, city, area });
  const encyclopedia = composeEncyclopediaArticle({ service, city, area });
  const longform = composeLongformSeo({
    service,
    city,
    area,
    nearbyNames: nearbyForSidebar.map((item) => item.name),
  });
  const faqs = composeUniqueFaqs(service, placeLabel, city.name, {
    keywords: seo.keywords ?? placeKeywordPhrases.slice(0, 12),
  });

  const jumpNav = [
    { id: "gallery", label: `${service.shortName} Photos`, number: 1 },
    { id: "about", label: `About ${service.shortName}`, number: 2 },
    { id: "applications", label: "Applications", number: 3 },
    { id: "benefits", label: "Benefits", number: 4 },
    { id: "process", label: "Installation Process", number: 5 },
    { id: "materials", label: "Materials Used", number: 6 },
    { id: "longform", label: "Complete Guide", number: 7 },
    { id: "pricing", label: "Pricing & Reviews", number: 8 },
    { id: "faq", label: "FAQs", number: 9 },
    { id: "areas", label: "Service Areas", number: 10 },
  ];

  return {
    service,
    city,
    area,
    placeLabel,
    placeLabelFull,
    seo: {
      ...seo,
      h1: seo.h1,
      subtitle: localCopy.heroLead,
      keywords: seo.keywords ?? placeKeywordPhrases.slice(0, 40),
    },
    introduction: composeUniqueIntro({ service, location: city, area }),
    localProblems: [
      ...(area?.serviceDemandNotes ?? city.serviceDemandNotes),
      ...service.customerProblems.slice(0, 4),
    ].slice(0, 8),
    whoNeedsThis: [
      "Apartment owners",
      "Independent house residents",
      "Villa communities",
      "Families with children",
      "Pet owners",
      "Society / association committees",
      "Commercial balcony edges",
      "Utility-area upgrades",
    ],
    benefits: Array.from(
      new Set([
        "Measurement-led scope for real openings",
        "Tamil Nadu exposure discussed on site",
        "Child-safe layout planning when requested",
        "Pet-safe layout planning when requested",
        "Clear handover and maintenance guidance",
        ...service.benefits,
      ]),
    ).slice(0, 12),
    features: [
      {
        label: "Material",
        value: service.materials.join(", ") || "Confirmed after site inspection",
      },
      {
        label: "Mesh / Spacing",
        value:
          "Selected according to child safety, pet safety, exclusion or general protection needs",
      },
      {
        label: "Warranty",
        value: "Confirmed in writing with quotation after material selection",
      },
      {
        label: "Life expectancy",
        value: "Depends on material grade, exposure and maintenance",
      },
      {
        label: "Installation time",
        value: "Shared after measurement based on openings and access",
      },
      {
        label: "Maintenance",
        value: service.maintenanceTips[0] ?? "Simple periodic cleaning and visual checks",
      },
    ],
    applications: Array.from(
      new Set([
        "Balcony",
        "Windows",
        "Terrace",
        "Duct area",
        "Staircase",
        "Utility area",
        ...service.applications,
      ]),
    ),
    materials: service.materials,
    installationSteps: [
      {
        step: 1,
        title: "Inspection",
        body: `We review openings, railings and access conditions in ${placeLabel}.`,
      },
      {
        step: 2,
        title: "Measurement",
        body: "Each opening is measured so the quotation matches real site conditions.",
      },
      {
        step: 3,
        title: "Material selection",
        body: "Material, spacing and finishing options are confirmed before installation.",
      },
      {
        step: 4,
        title: "Installation",
        body: "Frames/fixings and system installation are completed as per the approved scope.",
      },
      {
        step: 5,
        title: "Quality check",
        body: "Alignment, tensioning/fixing and finishing details are reviewed before handover.",
      },
      {
        step: 6,
        title: "Final handover",
        body: "You receive practical usage and maintenance guidance for the installed openings.",
      },
    ],
    whyChooseUs: [
      "Measurement-based quotations instead of guesswork",
      "Honest Tamil Nadu service-area coverage",
      "Clear discussion of materials and spacing",
      "Neat finishing focus for homes and apartments",
      "Call, WhatsApp and quote-form support",
      "After-installation guidance",
      "No fake branch claims in every locality",
      "Warranty details confirmed in writing when applicable",
    ],
    authoritySections,
    seoScrollBlocks,
    encyclopedia,
    longform,
    localCopy,
    serviceAreas,
    nearbyAreas: nearbyForSidebar,
    relatedCities: relatedCities.map((item) => ({
      name: item.name,
      href: buildServiceInCityPath(service.slug, item.slug),
    })),
    relatedServices: relatedServices.map((item) => ({
      name: item.name,
      href: area
        ? buildServiceStateCityAreaPath(item.slug, city.slug, area.slug)
        : buildServiceInCityPath(item.slug, city.slug),
    })),
    relatedGuides,
    relatedSolutions,
    searchVariants: uniqueSearchVariants,
    pricingFactors: service.pricingFactors,
    pricingStatement: PRICING_STATEMENT,
    faqs,
    breadcrumbs,
    internalLinks: Array.from(uniqueLinkMap.values()).slice(0, 80),
    galleryImages: service.galleryImages.length
      ? service.galleryImages
      : service.heroImage
        ? [service.heroImage]
        : [],
    galleryAlts: [
      `${service.name} in ${placeLabel}`,
      `${service.name} installation ${placeLabel}`,
      `${service.name} for apartment ${placeLabel}`,
      `Professional ${service.name.toLowerCase()} finishing in ${city.name}`,
      `${service.name} suitable for homes in ${placeLabelFull}`,
    ],
    reviewsAvailable: false,
    trustPlaceholders,
    jumpNav,
  };
}
