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

export type SeoScrollBlock = {
  id: string;
  title: string;
  lead: string;
  paragraphs: string[];
  bullets?: string[];
  tone?: "light" | "soft" | "ink";
};

/**
 * Extra long-form SEO blocks for unlimited-scroll landings.
 * Wording/order vary by service×place seed for uniqueness.
 */
export function composeSeoScrollContent(input: {
  service: Service;
  city: Location;
  area?: Area;
}): SeoScrollBlock[] {
  const { service, city, area } = input;
  const place = area?.name ?? city.name;
  const placeFull = area ? `${area.name}, ${city.name}` : city.name;
  const seed = hashSeed(`scroll|${service.slug}|${city.slug}|${area?.slug ?? "city"}`);
  const buildings =
    (area?.propertyTypes.length ? area.propertyTypes : city.propertyTypes)
      .slice(0, 4)
      .join(", ") || "apartments and independent houses";

  const blocks: SeoScrollBlock[] = [
    {
      id: "deep-overview",
      title: pick(
        [
          `${service.name} explained for ${place}`,
          `Understanding ${service.shortName.toLowerCase()} in ${placeFull}`,
          `What ${service.shortName.toLowerCase()} means for homes in ${place}`,
        ],
        seed,
      ),
      lead: `${service.summary}`,
      paragraphs: [
        `${service.detailedDescription}`,
        `In ${placeFull}, households usually compare look, spacing, fixing quality and everyday usability before approving work. ${service.name} is discussed in that practical order — not as a catalogue slogan.`,
        `Building mix around here often includes ${buildings}. That mix changes access routes, railing types and whether association rules apply before installation day.`,
      ],
      bullets: rotate(service.features, seed).slice(0, 8),
      tone: "light",
    },
    {
      id: "use-cases",
      title: pick(
        [
          `Where ${service.shortName.toLowerCase()} is commonly used in ${place}`,
          `Practical use cases around ${placeFull}`,
          `Openings that usually need attention in ${place}`,
        ],
        seed + 1,
      ),
      lead: `Use cases stay useful when they match how people actually live in ${place}.`,
      paragraphs: [
        `Balconies, windows, terraces, duct edges and utility openings create different risks. A good ${service.shortName.toLowerCase()} plan names the opening first, then the specification.`,
        `Families with children, pet owners, bird-pressure homes and laundry-heavy balconies often need different spacing or mesh decisions even when they search the same keyword.`,
      ],
      bullets: rotate(
        [
          ...service.applications,
          "High-rise balcony edges",
          "Window fall-risk openings",
          "AC / duct roosting zones",
          "Staircase void protection",
          "Utility drying areas",
          "Villa courtyard openings",
        ],
        seed,
      ).slice(0, 9),
      tone: "soft",
    },
    {
      id: "decision-path",
      title: pick(
        [
          `Decision path before you book in ${place}`,
          `How to decide if ${service.shortName.toLowerCase()} is right`,
          `From search intent to site measurement in ${placeFull}`,
        ],
        seed + 2,
      ),
      lead: "A clear decision path reduces wrong-product purchases.",
      paragraphs: [
        `Start with intent: fall protection, insect screening, bird exclusion, monkey exclusion or utility drying. ${service.name} fits one of those intents — not all of them.`,
        `Next, list openings and note floor access. Then book a free measurement visit in ${city.name}. Quotation quality depends on real sizes, not approximate room guesses.`,
        `Finally, confirm association permissions where needed and request written scope: openings included, material assumptions, colour options and warranty terms.`,
      ],
      bullets: rotate(
        [
          "Define the safety or comfort intent",
          "Photograph openings and railings",
          "Note child / pet / bird concerns",
          "Check society rules for apartments",
          "Book measurement, not photo-only pricing",
          "Compare written scopes side by side",
          "Confirm access for install day",
          "Keep supervision plans after handover",
        ],
        seed + 3,
      ).slice(0, 8),
      tone: "light",
    },
    {
      id: "apartment-lifestyle",
      title: pick(
        [
          `Apartment living notes for ${place}`,
          `${placeFull} residential patterns that affect installs`,
          `How everyday balcony use changes the specification`,
        ],
        seed + 3,
      ),
      lead: `Residential patterns in ${place} shape finishing and layout choices.`,
      paragraphs: [
        area?.localDescription ?? city.localDescription,
        `Outdoor seating, laundry lines, plants and AC outdoor units all compete for the same edge. A measured layout keeps ${service.shortName.toLowerCase()} from fighting daily habits.`,
        ...(area?.serviceDemandNotes.length
          ? [
              `Local demand notes we hear near ${place}: ${area.serviceDemandNotes.slice(0, 3).join("; ").toLowerCase()}.`,
            ]
          : [
              `City-level demand around ${city.name} often includes family balcony safety, bird pressure and practical drying upgrades.`,
            ]),
      ],
      bullets: rotate(
        [
          ...(area?.localCharacteristics ?? []),
          ...(city.localCharacteristics ?? []),
          ...(area?.verifiedLocalFacts ?? city.verifiedLocalFacts),
        ],
        seed,
      ).slice(0, 6),
      tone: "soft",
    },
    {
      id: "safety-family",
      title: pick(
        [
          "Children, pets and responsible edge safety",
          `Family safety planning in ${place}`,
          "Spacing, supervision and honest expectations",
        ],
        seed + 4,
      ),
      lead: "Hardware helps. Supervision and correct spacing still matter.",
      paragraphs: [
        `When child or pet safety drives the enquiry in ${placeFull}, we discuss closer coverage, climbable furniture near edges and door habits. ${service.name} can support that plan when the opening is suitable.`,
        `No residential system replaces adult supervision. We state that clearly so expectations stay honest after installation.`,
      ],
      bullets: rotate(service.safetyInformation, seed + 2).slice(0, 6),
      tone: "light",
    },
    {
      id: "materials-weather",
      title: pick(
        [
          `Materials & Tamil Nadu weather for ${place}`,
          "Outdoor exposure, cleaning and longevity",
          `What humidity and sun mean for ${service.shortName.toLowerCase()}`,
        ],
        seed + 5,
      ),
      lead: "Exposure talk belongs in the quotation, not after install day.",
      paragraphs: [
        `Tamil Nadu humidity, sun and coastal air in some corridors affect coatings, mesh grade and cleaning intervals. For ${place}, we only claim verified local traits when available.`,
        `Ask about stainless grade, UV resistance for nets, fastener quality and what simple maintenance looks like month to month.`,
      ],
      bullets: rotate(
        [...service.materials, ...service.specifications, ...service.maintenanceTips],
        seed + 1,
      ).slice(0, 8),
      tone: "soft",
    },
    {
      id: "process-eeat",
      title: pick(
        [
          "Our measurement-led process",
          `How Glory handles ${service.shortName.toLowerCase()} projects`,
          "Inspection, scope, install and handover",
        ],
        seed + 6,
      ),
      lead: "Process quality is an E-E-A-T signal customers can verify.",
      paragraphs: [
        `We inspect, measure, confirm materials, install to approved scope, check finishing and hand over usage guidance. For ${placeFull}, access notes and association rules are part of that conversation.`,
        `We do not invent branch offices in every locality or publish fabricated install counts. Coverage pages describe service we can genuinely support across Tamil Nadu.`,
      ],
      bullets: rotate(service.installationSteps, seed).map(
        (step, index) => `${index + 1}. ${step}`,
      ),
      tone: "ink",
    },
    {
      id: "pricing-research",
      title: pick(
        [
          `Pricing research tips for ${place}`,
          "What a fair quotation should include",
          `Cost factors for ${service.shortName.toLowerCase()} in ${placeFull}`,
        ],
        seed + 7,
      ),
      lead: "Research intent is satisfied by transparency, not fake fixed rates.",
      paragraphs: [
        `Pricing depends on measurements, material grade, required spacing, installation complexity, building height, site accessibility and total project quantity.`,
        `In ${place}, compare whether openings are listed individually, whether material grade is named, and whether warranty terms are written. Lowest number with vague scope is rarely the best decision.`,
      ],
      bullets: rotate(service.pricingFactors, seed + 4).slice(0, 7),
      tone: "light",
    },
    {
      id: "compare-intent",
      title: pick(
        [
          "Related searches and intent matching",
          `Avoid buying the wrong system in ${place}`,
          "Keyword cousins that mean different products",
        ],
        seed + 8,
      ),
      lead: "Search language overlaps. Product jobs do not.",
      paragraphs: [
        `People searching near ${placeFull} often mix invisible grills, safety nets, mosquito nets, bird nets and cloth hangers. Matching intent prevents rework.`,
        `${service.name} should be chosen when its job matches your opening. Use the related-service links on this page to explore alternatives without leaving the ${city.name} cluster.`,
      ],
      bullets: rotate(
        [
          "Invisible grills → discreet fall-risk coverage",
          "Safety nets → denser mesh edge protection",
          "Mosquito nets → insect screening only",
          "Bird nets / spikes → roosting exclusion or deterrence",
          "Monkey nets → intrusion exclusion where relevant",
          "Cloth hangers → drying utility, not fall protection",
        ],
        seed,
      ),
      tone: "soft",
    },
    {
      id: "local-entity",
      title: pick(
        [
          `Local entities around ${place}`,
          `${placeFull} context graph for installers`,
          "Neighbourhood signals we factor into planning",
        ],
        seed + 9,
      ),
      lead: `Entity-rich local context strengthens usefulness for ${place} searches.`,
      paragraphs: [
        `${place} sits within ${city.name}, ${city.district ?? "Tamil Nadu"}, Tamil Nadu. Nearby residential patterns, transport corridors and building types influence access and finishing expectations.`,
        `We mention landmarks, apartments or commercial zones only when verified in our locality data — never as invented proximity spam.`,
      ],
      bullets: [
        `City: ${city.name}`,
        `District: ${city.district ?? "Tamil Nadu"}`,
        `State: Tamil Nadu`,
        `Housing mix: ${buildings}`,
        ...(area?.localCharacteristics.slice(0, 2).map((item) => `Local trait: ${item}`) ?? []),
        ...(area?.verifiedLocalFacts.slice(0, 2) ?? city.verifiedLocalFacts.slice(0, 2)),
      ].slice(0, 8),
      tone: "light",
    },
  ];

  return rotate(blocks, seed);
}
