import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import {
  BLOCKED_PAGE_MODIFIERS,
  KEYWORD_CLUSTERS,
  expandLocationKeyword,
} from "../src/data/keyword-clusters";
import { getLocations, getServices } from "../src/lib/data/repositories";
import { getPageCounts } from "../src/lib/pages/page-registry";

const services = getServices({ publishedOnly: true });
const cities = getLocations({ publishedOnly: true, servedOnly: true });

const headTermCount = KEYWORD_CLUSTERS.reduce(
  (sum, cluster) => sum + cluster.headTerms.length,
  0,
);

const doorwayIfMultiplied =
  KEYWORD_CLUSTERS.reduce((sum, cluster) => {
    const modifiers =
      cluster.commercialModifiers.length +
      cluster.applicationModifiers.length +
      cluster.qualityModifiers.length +
      cluster.materialModifiers.length;
    return sum + cluster.headTerms.length * Math.max(modifiers, 1);
  }, 0) * cities.length;

const mappedServicePages = services.map((service) => ({
  slug: service.slug,
  path: `/services/${service.slug}/`,
  primaryKeywords: service.primaryKeywords.slice(0, 8),
  sampleCityIntents: cities.slice(0, 3).map((city) =>
    expandLocationKeyword(service.primaryKeywords[0] ?? service.name, city.name),
  ),
}));

const report = {
  generatedAt: new Date().toISOString(),
  strategy:
    "Cluster keywords into real services. Do not create one thin URL per price/cheap/best modifier.",
  blockedFromBecomingPages: BLOCKED_PAGE_MODIFIERS,
  clusters: KEYWORD_CLUSTERS.length,
  headTermsMapped: headTermCount,
  publishedServices: services.length,
  servedCities: cities.length,
  currentPageRecords: getPageCounts(),
  estimatedDoorwayPagesIfEveryModifierHadAUrl: doorwayIfMultiplied,
  actualApproach: {
    servicePages: services.length,
    cityServicePages: services.length * cities.length,
    notes: [
      "Price/cost/rate intents use /pricing-guide/ + quote CTAs",
      "Child/pet intents use kids/pet safety services + solutions",
      "Bird intents use bird-spikes service + pigeon solution page",
      "Area pages remain locality hubs, not keyword spam URLs",
    ],
  },
  mappedServicePages,
};

mkdirSync(join(process.cwd(), "reports"), { recursive: true });
writeFileSync(
  join(process.cwd(), "reports/keyword-coverage.json"),
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
