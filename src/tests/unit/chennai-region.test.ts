import { describe, expect, it } from "vitest";
import {
  CHENNAI_BELT_SLUGS,
  CHENNAI_REGION_SLUGS,
  isChennaiBeltTown,
  isChennaiRegion,
  sortChennaiRegionFirst,
} from "@/config/chennai-region";
import { CHENNAI_APARTMENT_AREAS } from "@/data/locations";
import { CHENNAI_PRIORITY_AREA_SLUGS } from "@/data/chennai-priority-areas";
import { AREAS_MEGA_MENU } from "@/config/mega-menu";
import {
  RETIRED_CITY_SLUGS,
  RETIRED_TOWN_LOCALITIES,
} from "@/lib/routing/retired-locations";
import {
  getClustersForService,
  getPrimaryKeywordsForService,
} from "@/data/keyword-clusters";
import { cityScaledQuota } from "@/lib/geo/generate-scaled-localities";
import {
  getAreaBySlug,
  getAreas,
  getLocationBySlug,
  getLocations,
  getServiceBySlug,
} from "@/lib/data/repositories";
import {
  createLocationPage,
  createServiceAreaPage,
  createServiceLocationPage,
} from "@/lib/pages/create-page-record";
import { localBusinessSchema } from "@/lib/schema/local-business-schema";
import {
  buildServiceAreaSeo,
  buildServiceCitySeo,
} from "@/lib/seo/service-location-seo";

