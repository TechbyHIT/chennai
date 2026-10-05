import { describe, expect, it } from "vitest";
import {
  MAIN_SERVICES,
  MAIN_SERVICE_SLUGS,
  sortMainServicesFirst,
} from "@/config/main-services";
import { getClustersForService, pickSeededHeadTerm } from "@/data/keyword-clusters";
import { createServicePage } from "@/lib/pages/create-page-record";
import { getLocationBySlug, getServiceBySlug, getServices } from "@/lib/data/repositories";
import { buildServiceCitySeo } from "@/lib/seo/service-location-seo";
import { serviceSchema } from "@/lib/schema/service-schema";

/** Site title template appends " | Glory Grills" (15 chars). */
const TEMPLATE_SUFFIX = 15;

describe("main services", () => {
  it("covers the five core lines in a fixed order", () => {
    expect(MAIN_SERVICE_SLUGS).toEqual([
      "invisible-grills",
      "safety-nets",
      "cloth-hangers",
      "sports-nets",
      "bird-spikes",
    ]);
  });

  it("points only at published services and sub-types", () => {
    for (const pillar of MAIN_SERVICES) {
      for (const slug of [pillar.slug, ...pillar.related]) {
        const service = getServiceBySlug(slug);
        expect(service, slug).toBeDefined();
        expect(service?.publicationStatus, slug).toBe("published");
      }
    }
  });

  it("keeps titles and descriptions within SERP limits", () => {
    for (const pillar of MAIN_SERVICES) {
      expect(pillar.seoTitle.length + TEMPLATE_SUFFIX, pillar.slug).toBeLessThanOrEqual(60);
      expect(pillar.seoDescription.length, pillar.slug).toBeLessThanOrEqual(158);
      expect(pillar.seoDescription.length, pillar.slug).toBeGreaterThanOrEqual(110);
    }
    const titles = MAIN_SERVICES.map((p) => p.seoTitle);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("gives core service pages the highest crawl priority and the custom SEO copy", () => {
    for (const pillar of MAIN_SERVICES) {
      const service = getServiceBySlug(pillar.slug)!;
      const page = createServicePage(service);
      expect(page.crawlPriority, pillar.slug).toBe("critical");
      expect(page.title).toBe(pillar.seoTitle);
      expect(page.metaDescription).toBe(pillar.seoDescription);
    }
  });

  it("leaves non-core services on the default priority", () => {
    const other = getServiceBySlug("monkey-nets")!;
    expect(createServicePage(other).crawlPriority).toBe("high");
  });

  it("sorts core services first without dropping any", () => {
    const all = getServices({ publishedOnly: true });
    const sorted = sortMainServicesFirst(all);
    expect(sorted).toHaveLength(all.length);
    expect(sorted.slice(0, 5).map((s) => s.slug)).toEqual([...MAIN_SERVICE_SLUGS]);
  });

  it("does not let bird-spike pages borrow bird-net head terms", () => {
    const spikeHeads = getClustersForService("bird-spikes").flatMap((c) => c.headTerms);
    expect(spikeHeads.length).toBeGreaterThan(10);
    expect(spikeHeads.some((term) => /\bnets?\b/i.test(term))).toBe(false);

    const sampled = new Set(
      Array.from({ length: 50 }, (_, i) => pickSeededHeadTerm("bird-spikes", `seed-${i}`)),
    );
    for (const term of sampled) expect(term).not.toMatch(/\bnets?\b/i);
  });

  it("has deep keyword coverage for the three previously thin lines", () => {
    for (const slug of ["cloth-hangers", "sports-nets", "bird-spikes"]) {
      const heads = getClustersForService(slug).flatMap((c) => c.headTerms);
      expect(heads.length, slug).toBeGreaterThanOrEqual(15);
    }
  });

  it("does not repeat the brand in city/area landing titles (template adds it)", () => {
    const city = getLocationBySlug("coimbatore")!;
    for (const slug of MAIN_SERVICE_SLUGS) {
      const seo = buildServiceCitySeo(getServiceBySlug(slug)!, city);
      expect(seo.metaTitle, slug).not.toMatch(/Glory/i);
      expect(seo.metaTitle.length + TEMPLATE_SUFFIX, slug).toBeLessThanOrEqual(80);
    }
  });

  it("targets the real city in landing-page Service schema", () => {
    const city = getLocationBySlug("coimbatore")!;
    const schema = serviceSchema(getServiceBySlug("sports-nets")!, "https://example.com/z/", {
      location: city,
    }) as { name: string; areaServed: { "@type": string; name: string } };
    expect(schema.areaServed["@type"]).toBe("City");
    expect(schema.areaServed.name).toBe("Coimbatore");
    expect(schema.name).toBe("Sports Nets in Coimbatore");
  });

  it("emits catalog + keywords in Service schema for core lines only", () => {
    const nets = serviceSchema(getServiceBySlug("safety-nets")!, "https://example.com/x/") as Record<
      string,
      unknown
    >;
    expect(nets.category).toBe("Safety Nets");
    expect(typeof nets.keywords).toBe("string");
    const catalog = nets.hasOfferCatalog as { itemListElement: unknown[] };
    expect(catalog.itemListElement.length).toBeGreaterThan(3);

    const monkey = serviceSchema(getServiceBySlug("monkey-nets")!, "https://example.com/y/") as Record<
      string,
      unknown
    >;
    expect(monkey.category).toBeUndefined();
    expect(monkey.hasOfferCatalog).toBeUndefined();
  });
});
