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

export type AuthoritySection = {
  key: string;
  title: string;
  body: string;
  bullets?: string[];
};

/**
 * Unique, place×service authority sections (Featherguard-depth intent, original copy).
 * Section order and wording vary by seed so pages are not template clones.
 */
export function composeAuthoritySections(input: {
  service: Service;
  city: Location;
  area?: Area;
}): AuthoritySection[] {
  const { service, city, area } = input;
  const place = area?.name ?? city.name;
  const placeFull = area ? `${area.name}, ${city.name}` : city.name;
  const seed = hashSeed(`${service.slug}|${city.slug}|${area?.slug ?? "city"}`);

  const buildingMix =
    (area?.propertyTypes.length ? area.propertyTypes : city.propertyTypes)
      .slice(0, 4)
      .join(", ") || "apartments and independent houses";

  const demandNotes = rotate(
    [...(area?.serviceDemandNotes ?? []), ...city.serviceDemandNotes],
    seed,
  ).slice(0, 4);

  const traits = rotate(
    [...(area?.localCharacteristics ?? []), ...city.localCharacteristics],
    seed + 3,
  ).slice(0, 4);

  const coastal = [...traits, ...city.verifiedLocalFacts]
    .join(" ")
    .toLowerCase()
    .includes("coastal");

  const introVariants = [
    `Families and property managers searching for ${service.name.toLowerCase()} in ${placeFull} usually need a clear answer: what protects the opening, what it will look like day to day, and what a fair measurement-based quote should include.`,
    `If you live in ${place} and are comparing ${service.name.toLowerCase()} options, start with how the balcony, window or edge is actually used — not with a generic catalogue description.`,
    `${placeFull} has a practical mix of ${buildingMix}. That mix is why ${service.name.toLowerCase()} recommendations here begin with site measurement rather than a one-size layout.`,
  ];

  const problemVariants = [
    `Open edges in ${place} create everyday worry around children, pets, laundry use and outdoor seating. ${service.name} is considered when households want coverage without turning the opening into a heavy cage.`,
    `Common triggers for ${service.name.toLowerCase()} enquiries around ${placeFull} include fall-risk balconies, bird roosting, insect entry, or utility openings that feel unfinished.`,
    `Residents in ${place} often ask whether a discreet system can secure an opening while keeping light and airflow. That is exactly the decision path we walk through on a site visit.`,
  ];

  const localWhy = [
    demandNotes.length
      ? `Local demand signals we hear in ${place}: ${demandNotes.join("; ").toLowerCase()}.`
      : `Demand in ${place} is driven by apartment balconies, family homes and practical outdoor living.`,
    traits.length
      ? `Neighbourhood character that shapes installation talk: ${traits.join("; ").toLowerCase()}.`
      : `${city.name} residential patterns influence fixing points, access and finishing expectations.`,
    coastal
      ? `Because parts of this corridor see coastal humidity, we discuss coating, mesh grade and cleaning intervals during quotation.`
      : `Exposure, railing condition and building access in ${place} are checked before materials are finalised.`,
    area?.localDescription ?? city.localDescription,
  ].join(" ");

  const buyingGuideBullets = rotate(
    [
      `Confirm whether you need fall protection, insect screening, bird exclusion or a utility install — ${service.shortName.toLowerCase()} is not interchangeable with every net/grill type.`,
      `Ask for opening-by-opening measurements before accepting any lump-sum figure.`,
      `Check fixing surfaces: concrete, masonry, metal railings and duct edges need different detailing.`,
      `Discuss child or pet spacing needs honestly; closer coverage can change look and cost.`,
      `Clarify society / association permissions for apartment work in ${city.name}.`,
      `Request written scope: openings included, material grade, colour options and warranty terms.`,
      `Compare maintenance expectations — outdoor Tamil Nadu exposure rewards simple cleaning routines.`,
      `Prefer a free inspection over photo-only quotes when openings are irregular.`,
    ],
    seed,
  ).slice(0, 6);

  const mistakesBullets = rotate(
    [
      "Choosing the cheapest mesh/cable without checking exposure or use case",
      "Skipping measurement and relying on approximate room sizes",
      "Treating mosquito mesh as fall protection",
      "Ignoring railing strength or loose parapet conditions",
      "Blocking emergency egress or window cleaning access unintentionally",
      "Assuming every locality has a local branch office",
    ],
    seed + 5,
  ).slice(0, 5);

  const compareBullets = rotate(
    [
      `${service.shortName} vs conventional iron grills: more open sightlines when spaced and finished carefully`,
      "Safety nets vs invisible grills: different look, coverage feel and fixing approach",
      "Bird nets/spikes vs fall-protection systems: exclusion goals are not the same as child safety goals",
      "Mosquito nets vs balcony safety nets: insect screening does not replace fall protection",
    ],
    seed + 7,
  ).slice(0, 4);

  const entityBullets = [
    `Housing mix around ${place}: ${buildingMix}`,
    `City context: ${city.name}, ${city.district ?? "Tamil Nadu"}, Tamil Nadu`,
    ...(area?.verifiedLocalFacts.slice(0, 2) ?? city.verifiedLocalFacts.slice(0, 2)),
    ...service.applications.slice(0, 3).map((item) => `Application focus: ${item}`),
    ...service.materials.slice(0, 2).map((item) => `Material discussion: ${item}`),
  ].slice(0, 8);

  const processBullets = rotate(service.installationSteps, seed).map(
    (step, index) => `${index + 1}. ${step}`,
  );

  const maintenanceBullets = rotate(service.maintenanceTips, seed + 2).slice(0, 5);
  const safetyBullets = rotate(service.safetyInformation, seed + 4).slice(0, 5);

  const sections: AuthoritySection[] = [
    {
      key: "authority-intro",
      title: pick(
        [
          `${service.name} in ${place}: what matters locally`,
          `A practical guide to ${service.shortName.toLowerCase()} for ${placeFull}`,
          `Why homeowners in ${place} choose measured ${service.shortName.toLowerCase()} installs`,
        ],
        seed,
      ),
      body: `${pick(introVariants, seed)} ${pick(problemVariants, seed + 1)}`,
    },
    {
      key: "local-authority",
      title: pick(
        [
          `Local context for ${place}`,
          `How ${placeFull} living patterns affect installation`,
          `${place} neighbourhood notes for ${service.shortName}`,
        ],
        seed + 2,
      ),
      body: localWhy,
      bullets: entityBullets,
    },
    {
      key: "problems-solutions",
      title: pick(
        [
          "Problems this service helps solve",
          "Everyday safety and comfort concerns",
          "What residents usually want fixed",
        ],
        seed + 3,
      ),
      body: `${service.detailedDescription}`,
      bullets: rotate(service.customerProblems, seed).slice(0, 6),
    },
    {
      key: "buying-guide",
      title: pick(
        [
          `Buying guide for ${service.shortName.toLowerCase()} in ${place}`,
          "How to choose the right specification",
          "Checklist before you approve a quotation",
        ],
        seed + 4,
      ),
      body: `Use this checklist when evaluating ${service.name.toLowerCase()} for a home in ${placeFull}. It keeps the conversation focused on usefulness, not buzzwords.`,
      bullets: buyingGuideBullets,
    },
    {
      key: "materials-longevity",
      title: pick(
        ["Materials & durability factors", "What affects longevity outdoors", "Specification talk on site"],
        seed + 5,
      ),
      body: `Material grade, coating, mesh type and fixing hardware are confirmed after seeing the opening. In Tamil Nadu, humidity and sun exposure are part of that conversation for ${place}.`,
      bullets: rotate(
        [...service.materials, ...service.specifications, ...service.benefits.slice(0, 3)],
        seed,
      ).slice(0, 7),
    },
    {
      key: "installation",
      title: pick(
        ["Installation process", "From inspection to handover", "How the job typically runs"],
        seed + 6,
      ),
      body: `A clear process reduces surprises for apartment and independent-house work in ${place}.`,
      bullets: processBullets,
    },
    {
      key: "safety-maintenance",
      title: pick(
        ["Safety & maintenance", "Aftercare that actually helps", "Responsible use guidance"],
        seed + 7,
      ),
      body: `Safety depends on correct layout, secure fixing and everyday habits. Maintenance keeps the system cleaner and easier to inspect.`,
      bullets: [...safetyBullets, ...maintenanceBullets].slice(0, 8),
    },
    {
      key: "compare",
      title: pick(
        ["How this compares with alternatives", "Quick comparison notes", "Choose by intent, not by synonym"],
        seed + 8,
      ),
      body: `Searchers often mix related terms. Matching the system to intent avoids buying the wrong product for ${placeFull}.`,
      bullets: compareBullets,
    },
    {
      key: "mistakes",
      title: pick(
        ["Common mistakes to avoid", "What we caution customers about", "Decision pitfalls"],
        seed + 9,
      ),
      body: `Avoiding these mistakes usually saves time and rework on ${service.name.toLowerCase()} projects.`,
      bullets: mistakesBullets,
    },
    {
      key: "pricing",
      title: pick(
        [`Pricing factors in ${place}`, "What changes the quotation", "Cost drivers explained"],
        seed + 10,
      ),
      body: `There is no honest fixed rate that fits every balcony in ${placeFull}. Quotation quality depends on measured openings and access.`,
      bullets: rotate(service.pricingFactors, seed).slice(0, 6),
    },
  ];

  return rotate(sections, seed).map((section, index) =>
    index === 0
      ? section
      : section,
  );
}

