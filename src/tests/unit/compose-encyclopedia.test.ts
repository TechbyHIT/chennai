import { describe, expect, it } from "vitest";
import { composeEncyclopediaArticle } from "@/lib/content/compose-encyclopedia";
import { getAreaBySlug, getLocationBySlug, getServiceBySlug } from "@/lib/data/repositories";

describe("composeEncyclopediaArticle", () => {
  it("creates different encyclopedia content for different localities", () => {
    const service = getServiceBySlug("invisible-grills");
    const city = getLocationBySlug("chennai");
    expect(service && city).toBeTruthy();
    if (!service || !city) return;

    const areas = [
      getAreaBySlug("chennai", "adyar"),
      getAreaBySlug("chennai", "velachery"),
    ].filter(Boolean);

    if (areas.length < 2) {
      const cityOnlyA = composeEncyclopediaArticle({ service, city });
      const cityOnlyB = composeEncyclopediaArticle({
        service,
        city: getLocationBySlug("coimbatore") ?? city,
      });
      expect(cityOnlyA.lead).not.toEqual(cityOnlyB.lead);
      return;
    }

    const a = composeEncyclopediaArticle({ service, city, area: areas[0]! });
    const b = composeEncyclopediaArticle({ service, city, area: areas[1]! });

    expect(a.lead.length).toBeGreaterThan(80);
    expect(a.sections.length).toBeGreaterThanOrEqual(8);
    expect(a.infobox.length).toBeGreaterThanOrEqual(6);
    expect(a.lead === b.lead && a.sections[0]?.title === b.sections[0]?.title).toBe(
      false,
    );
  });
});
