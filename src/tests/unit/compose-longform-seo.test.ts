import { describe, expect, it } from "vitest";
import { composeLongformSeo } from "@/lib/content/compose-longform-seo";
import {
  getAreaBySlug,
  getLocationBySlug,
  getServiceBySlug,
} from "@/lib/data/repositories";

describe("composeLongformSeo", () => {
  it("produces original long-form content of at least 10000 words", () => {
    const service = getServiceBySlug("invisible-grills");
    const city = getLocationBySlug("chennai");
    const area = getAreaBySlug("chennai", "thiruvanmiyur");
    expect(service && city && area).toBeTruthy();
    if (!service || !city || !area) return;

    const article = composeLongformSeo({
      service,
      city,
      area,
      nearbyNames: ["Adyar", "Besant Nagar", "Kottivakkam"],
    });

    expect(article.wordCount).toBeGreaterThanOrEqual(10000);
    expect(article.sections.length).toBeGreaterThan(15);
    expect(article.lead.toLowerCase()).not.toContain("feather guard");
    expect(article.lead.toLowerCase()).toContain("glory");
  });

  it("varies content between localities", () => {
    const service = getServiceBySlug("safety-nets");
    const city = getLocationBySlug("chennai");
    const a = getAreaBySlug("chennai", "adyar");
    const b = getAreaBySlug("chennai", "velachery");
    expect(service && city && a && b).toBeTruthy();
    if (!service || !city || !a || !b) return;

    const left = composeLongformSeo({ service, city, area: a });
    const right = composeLongformSeo({ service, city, area: b });

    expect(left.lead).not.toEqual(right.lead);
    expect(left.sections[0]?.title).not.toEqual(right.sections[0]?.title);
  });
});