export function composeUniqueFaqs(
  service: Service,
  place: string,
  cityName: string,
  options?: { keywords?: string[] },
): Array<{ question: string; answer: string }> {
  const seed = hashSeed(`${service.slug}|${place}|faq`);
  const kw = options?.keywords ?? [];
  const k0 = kw[seed % Math.max(kw.length, 1)] ?? `${service.name.toLowerCase()} in ${place}`;
  const k1 = kw[(seed + 3) % Math.max(kw.length, 1)] ?? `${service.shortName.toLowerCase()} price`;
  const k2 = kw[(seed + 7) % Math.max(kw.length, 1)] ?? `${service.shortName.toLowerCase()} installation`;
  const base = [
    {
      question: `Is ${service.name.toLowerCase()} available in ${place}?`,
      answer: `Yes — we schedule measurement visits for ${place} under our Tamil Nadu coverage model. Availability is confirmed before appointment booking.`,
    },
    {
      question: `What affects ${service.name.toLowerCase()} price in ${place}?`,
      answer: `Opening size, count, material grade, access/height, spacing needs and finishing details. We quote after measurement rather than publishing fake fixed rates.`,
    },
    {
      question: `Do people search “${k0}” for the same service?`,
      answer: `Yes. Phrases like “${k0}”, “${k1}” and “${k2}” usually map to the same measured ${service.shortName.toLowerCase()} install in ${place} — modifiers describe intent (price, installation, application), not a different product page.`,
    },
    {
      question: `Do apartments in ${cityName} need association approval?`,
      answer: `Many do. We recommend checking society rules for balcony or exterior work before installation day.`,
    },
    {
      question: `How is ${service.shortName.toLowerCase()} different from mosquito mesh?`,
      answer:
        service.slug.includes("mosquito")
          ? `Mosquito nets are insect screens. If you also need fall protection, ask about safety nets or invisible grills as a separate system.`
          : `Mosquito mesh is for insects. ${service.shortName} is specified for a different job — fall protection, exclusion or utility use depending on the product.`,
    },
    {
      question: `Can you plan for child safety in ${place}?`,
      answer: `Yes. We discuss closer spacing and secure terminations when child safety is the goal, while being clear that supervision still matters.`,
    },
    {
      question: `What should I prepare for the free inspection?`,
      answer: `Share your area in ${cityName}, property type, approximate openings, floor access notes and any photos. On site we measure and confirm scope.`,
    },
    {
      question: `Do you invent branch offices in every locality?`,
      answer: `No. Pages for ${place} describe service coverage we can genuinely support — not fake storefront claims.`,
    },
    {
      question: `Which related services do customers compare?`,
      answer: `People often compare ${service.name.toLowerCase()} with ${service.relatedServiceIds.length ? "related grill/net options listed on this page" : "balcony nets, invisible grills and bird-control systems"} based on the opening and risk.`,
    },
  ];
  const extras = [
    {
      question: `How long does ${service.shortName.toLowerCase()} installation take in ${place}?`,
      answer: `Timelines depend on opening count, access and finishing complexity in ${place}. We share a clearer schedule after measurement.`,
    },
    {
      question: `What warranty can I expect for ${service.shortName.toLowerCase()}?`,
      answer:
        "Warranty terms are confirmed in writing with the quotation after material selection — we do not publish vague one-size warranty claims.",
    },
    {
      question: `Can I book only a free inspection in ${cityName}?`,
      answer: `Yes. Share your locality in ${cityName}, property type and openings. An inspection helps confirm whether ${service.name.toLowerCase()} is the right system.`,
    },
    {
      question: `What does ${service.name.toLowerCase()} mean in simple terms?`,
      answer: `${service.summary} The right specification still depends on measured openings in ${place}.`,
    },
    {
      question: `Which openings in ${place} usually need ${service.shortName.toLowerCase()}?`,
      answer: `Common applications include ${service.applications.slice(0, 4).join(", ").toLowerCase() || "balconies and windows"}. A site visit confirms what fits your home in ${place}.`,
    },
    {
      question: `How do I compare ${service.shortName.toLowerCase()} with alternatives in ${cityName}?`,
      answer:
        "Compare by intent first: fall protection, insect screening, bird exclusion, monkey exclusion or drying utility. Matching the job prevents buying the wrong system.",
    },
    {
      question: `What should a good quotation for ${place} include?`,
      answer: `Opening-by-opening measurements, named material assumptions, spacing intent, access notes and written warranty terms where applicable.`,
    },
    {
      question: `Are maintenance needs different in ${cityName}?`,
      answer: `Humidity, dust and monsoon splash can affect cleaning intervals. Soft cleaning and visual checks after severe weather are practical habits for outdoor systems.`,
    },
    {
      question: `Who installs balcony safety systems in ${place}?`,
      answer: `Glory Invisible Grills schedules measurement visits for ${place} under Tamil Nadu coverage. Call or WhatsApp to confirm appointment availability.`,
    },
    {
      question: `Which safety solution is best for apartments in ${cityName}?`,
      answer: `It depends on intent: invisible grills for discreet fall-risk coverage, safety nets for denser mesh, bird nets for roosting exclusion, or mosquito nets for insects. Measurement confirms the fit.`,
    },
    {
      question: `How can I protect my balcony from birds in ${place}?`,
      answer: `Bird nets or spikes may help depending on roosting points. Fall protection is a separate intent — ask for the right system after a site look in ${place}.`,
    },
    {
      question: `What is the safest balcony protection option for children in ${place}?`,
      answer: `Closer spacing on safety nets or invisible grills can help, but supervision still matters. We discuss layout during the free inspection in ${place}.`,
    },
    {
      question: `Which net is suitable for pets in ${cityName}?`,
      answer: `Pet safety nets or pet safety grills are planned around pet size and behaviour. Share honest details during measurement so spacing matches real risk.`,
    },
    {
      question: `Which protection system preserves the view in ${place}?`,
      answer: `Invisible grills are often chosen when households want open sightlines. Final look still depends on spacing and finishing confirmed on site.`,
    },
    {
      question: `What safety option works for high-rise apartments in ${cityName}?`,
      answer: `High-rise work needs access planning, secure fixing and clear scope. Invisible grills or safety nets can both work when measured for the actual openings.`,
    },
    {
      question: `Who installs ${service.shortName.toLowerCase()} near me in ${place}?`,
      answer: `Glory Invisible Grills covers ${place} under its Tamil Nadu service map. A measurement visit can usually be scheduled by phone or WhatsApp — confirm the slot when you call.`,
    },
    {
      question: `Is same-day ${service.shortName.toLowerCase()} installation available near ${place}?`,
      answer: `Same-day visits depend on team schedules and material readiness for your opening sizes. Share measurements over WhatsApp for the fastest realistic timeline in ${place}.`,
    },
    {
      question: `Which ${service.shortName.toLowerCase()} company is closest to me in ${cityName}?`,
      answer: `Distance matters less than measurement accuracy and honest material grades. Glory serves all of ${cityName}, so ask for a site visit rather than choosing on proximity alone.`,
    },
    {
      question: `How do I get a free ${service.shortName.toLowerCase()} estimate near me in ${place}?`,
      answer: `Call or WhatsApp with your locality and rough opening count. A visit to ${place} confirms measurements, and the written estimate lists materials and scope openly.`,
    },
  ];

  return rotate([...base, ...extras], seed);
}
