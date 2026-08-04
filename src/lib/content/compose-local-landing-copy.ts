import type { Area, Location } from "@/types/location";
import type { Service } from "@/types/service";

function hashSeed(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

function pick<T>(items: T[], seed: number, offset = 0): T {
  return items[(seed + offset) % items.length] as T;
}

function rotate<T>(items: T[], seed: number): T[] {
  if (!items.length) return items;
  const start = seed % items.length;
  return [...items.slice(start), ...items.slice(0, start)];
}

/** Featherguard-depth local SEO body copy — original Glory wording, unique per place×service. */
export function composeLocalLandingCopy(input: {
  service: Service;
  city: Location;
  area?: Area;
  nearbyNames: string[];
}): {
  heroLead: string;
  cityGuideLine: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  whyLocalTitle: string;
  whyLocalParagraphs: string[];
  trustBadges: string[];
  whyChoose: string[];
} {
  const { service, city, area, nearbyNames } = input;
  const place = area?.name ?? city.name;
  const placeFull = area ? `${area.name}, ${city.name}` : city.name;
  const seed = hashSeed(`fg|${service.slug}|${city.slug}|${area?.slug ?? "city"}`);
  const nearby = nearbyNames.slice(0, 4);
  const nearbyText = nearby.length
    ? nearby.join(", ")
    : `nearby ${city.name} localities`;
  const buildings =
    (area?.propertyTypes.length ? area.propertyTypes : city.propertyTypes)
      .slice(0, 3)
      .join(", ") || "apartments and independent houses";
  const facts = rotate(
    [...(area?.verifiedLocalFacts ?? []), ...city.verifiedLocalFacts],
    seed,
  ).slice(0, 2);
  const traits = rotate(
    [...(area?.localCharacteristics ?? []), ...city.localCharacteristics],
    seed + 2,
  ).slice(0, 2);
  const demand = rotate(
    [...(area?.serviceDemandNotes ?? []), ...city.serviceDemandNotes],
    seed + 1,
  ).slice(0, 2);

  const heroLead = pick(
    [
      `Professional ${service.name.toLowerCase()} installation in ${placeFull} by Glory Invisible Grills. We provide measured ${service.shortName.toLowerCase()} work with premium materials discussion, careful finishing and written warranty terms after material selection. Serving ${place} and nearby areas like ${nearbyText}.`,
      `Looking for ${service.name.toLowerCase()} in ${place}? Glory Invisible Grills schedules free measurement visits for homes and apartments, then confirms scope before installation. We also cover nearby pockets such as ${nearbyText}.`,
      `${service.name} in ${placeFull} — expert installation planning for ${buildings}. Book a free site inspection and get a quotation based on real openings, not guesswork.`,
    ],
    seed,
  );

  const cityGuideLine = `Looking for ${service.name} in ${city.name}? View our city-wide service guide with materials, pricing factors, warranty discussion and locality coverage. Or call for a free site visit in ${place}.`;

  const aboutTitle = pick(
    [
      `Professional ${service.name} Installation in ${place}`,
      `${service.name} for homes in ${placeFull}`,
      `About ${service.shortName.toLowerCase()} services in ${place}`,
    ],
    seed + 1,
  );

  const aboutParagraphs = [
    pick(
      [
        `${service.name} for ${place} — modern protection planning without the heavy look of conventional iron work when the opening suits a discreet system. ${service.summary}`,
        `${service.detailedDescription}`,
        `Residents searching for ${service.name.toLowerCase()} in ${placeFull} usually want clear sightlines, secure openings and a neat finish that matches how the home is used every day.`,
      ],
      seed + 2,
    ),
    `${place} sits within ${city.name}, Tamil Nadu. Local housing commonly includes ${buildings}. ${area?.localDescription ?? city.localDescription}`,
    facts.length || traits.length
      ? `Local notes guiding installation talk: ${[...facts, ...traits].join("; ")}.`
      : `Site conditions in ${place} — access, railing strength and exposure — are reviewed before materials are finalised.`,
    pick(
      [
        `Traditional bulky grills can block light and need frequent upkeep. ${service.shortName} recommendations focus on measured spacing, suitable materials for Tamil Nadu weather discussion, and finishing that keeps the opening usable.`,
        `Compatible planning for common opening types in ${place}: balconies, sliding/casement windows, utility edges and other residential openings assessed on site.`,
        demand.length
          ? `Frequent local requests around ${place}: ${demand.join("; ").toLowerCase()}.`
          : `We serve ${place} under our honest ${city.name} / Tamil Nadu coverage model — service availability, not fake branch offices on every street.`,
      ],
      seed + 3,
    ),
    `We serve all practical parts of ${place} and nearby areas including ${nearbyText}. Association permissions for apartment exterior work should be checked before install day.`,
  ];

  const whyLocalTitle = `Why ${place} residents choose Glory for ${service.shortName.toLowerCase()}`;
  const whyLocalParagraphs = [
    pick(
      [
        `Homeowners in ${place} choose a measurement-led process because openings, access and finishing needs differ from home to home.`,
        `${placeFull} residents often compare ${service.shortName.toLowerCase()} with related nets or grills. Matching the system to intent — fall protection, exclusion, screening or utility — avoids rework.`,
        `Fast response for site inspection in ${city.name} localities starts with a clear brief: property type, openings, floor access and preferred contact mode.`,
      ],
      seed + 4,
    ),
    `Whether you need ${service.name.toLowerCase()} for a compact apartment opening or a larger independent-home edge, the ${place} installation plan is built from measurements and written scope.`,
    `Contact Glory Invisible Grills for a free site inspection in ${place}. Quality materials discussion, professional installation process and after-installation guidance are part of every quotation conversation.`,
  ];

  return {
    heroLead,
    cityGuideLine,
    aboutTitle,
    aboutParagraphs,
    whyLocalTitle,
    whyLocalParagraphs,
    trustBadges: rotate(
      [
        "Free site inspection",
        "Measurement-based quotes",
        "Written warranty when applicable",
        "Tamil Nadu coverage",
        "Call & WhatsApp support",
      ],
      seed,
    ).slice(0, 4),
    whyChoose: rotate(
      [
        "Measurement before quotation",
        "Honest locality coverage claims",
        "Material grade discussed on site",
        "Neat finishing focus",
        "Apartment & villa experience path",
        "After-install guidance",
      ],
      seed + 2,
    ).slice(0, 4),
  };
}