describe("Chennai 150 km region focus", () => {
  it("every region slug is a served, published city", () => {
    for (const slug of CHENNAI_REGION_SLUGS) {
      const loc = getLocationBySlug(slug);
      expect(loc, slug).toBeDefined();
      expect(loc?.isServed, slug).toBe(true);
      expect(loc?.publicationStatus, slug).toBe("published");
    }
    expect(isChennaiRegion("chennai")).toBe(true);
    expect(isChennaiBeltTown("chennai")).toBe(false);
    expect(isChennaiBeltTown("tambaram")).toBe(true);
    expect(isChennaiRegion("coimbatore")).toBe(false);
  });

  it("lists Chennai and its belt before every other city, by default and when sorted", () => {
    const served = getLocations({ publishedOnly: true, servedOnly: true }).map((l) => l.slug);
    expect(served.slice(0, CHENNAI_REGION_SLUGS.length).sort()).toEqual(
      [...CHENNAI_REGION_SLUGS].sort(),
    );
    expect(served[0]).toBe("chennai");

    const sorted = sortChennaiRegionFirst(getLocations({ publishedOnly: true, servedOnly: true }));
    expect(sorted.slice(0, CHENNAI_REGION_SLUGS.length).map((l) => l.slug)).toEqual([
      ...CHENNAI_REGION_SLUGS,
    ]);
    expect(sorted).toHaveLength(served.length);
  });

  it("gives Chennai the largest locality budget and the belt more than comparable regional towns", () => {
    expect(cityScaledQuota("chennai")).toBeGreaterThan(cityScaledQuota("coimbatore"));
    for (const slug of CHENNAI_BELT_SLUGS) {
      expect(cityScaledQuota(slug), slug).toBeGreaterThanOrEqual(cityScaledQuota("ooty"));
    }
  });

  it("marks region hub and service×city pages as critical crawl priority", () => {
    const service = getServiceBySlug("invisible-grills")!;
    for (const slug of CHENNAI_REGION_SLUGS) {
      const city = getLocationBySlug(slug)!;
      expect(createLocationPage(city).crawlPriority, slug).toBe("critical");
      expect(createServiceLocationPage(service, city).crawlPriority, slug).toBe("critical");
    }
    const madurai = getLocationBySlug("madurai")!;
    expect(createLocationPage(madurai).crawlPriority).toBe("high");
    expect(createServiceLocationPage(service, madurai).crawlPriority).toBe("high");
  });

  it("puts Chennai in belt-town location titles and descriptions", () => {
    const tambaram = getLocationBySlug("tambaram")!;
    expect(createLocationPage(tambaram).title).toBe(
      "Invisible Grills & Safety Nets in Tambaram, Chennai",
    );
    const seo = buildServiceCitySeo(getServiceBySlug("safety-nets")!, tambaram);
    expect(seo.metaDescription).toContain("near Chennai");
    expect(seo.keywords.some((k) => /near Chennai/i.test(k))).toBe(true);

    const madurai = getLocationBySlug("madurai")!;
    expect(createLocationPage(madurai).title).toBe("Invisible Grills in Madurai | Tamil Nadu");
    expect(buildServiceCitySeo(getServiceBySlug("safety-nets")!, madurai).metaDescription).not.toContain(
      "Chennai",
    );
  });

  it("treats every curated belt-town locality as a high-priority service×area page", () => {
    const service = getServiceBySlug("safety-nets")!;
    const chengalpattu = getLocationBySlug("chengalpattu")!;
    const areas = getAreas({ publishedOnly: true, curatedOnly: true }).filter(
      (a) => a.parentId === chengalpattu.id,
    );
    expect(areas.length).toBeGreaterThan(0);
    for (const area of areas) {
      expect(createServiceAreaPage(service, chengalpattu, area).crawlPriority, area.slug).toBe("high");
    }
  });

  it("every Chennai priority slug is a real curated Chennai area", () => {
    expect(CHENNAI_PRIORITY_AREA_SLUGS.size).toBeGreaterThan(100);
    for (const slug of CHENNAI_PRIORITY_AREA_SLUGS) {
      expect(getAreaBySlug("chennai", slug), slug).toBeDefined();
    }
  });

  it("areas mega menu leads with Chennai and only links to real pages", () => {
    expect(AREAS_MEGA_MENU[0]?.title).toBe("Chennai");
    const cityTitles = AREAS_MEGA_MENU.map((c) => c.title);
    expect(cityTitles.indexOf("Chennai")).toBeLessThan(
      cityTitles.findIndex((t) => t.includes("Coimbatore")),
    );

    for (const column of AREAS_MEGA_MENU) {
      for (const link of column.links) {
        const parts = link.href.split("/").filter(Boolean);
        if (parts[0] !== "locations") continue;
        if (parts.length === 1) continue;
        const city = getLocationBySlug(parts[1]!);
        expect(city, link.href).toBeDefined();
        if (parts.length === 3) {
          expect(getAreaBySlug(parts[1]!, parts[2]!), link.href).toBeDefined();
        }
      }
    }
  });

  it("covers the full 150 km belt: 19 region cities", () => {
    expect(CHENNAI_REGION_SLUGS).toHaveLength(19);
    for (const slug of [
      "vellore",
      "ranipet",
      "arakkonam",
      "arcot",
      "tindivanam",
      "arani",
      "tiruttani",
      "vandavasi",
      "cheyyar",
    ]) {
      expect(CHENNAI_REGION_SLUGS, slug).toContain(slug);
      expect(isChennaiBeltTown(slug), slug).toBe(true);
    }
  });

  it("no longer treats the 150 km belt towns as retired", () => {
    for (const slug of [
      "vellore",
      "ranipet",
      "arcot",
      "arani",
      "tindivanam",
      "walajapet",
      "katpadi",
    ]) {
      expect(RETIRED_CITY_SLUGS.has(slug), slug).toBe(false);
    }
    expect(RETIRED_TOWN_LOCALITIES["walajapet"]).toEqual({
      citySlug: "ranipet",
      areaSlug: "walajapet",
    });
    expect(RETIRED_TOWN_LOCALITIES["katpadi"]).toEqual({
      citySlug: "vellore",
      areaSlug: "katpadi",
    });
    // Still gone: outside the belt.
    for (const slug of ["nagercoil", "thanjavur", "gudiyatham", "villupuram"]) {
      expect(RETIRED_CITY_SLUGS.has(slug), slug).toBe(true);
    }
  });

  it("covers every apartment project as a published locality of a served city", () => {
    expect(CHENNAI_APARTMENT_AREAS.length).toBeGreaterThanOrEqual(140);
    const chennaiApts = CHENNAI_APARTMENT_AREAS.filter((a) => a.parentId === "loc-chennai");
    const avadiApts = CHENNAI_APARTMENT_AREAS.filter((a) => a.parentId === "loc-avadi");
    const porurApts = chennaiApts.filter((a) => a.introduction.includes("Porur"));
    expect(chennaiApts.length).toBeGreaterThanOrEqual(100);
    expect(avadiApts.length).toBeGreaterThanOrEqual(35);
    expect(porurApts.length).toBeGreaterThanOrEqual(8);
    const slugs = new Set(CHENNAI_APARTMENT_AREAS.map((a) => a.slug));
    expect(slugs.size).toBe(CHENNAI_APARTMENT_AREAS.length);
    for (const area of CHENNAI_APARTMENT_AREAS) {
      expect(area.publicationStatus, area.slug).toBe("published");
      expect(area.isServed, area.slug).toBe(true);
      const parent = getLocationBySlug(area.parentId.replace(/^loc-/, ""));
      expect(parent, area.slug).toBeDefined();
      expect(parent?.isServed, area.slug).toBe(true);
      expect(isChennaiRegion(parent!.slug), area.slug).toBe(true);
      expect(area.propertyTypes).toContain("apartments");
    }
  });

  it("carries apartment and under-construction intent in core keyword modifiers", () => {
    const grillHeads = getClustersForService("invisible-grills").flatMap((c) => [
      ...c.headTerms,
      ...c.applicationModifiers,
    ]);
    for (const term of [
      "for gated communities",
      "for under construction flats",
      "for ready to move flats",
      "for completed apartments",
      "for resale flats",
      "for 3bhk flats",
    ]) {
      expect(grillHeads, term).toContain(term);
    }
    const netHeads = getClustersForService("safety-nets").flatMap((c) => [
      ...c.headTerms,
      ...c.applicationModifiers,
    ]);
    for (const term of [
      "apartment safety net",
      "ready to move safety net",
      "for gated community",
      "for under construction flats",
      "for ready to move apartments",
      "for resale flats",
    ]) {
      expect(netHeads, term).toContain(term);
    }
    expect(getPrimaryKeywordsForService("invisible-grills")).toContain("apartment invisible grill");
  });

  it("guarantees apartment-status keywords on every core service city page", () => {
    const city = getLocationBySlug("salem")!;
    for (const slug of ["invisible-grills", "safety-nets", "cloth-hangers", "bird-spikes"]) {
      const seo = buildServiceCitySeo(getServiceBySlug(slug)!, city);
      const joined = seo.keywords.join(" | ");
      expect(joined, slug).toMatch(/for apartments in Salem/);
      expect(joined, slug).toMatch(/for ready to move flats in Salem/);
      expect(joined, slug).toMatch(/for gated community in Salem/);
    }
    // Sports nets target apartment complexes and gated communities instead.
    const sports = buildServiceCitySeo(getServiceBySlug("sports-nets")!, city);
    const sportsJoined = sports.keywords.join(" | ");
    expect(sportsJoined).toMatch(/for apartment complex in Salem/);
    expect(sportsJoined).toMatch(/for gated community in Salem/);
    expect(sportsJoined.toLowerCase()).not.toContain("ready to move");
    expect(sportsJoined.toLowerCase()).not.toContain("resale");

    const area = getAreaBySlug("salem", "hasthampatti")!;
    const areaSeo = buildServiceAreaSeo(getServiceBySlug("safety-nets")!, city, area);
    expect(areaSeo.keywords.join(" | ")).toMatch(/for apartments in Hasthampatti/);
  });

  it("rotates apartment heads into titles for all five core services", () => {
    expect(getPrimaryKeywordsForService("invisible-grills")).toContain("apartment invisible grill");
    expect(getPrimaryKeywordsForService("safety-nets")).toContain("apartment safety net");
    expect(getPrimaryKeywordsForService("cloth-hangers")).toContain("apartment cloth hanger");
    expect(getPrimaryKeywordsForService("sports-nets")).toContain("apartment cricket net");
    expect(getPrimaryKeywordsForService("bird-spikes")).toContain("apartment bird spikes");
  });

  it("LocalBusiness areaServed names the Chennai region cities before the state", () => {
    const schema = localBusinessSchema() as {
      areaServed: Array<{ "@type": string; name: string }>;
    };
    expect(schema.areaServed[0]).toMatchObject({ "@type": "City", name: "Chennai" });
    expect(schema.areaServed.at(-1)).toMatchObject({ "@type": "State", name: "Tamil Nadu" });
    expect(schema.areaServed).toHaveLength(CHENNAI_REGION_SLUGS.length + 1);
  });
});
