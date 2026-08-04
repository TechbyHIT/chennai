import type { Area, Location } from "@/types/location";
import type { Service } from "@/types/service";

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(items: T[], seed: number, offset = 0): T {
  return items[(seed + offset) % items.length] as T;
}

function rotate<T>(items: T[], seed: number): T[] {
  if (!items.length) return items;
  const start = seed % items.length;
  return [...items.slice(start), ...items.slice(0, start)];
}

function sentenceCase(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export type EncyclopediaSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  subsections?: Array<{ title: string; paragraphs: string[]; bullets?: string[] }>;
};

export type EncyclopediaArticle = {
  lead: string;
  infobox: Array<{ label: string; value: string }>;
  sections: EncyclopediaSection[];
  seeAlso: string[];
};

/**
 * Wikipedia-style encyclopedic article for a service×place page.
 * Structure mirrors informational SERP/wiki intent; wording is unique per seed.
 */
export function composeEncyclopediaArticle(input: {
  service: Service;
  city: Location;
  area?: Area;
}): EncyclopediaArticle {
  const { service, city, area } = input;
  const place = area?.name ?? city.name;
  const placeFull = area ? `${area.name}, ${city.name}` : `${city.name}, Tamil Nadu`;
  const seed = hashSeed(`${service.slug}|${city.slug}|${area?.slug ?? "city"}|wiki`);
  const buildings =
    (area?.propertyTypes.length ? area.propertyTypes : city.propertyTypes)
      .slice(0, 4)
      .join(", ") || "apartments and independent houses";
  const coastal = [...(area?.localCharacteristics ?? []), ...city.localCharacteristics, ...city.verifiedLocalFacts]
    .join(" ")
    .toLowerCase()
    .includes("coastal");

  const synonymBank = rotate(
    [
      service.name.toLowerCase(),
      service.shortName.toLowerCase(),
      ...service.applications.slice(0, 2).map((item) => item.toLowerCase()),
      "balcony protection",
      "window safety system",
      "residential edge protection",
    ],
    seed,
  );

  const leadVariants = [
    `${service.name} are a residential ${pick(
      ["safety", "protection", "exclusion", "utility"],
      seed,
    )} system used on balconies, windows and related openings. In ${placeFull}, they are commonly considered when households want ${pick(
      ["fall-risk reduction", "open sightlines with coverage", "practical outdoor-edge security", "cleaner balcony usability"],
      seed + 1,
    )} without converting the opening into a heavy cage.`,
    `${service.name} (${synonymBank.slice(0, 2).join(" / ")}) refers to a measured installation approach for securing or improving openings in homes. Around ${place}, demand is shaped by ${buildings} and everyday balcony or window use.`,
    `In local search and home-improvement conversation, ${service.name.toLowerCase()} usually means a site-specific system planned for real openings in ${placeFull}. The term covers material choice, spacing intent, fixing method and finishing quality — not a single factory-fixed product size.`,
  ];

  const definitionSection: EncyclopediaSection = {
    id: "definition",
    title: pick(
      [`Definition of ${service.name.toLowerCase()}`, `What ${service.shortName.toLowerCase()} means`, "Terminology"],
      seed,
    ),
    paragraphs: [
      pick(leadVariants, seed),
      `${sentenceCase(service.summary)} Technically, a useful definition separates the product intent (for example fall protection, insect screening, bird exclusion or drying utility) from look-alike search terms that describe different jobs.`,
      `Pages for ${place} use this definition so residents comparing quotes understand whether ${service.shortName.toLowerCase()} matches their opening, or whether a related system is a better fit.`,
    ],
    bullets: rotate(
      [
        `Primary term: ${service.name}`,
        `Common local phrasing: ${service.shortName.toLowerCase()} in ${place}`,
        `Intent family: ${pick(service.applications, seed) ?? "residential openings"}`,
        `Not the same as: mosquito mesh used as fall protection`,
        `Decision unit: one measured opening at a time`,
      ],
      seed,
    ),
  };

  const overviewSection: EncyclopediaSection = {
    id: "overview",
    title: pick(
      [`Overview for ${place}`, `${service.shortName} at a glance`, `Background`],
      seed + 2,
    ),
    paragraphs: [
      service.detailedDescription,
      `In ${placeFull}, the overview that helps most is practical: which openings exist, how they are used, what the railing or frame can support, and whether association rules apply for exterior work.`,
      coastal
        ? `Because parts of the wider ${city.name} corridor can see humid or coastal exposure, overview discussions often include coating, mesh grade and cleaning intervals earlier than inland listings suggest.`
        : `Local exposure, sun and dust patterns in ${place} are part of overview planning when materials and maintenance habits are discussed.`,
      area?.localDescription ?? city.localDescription,
    ],
    bullets: rotate(
      [
        ...(area?.serviceDemandNotes ?? city.serviceDemandNotes).slice(0, 3),
        ...service.customerProblems.slice(0, 3),
      ],
      seed + 1,
    ).slice(0, 6),
  };

  const typesSection: EncyclopediaSection = {
    id: "types",
    title: pick(
      ["Types and variants", `Kinds of ${service.shortName.toLowerCase()} work`, "Classification by opening"],
      seed + 3,
    ),
    paragraphs: [
      `${service.name} work is best classified by opening and intent rather than by marketing labels alone. The same keyword can describe balcony, window, duct, terrace or utility applications with different spacing and hardware needs.`,
      `In ${place}, classification usually starts with: (1) fall-risk openings, (2) exclusion openings for birds or animals, (3) insect screening, or (4) utility systems such as cloth hangers. ${service.shortName} belongs to the class that matches its designed job.`,
    ],
    subsections: rotate(
      [
        {
          title: "By opening type",
          paragraphs: [
            `Balcony, window, staircase void, duct ledge and terrace edges each create different fixing and access constraints in ${buildings}.`,
          ],
          bullets: rotate(service.applications, seed).slice(0, 6),
        },
        {
          title: "By household need",
          paragraphs: [
            "Child safety, pet safety, bird pressure, laundry convenience and visual preference change spacing and finishing choices even when the product family stays the same.",
          ],
          bullets: rotate(service.customerProblems, seed + 2).slice(0, 5),
        },
        {
          title: "By material conversation",
          paragraphs: [
            "Material talk should name cable/mesh grade, coating, frames and fasteners — not only a colour swatch.",
          ],
          bullets: rotate(service.materials, seed).slice(0, 5),
        },
      ],
      seed,
    ),
  };

  const howItWorks: EncyclopediaSection = {
    id: "how-it-works",
    title: pick(
      ["How it works", "Operating principle", `How ${service.shortName.toLowerCase()} is built on site`],
      seed + 4,
    ),
    paragraphs: [
      `A typical ${service.shortName.toLowerCase()} project moves from inspection to measurement, material confirmation, installation and handover. The “how it works” section matters because photo-only assumptions often miss irregular openings common in ${place} housing stock.`,
      pick(
        [
          `On site, installers assess fixing surfaces, clearances, furniture paths and whether the system must leave service access for AC or window cleaning.`,
          `The practical mechanism is straightforward: cover or secure the opening according to the approved spacing/material plan, then verify tensioning or mesh fixing before handover.`,
          `Unlike catalogue furniture, ${service.name.toLowerCase()} performance depends on geometry. Width, height, railing condition and anchor points decide the final layout.`,
        ],
        seed + 5,
      ),
    ],
    bullets: rotate(service.installationSteps, seed).map(
      (step, index) => `${index + 1}. ${step}`,
    ),
  };

  const components: EncyclopediaSection = {
    id: "components",
    title: pick(
      ["Components and materials", "Parts of a complete system", "Bill-of-materials thinking"],
      seed + 5,
    ),
    paragraphs: [
      `An encyclopedic view of ${service.name.toLowerCase()} includes more than the visible mesh or cable. Frames, brackets, terminations, fasteners and edge finishing all affect longevity and appearance in ${placeFull}.`,
      `Specification notes commonly reviewed for Tamil Nadu homes include: ${rotate(service.specifications, seed).slice(0, 3).join("; ").toLowerCase()}.`,
    ],
    bullets: rotate(
      [...service.materials, ...service.features, ...service.specifications],
      seed + 2,
    ).slice(0, 9),
  };

  const localHistory: EncyclopediaSection = {
    id: "local-context",
    title: pick(
      [`${service.shortName} in ${place}`, `Local context: ${placeFull}`, `Geography and housing notes`],
      seed + 6,
    ),
    paragraphs: [
      `${place} is part of ${city.name}${city.district ? `, ${city.district}` : ""}, Tamil Nadu. Residential patterns here commonly include ${buildings}, which influences how ${service.name.toLowerCase()} enquiries are scoped.`,
      ...(area?.verifiedLocalFacts.length
        ? [
            `Verified locality notes used on this page: ${area.verifiedLocalFacts.slice(0, 3).join("; ")}.`,
          ]
        : [
            `City-level verified notes informing this page: ${city.verifiedLocalFacts.slice(0, 3).join("; ") || `${city.name} residential and access patterns vary by neighbourhood`}.`,
          ]),
      pick(
        [
          `Transport corridors, apartment density and independent-house pockets around ${place} change material movement and install-day access more than online photos reveal.`,
          `Association rules are a frequent local variable for apartment elevations in ${city.name}; homeowners usually confirm permissions before exterior drilling or visible hardware changes.`,
          `Neighbourhood character traits considered when relevant: ${rotate(area?.localCharacteristics ?? city.localCharacteristics, seed).slice(0, 3).join("; ").toLowerCase() || "mixed residential use"}.`,
        ],
        seed + 7,
      ),
    ],
    bullets: rotate(
      [
        `City hub: ${city.name}`,
        `Locality focus: ${place}`,
        `State: Tamil Nadu`,
        `Housing mix: ${buildings}`,
        ...(area?.serviceDemandNotes ?? city.serviceDemandNotes).slice(0, 2),
      ],
      seed,
    ),
  };

  const safetySection: EncyclopediaSection = {
    id: "safety",
    title: pick(
      ["Safety considerations", "Risk, spacing and responsible use", "Safety encyclopaedia notes"],
      seed + 7,
    ),
    paragraphs: [
      `Safety content for ${service.name.toLowerCase()} should stay literal: hardware can reduce risk at an opening; it does not replace adult supervision, railing repairs or unsafe furniture placement near edges.`,
      `In ${placeFull}, families often ask about child gaps, pet behaviour and whether insect mesh can substitute for fall protection. Those are different intents and should not be collapsed into one product claim.`,
    ],
    bullets: rotate(service.safetyInformation, seed + 3).slice(0, 7),
  };

  const compareSection: EncyclopediaSection = {
    id: "comparison",
    title: pick(
      ["Comparison with related systems", "See also: neighbouring product intents", "Differences readers confuse in search"],
      seed + 8,
    ),
    paragraphs: [
      `Search engines surface overlapping queries for invisible grills, safety nets, mosquito nets, bird nets, monkey nets and cloth hangers. An accurate comparison table starts with intent, not synonym matching.`,
      `${service.name} should be selected when its designed job matches the opening in ${place}. If the intent differs, related Glory pages in the ${city.name} cluster are the correct next step.`,
    ],
    bullets: rotate(
      [
        "Invisible grills — discreet cable-based fall-risk coverage",
        "Safety / balcony nets — denser mesh edge coverage",
        "Mosquito nets — insect screening, not fall protection",
        "Bird nets / spikes — roosting exclusion or deterrence",
        "Monkey nets — intrusion exclusion where relevant",
        "Cloth hangers — drying utility systems",
        `${service.shortName} on this page — matched to the opening after measurement`,
      ],
      seed + 4,
    ),
  };

  const maintenanceSection: EncyclopediaSection = {
    id: "maintenance",
    title: pick(
      ["Maintenance and longevity", "Care after installation", "Durability factors"],
      seed + 9,
    ),
    paragraphs: [
      `Longevity depends on material grade, exposure, fixing quality and simple cleaning habits. In ${place}, dust, humidity and monsoon splash are ordinary outdoor factors rather than rare edge cases.`,
      `Maintenance guidance stays practical: soft cleaning, visual checks after severe weather, and a review request if tensioning, mesh or terminations look disturbed.`,
    ],
    bullets: rotate(
      [...service.maintenanceTips, ...service.benefits.slice(0, 2)],
      seed + 1,
    ).slice(0, 7),
  };

  const buyingSection: EncyclopediaSection = {
    id: "selection",
    title: pick(
      ["Selection criteria", "How to evaluate a quotation", "Reader checklist before purchase"],
      seed + 10,
    ),
    paragraphs: [
      `From an information-retrieval perspective, the best ${service.name.toLowerCase()} page answers decision questions: what is measured, what material is named, what openings are included, and what warranty text is written.`,
      `For ${placeFull}, prefer opening-by-opening scope over vague lump sums. Ask whether society permissions, floor access and finishing colour are documented.`,
    ],
    bullets: rotate(
      [
        ...service.pricingFactors,
        "Written opening list",
        "Named material grade",
        "Spacing intent recorded",
        "Association permission status",
        "Handover / maintenance notes",
      ],
      seed + 6,
    ).slice(0, 8),
  };

  const misconceptions: EncyclopediaSection = {
    id: "misconceptions",
    title: pick(
      ["Common misconceptions", "Clarifications", "What usually gets misunderstood"],
      seed + 11,
    ),
    paragraphs: [
      pick(
        [
          `A common misconception is that any net or grill keyword implies the same product. In ${place}, that misunderstanding causes rework when insect mesh is bought for fall-risk openings.`,
          `Another misconception is that every locality page implies a permanent branch office. Glory locality content describes service coverage that can be supported — not invented storefronts.`,
          `Photo-only pricing is often treated as final. Encyclopedic buying guidance treats photos as context and measurements as the quotation basis.`,
        ],
        seed + 8,
      ),
    ],
    bullets: rotate(
      [
        "Mosquito mesh ≠ fall protection",
        "Lowest quote ≠ clearest scope",
        "Same keyword ≠ same intent",
        "Locality page ≠ fake branch claim",
        "Hardware ≠ substitute for supervision",
        "One balcony photo ≠ all openings measured",
      ],
      seed + 9,
    ),
  };

  const seeAlso = rotate(
    [
      `${service.name} overview`,
      `${service.shortName} in ${city.name}`,
      `Pricing factors for ${service.shortName.toLowerCase()}`,
      "Invisible grills vs safety nets",
      "Child balcony safety checklist",
      "Apartment association approval guide",
      "Materials and coastal care notes",
      ...service.applications.slice(0, 2).map((item) => `${item} guidance`),
    ],
    seed,
  ).slice(0, 8);

  const sections = rotate(
    [
      definitionSection,
      overviewSection,
      typesSection,
      howItWorks,
      components,
      localHistory,
      safetySection,
      compareSection,
      maintenanceSection,
      buyingSection,
      misconceptions,
    ],
    seed,
  );

  // Keep definition-like section near the top for wiki readability.
  const definitionIdx = sections.findIndex((section) => section.id === "definition");
  if (definitionIdx > 0) {
    const [def] = sections.splice(definitionIdx, 1);
    sections.unshift(def!);
  }

  return {
    lead: pick(leadVariants, seed + 3),
    infobox: [
      { label: "Service", value: service.name },
      { label: "Also called", value: service.shortName },
      { label: "Location focus", value: placeFull },
      { label: "City", value: city.name },
      { label: "State", value: "Tamil Nadu" },
      { label: "Typical openings", value: service.applications.slice(0, 3).join(", ") || "Residential openings" },
      { label: "Materials discussed", value: service.materials.slice(0, 3).join(", ") || "Confirmed on site" },
      { label: "Planning method", value: "Measurement-led quotation" },
      { label: "Housing context", value: buildings },
      {
        label: "Local demand notes",
        value:
          (area?.serviceDemandNotes[0] ?? city.serviceDemandNotes[0] ?? "Site-specific residential demand")
            .slice(0, 90),
      },
    ],
    sections,
    seeAlso,
  };
}
