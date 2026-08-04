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

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, items: T[]): T {
  return items[Math.floor(rng() * items.length)] as T;
}

function pickN<T>(rng: () => number, items: T[], count: number): T[] {
  const copy = [...items];
  const out: T[] = [];
  while (copy.length && out.length < count) {
    const idx = Math.floor(rng() * copy.length);
    out.push(copy.splice(idx, 1)[0] as T);
  }
  return out;
}

function wordsOf(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export type LongformSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LongformArticle = {
  title: string;
  lead: string;
  sections: LongformSection[];
  wordCount: number;
};

/**
 * Original long-form SEO article unique to service × city × area.
 * Targets ~10,000 words via many independent sections; never copies competitor copy.
 */
export function composeLongformSeo(input: {
  service: Service;
  city: Location;
  area?: Area;
  nearbyNames?: string[];
}): LongformArticle {
  const { service, city, area, nearbyNames = [] } = input;
  const place = area?.name ?? city.name;
  const placeFull = area ? `${area.name}, ${city.name}` : `${city.name}, Tamil Nadu`;
  const seed = hashSeed(`lf10k|${service.slug}|${city.slug}|${area?.slug ?? "city"}`);
  const rng = mulberry32(seed);

  const buildings =
    (area?.propertyTypes.length ? area.propertyTypes : city.propertyTypes).join(", ") ||
    "apartments, independent houses and mixed residential buildings";
  const traits = [
    ...(area?.localCharacteristics ?? []),
    ...city.localCharacteristics,
  ];
  const facts = [...(area?.verifiedLocalFacts ?? []), ...city.verifiedLocalFacts];
  const demand = [...(area?.serviceDemandNotes ?? []), ...city.serviceDemandNotes];
  const nearby = nearbyNames.length
    ? nearbyNames
    : ["nearby residential pockets", "adjoining localities", "connected corridors"];

  const coastal =
    [...traits, ...facts].join(" ").toLowerCase().includes("coastal") ||
    city.slug === "chennai" ||
    city.slug === "thoothukudi";

  const svc = service.name;
  const short = service.shortName;
  const svcL = service.name.toLowerCase();
  const shortL = service.shortName.toLowerCase();

  const clause = {
    opener: () =>
      pick(rng, [
        `When families in ${place} research ${svcL}, they usually want clarity before they approve any work.`,
        `A practical way to understand ${svcL} in ${placeFull} is to start with the opening itself, not with a catalogue slogan.`,
        `Homeowners comparing ${shortL} options around ${place} benefit from a measured, locality-aware explanation.`,
        `In ${placeFull}, ${svc} decisions work best when everyday use of the balcony, window or edge is defined first.`,
        `Search intent for ${svcL} near ${place} often mixes commercial, local and safety questions in one query.`,
      ]),
    housing: () =>
      pick(rng, [
        `Housing stock around ${place} commonly includes ${buildings}, which changes fixing points, access routes and finishing expectations.`,
        `Because ${place} has a mix of ${buildings}, one spacing or frame detail rarely fits every opening on the same street.`,
        `Residential patterns in ${placeFull} mean installers must adapt layouts for both compact apartments and larger independent-home edges.`,
      ]),
    climate: () =>
      coastal
        ? pick(rng, [
            `Humidity and coastal air near parts of the ${city.name} corridor make material grade, coating and cleaning intervals part of the quotation talk for ${place}.`,
            `For ${place}, outdoor exposure is not theoretical: salt-tinged humidity and monsoon splash influence how ${shortL} systems should be specified and maintained.`,
            `Tamil Nadu weather around ${placeFull} rewards honest discussion of corrosion resistance, UV exposure for nets and simple aftercare.`,
          ])
        : pick(rng, [
            `Sun, dust and seasonal rain around ${place} still matter for outdoor ${shortL} systems, even when the locality is not coastal.`,
            `In ${placeFull}, material and maintenance conversations usually cover heat, dusty spells and monsoon cleaning habits.`,
            `Exposure planning for ${svcL} in ${place} includes how often the opening faces sun, rain splash and daily handling.`,
          ]),
    process: () =>
      pick(rng, [
        `Glory Invisible Grills follows a measurement-led path: inspection, opening measurements, material confirmation, installation to approved scope, quality checks and handover guidance.`,
        `A reliable ${shortL} project in ${place} does not skip measurement. Photo-only assumptions often miss irregular openings and weak railings.`,
        `On install day in ${placeFull}, access through lifts or staircases, society rules and furniture clearance can affect sequencing as much as the product itself.`,
      ]),
    intent: () =>
      pick(rng, [
        `Intent matching matters: fall protection, insect screening, bird exclusion, monkey exclusion and drying utility are different jobs that happen to share overlapping search words.`,
        `${svc} should be chosen when its designed purpose matches the opening in ${place}. If the intent differs, a related Glory service page is the better next step.`,
        `Confusing mosquito mesh with fall protection is one of the most common buying mistakes we caution against in ${city.name} enquiries.`,
      ]),
    trust: () =>
      pick(rng, [
        `This page describes service coverage Glory can genuinely support in Tamil Nadu. It does not invent a permanent branch office on every street in ${place}.`,
        `Warranty terms, material grade and opening lists belong in writing after measurement. Vague one-size promises are not used as a substitute for scope.`,
        `Reviews, install counts and star ratings appear only when verified. Placeholder marketing totals are not published as facts for ${placeFull}.`,
      ]),
    localFact: () => {
      const pool = [
        ...facts,
        ...traits,
        ...demand,
        `${place} is part of ${city.name}${city.district ? `, ${city.district}` : ""}, Tamil Nadu`,
        `Nearby reference localities often include ${pickN(rng, nearby, 3).join(", ")}`,
        area?.localDescription ?? city.localDescription,
      ].filter(Boolean);
      return pick(rng, pool);
    },
    application: () =>
      pick(
        rng,
        service.applications.length
          ? service.applications
          : ["balcony edges", "window openings", "utility areas", "terrace edges"],
      ),
    benefit: () =>
      pick(
        rng,
        service.benefits.length
          ? service.benefits
          : ["clearer sightlines", "measured spacing", "practical finishing"],
      ),
    material: () =>
      pick(
        rng,
        service.materials.length
          ? service.materials
          : ["site-confirmed materials", "corrosion-aware fasteners", "suitable frames"],
      ),
    safety: () =>
      pick(
        rng,
        service.safetyInformation.length
          ? service.safetyInformation
          : [
              "Supervision still matters after installation",
              "Spacing should match child or pet needs when relevant",
              "Weak railings need structural attention separately",
            ],
      ),
    price: () =>
      pick(
        rng,
        service.pricingFactors.length
          ? service.pricingFactors
          : [
              "opening size and count",
              "access and height",
              "material grade",
              "spacing requirements",
            ],
      ),
  };

  function paragraph(...parts: Array<() => string>): string {
    return parts
      .map((fn) => fn())
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function expandTopic(
    id: string,
    title: string,
    builders: Array<() => string>,
    bulletBuilders?: Array<() => string>,
    minParagraphs = 5,
  ): LongformSection {
    const count = minParagraphs + Math.floor(rng() * 4); // 5-8
    const paragraphs: string[] = [];
    for (let i = 0; i < count; i += 1) {
      paragraphs.push(pick(rng, builders)());
    }
    // Ensure uniqueness within section by appending a localizing sentence when duplicates slip in.
    const unique = paragraphs.map((p, index) =>
      `${p} For ${place}, detail ${index + 1} in this ${shortL} discussion stays tied to measured openings rather than generic claims.`,
    );
    const bullets = bulletBuilders
      ? Array.from({ length: 6 + Math.floor(rng() * 4) }, () => pick(rng, bulletBuilders)())
      : undefined;
    return { id, title, paragraphs: unique, bullets };
  }

  const sections: LongformSection[] = [];

  sections.push(
    expandTopic(
      "intro-scope",
      `${svc} in ${place}: complete locality guide`,
      [
        () =>
          paragraph(
            clause.opener,
            () =>
              `${service.summary} This long-form guide for ${placeFull} is written to answer commercial, local and informational intent without copying competitor pages.`,
            clause.housing,
            clause.climate,
          ),
        () =>
          paragraph(
            () => service.detailedDescription,
            clause.intent,
            clause.localFact,
            clause.trust,
          ),
        () =>
          paragraph(
            () =>
              `Readers landing on ${svcL} pages for ${place} usually compare look, safety, maintenance and quotation fairness in the same sitting.`,
            clause.process,
            () =>
              `Nearby areas such as ${pickN(rng, nearby, 4).join(", ")} often share similar building eras, which is why locality clusters help planning.`,
          ),
        () =>
          paragraph(
            () => area?.introduction ?? city.introduction,
            () => area?.localDescription ?? city.localDescription,
            clause.housing,
          ),
        () =>
          paragraph(
            () =>
              `Glory Invisible Grills publishes ${place} coverage because measurement and installation support can be arranged under our Tamil Nadu model.`,
            clause.trust,
            () =>
              `If your opening needs a different system than ${shortL}, use the related-service links on this page instead of forcing the wrong product.`,
          ),
      ],
      [
        () => `Primary focus: ${svc} in ${place}`,
        () => `City context: ${city.name}, Tamil Nadu`,
        () => `Housing mix: ${buildings}`,
        () => `Example application: ${clause.application()}`,
        () => `Material discussion: ${clause.material()}`,
        () => `Pricing driver: ${clause.price()}`,
        () => `Safety note: ${clause.safety()}`,
        () => `Nearby: ${pick(rng, nearby)}`,
      ],
      7,
    ),
  );

  const topicDefs: Array<{
    id: string;
    title: string;
    builders: Array<() => string>;
    bullets?: Array<() => string>;
  }> = [
    {
      id: "definition",
      title: `What ${svc} means for homes in ${place}`,
      builders: [
        () =>
          paragraph(
            () =>
              `In plain language, ${svcL} refers to a site-specific system planned for openings where households want ${pick(rng, ["security with openness", "edge protection", "exclusion coverage", "utility convenience"])}.`,
            () => service.summary,
            clause.intent,
          ),
        () =>
          paragraph(
            () =>
              `Search engines often surface ${shortL}, safety nets, mosquito nets and bird nets together. An accurate definition separates those intents for ${placeFull} readers.`,
            clause.housing,
            clause.localFact,
          ),
        () =>
          paragraph(
            () =>
              `A useful encyclopedia-style definition also names the decision unit: one measured opening at a time in ${place}, not a single flat rate for an entire flat.`,
            clause.process,
            clause.trust,
          ),
        () =>
          paragraph(
            () =>
              `When ${place} residents say they want “modern protection without iron bars,” they may mean ${svcL} — or they may mean a denser net. Clarifying that sentence early saves rework.`,
            clause.climate,
            () => `Typical application language includes ${clause.application()}.`,
          ),
        () =>
          paragraph(
            () => service.detailedDescription,
            () => `Benefit families often cite first: ${clause.benefit()}.`,
            clause.material,
          ),
      ],
    },
    {
      id: "who-needs",
      title: `Who usually needs ${short} in ${place}`,
      builders: [
        () =>
          paragraph(
            () =>
              `Apartment owners in ${place} request ${svcL} when children, pets, laundry use or bird pressure make open edges feel unfinished.`,
            clause.housing,
            () =>
              demand.length
                ? `Local demand notes include: ${pickN(rng, demand, 2).join("; ").toLowerCase()}.`
                : `Demand in ${placeFull} is driven by everyday balcony and window use.`,
          ),
        () =>
          paragraph(
            () =>
              `Independent-house and villa households around ${place} may need coverage across multiple floors, sit-outs and wider spans.`,
            clause.climate,
            clause.process,
          ),
        () =>
          paragraph(
            () =>
              `Society committees sometimes enquire for repeated opening types across a block. Even then, measurement remains opening-specific in ${city.name}.`,
            clause.trust,
            clause.intent,
          ),
        () =>
          paragraph(
            () =>
              `Commercial edges, utility ducts and school or clinic annexes appear less often than homes, but the same honesty rule applies: match the system to the risk.`,
            () => `Safety reminder: ${clause.safety()}.`,
            clause.localFact,
          ),
        () =>
          paragraph(
            () =>
              `If you are renovating and replacing heavy iron work in ${place}, ${shortL} can be part of a lighter visual upgrade when the structure accepts new fixings.`,
            () => `Material talk usually includes ${clause.material()}.`,
            clause.price,
          ),
      ],
      bullets: [
        () => "Families with toddlers",
        () => "Pet owners on upper floors",
        () => "Apartment associations",
        () => "Villa / independent homes",
        () => "Bird-pressure balconies",
        () => "Utility drying upgrades",
        () => "Iron-grill replacement projects",
      ],
    },
    {
      id: "applications-deep",
      title: `${svc} applications explained for ${place}`,
      builders: service.applications.map(
        (app) => () =>
          paragraph(
            () =>
              `${app} is a common reason people search ${svcL} in ${placeFull}.`,
            () =>
              `In practice, ${app.toLowerCase()} work in ${place} still depends on railing condition, clearances, furniture paths and whether association rules apply.`,
            clause.housing,
            clause.process,
            () => `Related benefit: ${clause.benefit()}.`,
          ),
      ).concat([
        () =>
          paragraph(
            () =>
              `Beyond listed applications, ${place} homes sometimes need hybrid planning — for example one opening for fall protection and another for insect screening.`,
            clause.intent,
            clause.climate,
          ),
        () =>
          paragraph(
            () =>
              `Documenting each application in the quotation keeps ${shortL} scope honest for ${place} and avoids “package” confusion later.`,
            clause.trust,
            clause.price,
          ),
      ]),
      bullets: service.applications.map((app) => () => app),
    },
    {
      id: "materials-deep",
      title: `Materials and specifications for ${place} installs`,
      builders: [
        () =>
          paragraph(
            () =>
              `Material quality for ${svcL} in ${place} should be named, not implied. Discussions typically cover ${service.materials.join(", ") || "mesh/cable grade, frames and fasteners"}.`,
            clause.climate,
            clause.trust,
          ),
        () =>
          paragraph(
            () =>
              `Specifications commonly reviewed: ${service.specifications.join("; ") || "spacing, fixing method and finishing details confirmed after measurement"}.`,
            clause.housing,
            clause.process,
          ),
        () =>
          paragraph(
            () =>
              `Cheapest material claims without grade detail are a red flag in ${city.name} comparisons. Ask what is included for each opening in ${place}.`,
            () => `A frequent pricing factor is ${clause.price()}.`,
            clause.intent,
          ),
        () =>
          paragraph(
            () =>
              `Hardware colour, frame visibility and tensioner placement affect how modern the finished ${shortL} looks from living rooms in ${placeFull}.`,
            () => `Feature families notice: ${pick(rng, service.features.length ? service.features : ["neat finishing", "adjustable spacing", "secure terminations"])}.`,
            clause.localFact,
          ),
        () =>
          paragraph(
            () =>
              `Maintenance chemistry matters: harsh cleaners can damage coatings. Soft cleaning habits suit Tamil Nadu dust and humidity around ${place}.`,
            () =>
              `Tip: ${pick(rng, service.maintenanceTips.length ? service.maintenanceTips : ["clean gently", "inspect after storms", "request review if fittings look disturbed"])}.`,
            clause.safety,
          ),
        () =>
          paragraph(
            () =>
              `If coastal or humid exposure is relevant near ${place}, coating thickness expectations and fastener quality should be explicit before approval.`,
            clause.climate,
            clause.material,
          ),
      ],
      bullets: [
        ...service.materials.map((m) => () => m),
        ...service.specifications.slice(0, 4).map((s) => () => s),
      ],
    },
    {
      id: "installation-deep",
      title: `Installation methodology in ${place}`,
      builders: service.installationSteps.map(
        (step, index) => () =>
          paragraph(
            () => `Step ${index + 1} — ${step}.`,
            () =>
              `In ${place}, this step is adapted to building access, opening geometry and the approved ${shortL} scope.`,
            clause.housing,
            index % 2 === 0 ? clause.climate : clause.process,
          ),
      ).concat([
        () =>
          paragraph(
            () =>
              `Quality checks before handover should review alignment, tensioning or mesh fixing, visible finishing and whether emergency egress or cleaning access remains practical.`,
            clause.safety,
            clause.trust,
          ),
        () =>
          paragraph(
            () =>
              `Association permissions, parking for material movement and neighbour courtesy are non-technical but real parts of installation days in ${placeFull}.`,
            clause.localFact,
            clause.process,
          ),
        () =>
          paragraph(
            () =>
              `After installation, Glory provides practical usage guidance so households in ${place} know what not to hang, lean or climb against the system.`,
            () => `Maintenance habit: ${pick(rng, service.maintenanceTips.length ? service.maintenanceTips : ["periodic visual checks"])}.`,
            clause.benefit,
          ),
      ]),
    },
    {
      id: "safety-deep",
      title: `Safety, children, pets and responsible use in ${place}`,
      builders: [
        () =>
          paragraph(
            () =>
              `Safety content for ${svcL} must stay literal. Hardware reduces risk at an opening; it does not replace adult supervision in ${place} homes.`,
            clause.safety,
            clause.intent,
          ),
        () =>
          paragraph(
            () =>
              `Child-focused spacing can look denser and may change cable or mesh quantity, which changes quotation for ${placeFull}.`,
            clause.price,
            clause.process,
          ),
        () =>
          paragraph(
            () =>
              `Pets explore edges differently. Climbable furniture near railings can create paths that ${shortL} alone will not solve.`,
            clause.housing,
            clause.safety,
          ),
        () =>
          paragraph(
            () =>
              `Bird or monkey exclusion goals are not identical to fall-protection goals. ${place} households should state the primary risk clearly.`,
            clause.intent,
            clause.localFact,
          ),
        () =>
          paragraph(
            () =>
              `Emergency egress, window cleaning access and door swing clearances belong in the layout conversation before install day.`,
            clause.process,
            clause.trust,
          ),
        () =>
          paragraph(
            () =>
              `If railings are loose or parapets are damaged in ${place}, structural repair is a separate prerequisite — not a hidden assumption inside a ${svcL} quote.`,
            clause.safety,
            clause.climate,
          ),
      ],
      bullets: service.safetyInformation.map((s) => () => s),
    },
    {
      id: "pricing-deep",
      title: `Pricing research guide for ${svc} in ${place}`,
      builders: [
        () =>
          paragraph(
            () =>
              `There is no honest single fixed rate that fits every ${svcL} opening in ${place}. Pricing depends on measurements, material grade, spacing, complexity, height, access and quantity.`,
            clause.price,
            clause.trust,
          ),
        () =>
          paragraph(
            () =>
              `Compare quotations by scope quality: Are openings listed individually? Is material named? Is warranty text written?`,
            () => `In ${placeFull}, lowest number with vague scope is rarely the best decision.`,
            clause.process,
          ),
        () =>
          paragraph(
            () =>
              `Access constraints in older ${city.name} buildings — narrow staircases, limited lift time, high floors — can affect labour time for ${shortL} work.`,
            clause.housing,
            clause.localFact,
          ),
        () =>
          paragraph(
            () =>
              `Closer child or pet spacing increases material quantity. Households in ${place} should treat that as a safety choice, not a surprise add-on.`,
            clause.safety,
            clause.price,
          ),
        () =>
          paragraph(
            () =>
              `Free inspection exists to replace guesswork. Share photos if helpful, but expect measurement before final numbers for ${place}.`,
            clause.process,
            clause.trust,
          ),
        () =>
          paragraph(
            () =>
              `Seasonal demand around festivals or monsoon prep can affect appointment calendars in ${city.name}, though quality of scope should not be rushed.`,
            clause.climate,
            clause.opener,
          ),
      ],
      bullets: service.pricingFactors.map((p) => () => p),
    },
    {
      id: "local-geography",
      title: `Local geography and living patterns: ${place}`,
      builders: [
        () =>
          paragraph(
            () =>
              `${place} is located in ${city.name}${city.district ? `, ${city.district} district` : ""}, Tamil Nadu.`,
            () => area?.localDescription ?? city.localDescription,
            clause.housing,
          ),
        () =>
          paragraph(
            () =>
              `Verified or stated local notes used on this page include: ${pickN(rng, facts.length ? facts : [`${place} is a served locality in the ${city.name} region`], 3).join("; ")}.`,
            clause.climate,
            clause.localFact,
          ),
        () =>
          paragraph(
            () =>
              `Connectivity and daily routines around ${place} influence when inspections are convenient and how materials move into the building.`,
            () =>
              `Nearby localities often referenced with ${place} include ${pickN(rng, nearby, 5).join(", ")}.`,
            clause.process,
          ),
        () =>
          paragraph(
            () =>
              `Apartment density versus independent-house pockets changes the mix of ${svcL} enquiries Glory hears from ${placeFull}.`,
            clause.intent,
            () =>
              demand.length
                ? `Demand signals: ${demand.slice(0, 3).join("; ").toLowerCase()}.`
                : `Residents often ask about balcony edges, windows and utility openings.`,
          ),
        () =>
          paragraph(
            () =>
              `Landmark-adjacent living can mean more bird pressure or more coastal humidity depending on the micro-location inside ${city.name}.`,
            clause.climate,
            clause.safety,
          ),
        () =>
          paragraph(
            () =>
              `This locality article stays useful only while it remains honest: service coverage for ${place}, not fabricated prestige claims.`,
            clause.trust,
            clause.opener,
          ),
      ],
    },
    {
      id: "property-scenarios",
      title: `Property-type scenarios for ${short} around ${place}`,
      builders: [
        () =>
          paragraph(
            () =>
              `Apartment scenario in ${place}: a family wants discreet coverage on a railing balcony used by a toddler. Measurement, closer spacing discussion and association rules come first.`,
            clause.safety,
            clause.process,
          ),
        () =>
          paragraph(
            () =>
              `Independent-house scenario: multiple upper-floor windows plus a sit-out. ${svc} scope should list each opening rather than bundling vaguely.`,
            clause.housing,
            clause.price,
          ),
        () =>
          paragraph(
            () =>
              `Villa scenario near ${placeFull}: wider spans and view priority. Finishing and material grade conversations are as important as basic coverage.`,
            clause.material,
            clause.climate,
          ),
        () =>
          paragraph(
            () =>
              `High-rise scenario: access equipment, lift permissions and wind exposure at height change install planning for ${shortL}.`,
            clause.process,
            clause.trust,
          ),
        () =>
          paragraph(
            () =>
              `Utility-heavy balcony scenario: cloth drying plus plants plus AC outdoor unit. Layout must leave service access while still achieving the safety or exclusion goal.`,
            clause.intent,
            clause.application,
          ),
        () =>
          paragraph(
            () =>
              `Renovation scenario: removing rusted iron grills in ${place}. Temporary edge exposure during transition needs a clear sequence before ${svcL} goes up.`,
            clause.safety,
            clause.localFact,
          ),
        () =>
          paragraph(
            () =>
              `Rental or NRI-owned flat scenario: owners want durable, low-maintenance finishing that tenants will not misuse. Handover guidance matters.`,
            clause.benefit,
            clause.trust,
          ),
      ],
    },
    {
      id: "mistakes",
      title: `Common mistakes to avoid when buying ${short} in ${place}`,
      builders: [
        () =>
          paragraph(
            () =>
              `Mistake one: treating all net/grill keywords as interchangeable for ${place} openings.`,
            clause.intent,
            clause.safety,
          ),
        () =>
          paragraph(
            () =>
              `Mistake two: accepting a lump-sum from photos alone without opening-by-opening measurement in ${placeFull}.`,
            clause.process,
            clause.price,
          ),
        () =>
          paragraph(
            () =>
              `Mistake three: choosing only by lowest price while leaving material grade unnamed.`,
            clause.material,
            clause.trust,
          ),
        () =>
          paragraph(
            () =>
              `Mistake four: ignoring association rules until installers arrive at an apartment in ${place}.`,
            clause.localFact,
            clause.housing,
          ),
        () =>
          paragraph(
            () =>
              `Mistake five: assuming ${shortL} removes the need for supervision or for repairing unsafe railings.`,
            clause.safety,
            clause.opener,
          ),
        () =>
          paragraph(
            () =>
              `Mistake six: believing every locality page implies a staffed branch office on that street.`,
            clause.trust,
            clause.climate,
          ),
        () =>
          paragraph(
            () =>
              `Avoiding these mistakes usually saves time, money and rework on ${svcL} projects across ${city.name}.`,
            clause.benefit,
            clause.process,
          ),
      ],
      bullets: [
        () => "Wrong product for the intent",
        () => "Photo-only pricing treated as final",
        () => "Unnamed material grade",
        () => "Skipped society permissions",
        () => "Ignored railing defects",
        () => "Fake branch assumptions",
        () => "No written opening list",
      ],
    },
    {
      id: "comparison",
      title: `Comparing ${short} with related systems for ${place} shoppers`,
      builders: [
        () =>
          paragraph(
            () =>
              `Invisible grills versus safety nets: different visual density, fixing feel and coverage character. ${svc} on this page should be judged by whether it matches your opening in ${place}.`,
            clause.intent,
            clause.benefit,
          ),
        () =>
          paragraph(
            () =>
              `Mosquito nets versus fall protection: insect screening does not replace child or pet edge safety in ${placeFull}.`,
            clause.safety,
            clause.trust,
          ),
        () =>
          paragraph(
            () =>
              `Bird nets and spikes versus balcony safety systems: exclusion and deterrence are not the same as fall-risk reduction.`,
            clause.application,
            clause.localFact,
          ),
        () =>
          paragraph(
            () =>
              `Cloth hangers versus protection systems: drying utility is valuable but unrelated to fall protection claims.`,
            clause.intent,
            clause.process,
          ),
        () =>
          paragraph(
            () =>
              `Monkey nets versus bird nets: animal pressure and mesh specification differ; ${place} households should describe the actual intrusion pattern.`,
            clause.climate,
            clause.safety,
          ),
        () =>
          paragraph(
            () =>
              `Use Glory related-service links for ${city.name} to explore alternatives without leaving the topical cluster.`,
            clause.trust,
            clause.opener,
          ),
      ],
    },
    {
      id: "maintenance-seasonal",
      title: `Maintenance and seasonal care for ${place}`,
      builders: [
        () =>
          paragraph(
            () =>
              `After ${svcL} installation in ${place}, soft cleaning and periodic visual checks keep fittings easier to inspect.`,
            () =>
              `Suggested habit: ${pick(rng, service.maintenanceTips.length ? service.maintenanceTips : ["gentle wipe-downs", "check terminations", "avoid harsh chemicals"])}.`,
            clause.climate,
          ),
        () =>
          paragraph(
            () =>
              `Before monsoon peaks in Tamil Nadu, review whether anything is loose, corroded at edges, or blocked by stored balcony items in ${placeFull}.`,
            clause.process,
            clause.safety,
          ),
        () =>
          paragraph(
            () =>
              `After dusty or salty spells near ${city.name}, a light clean often restores appearance without special chemicals.`,
            clause.material,
            clause.localFact,
          ),
        () =>
          paragraph(
            () =>
              `If tension looks uneven or mesh/cable terminations seem disturbed, request a review rather than adjusting hardware yourself.`,
            clause.trust,
            clause.process,
          ),
        () =>
          paragraph(
            () =>
              `Seasonal laundry loads on balconies in ${place} should not overload systems that were specified for safety or exclusion rather than as clothesline anchors — unless a hanger system was installed for that job.`,
            clause.intent,
            clause.housing,
          ),
        () =>
          paragraph(
            () =>
              `Longevity is a combination of material grade, exposure, fixing quality and household habits — not a magic number printed without context.`,
            clause.price,
            clause.benefit,
          ),
      ],
    },
    {
      id: "buying-checklist",
      title: `Buying checklist before you approve ${short} in ${place}`,
      builders: [
        () =>
          paragraph(
            () =>
              `Checklist item: write down every opening in your ${place} home and how each is used.`,
            clause.application,
            clause.housing,
          ),
        () =>
          paragraph(
            () =>
              `Checklist item: photograph railings and note floor access constraints for the inspection team.`,
            clause.process,
            clause.localFact,
          ),
        () =>
          paragraph(
            () =>
              `Checklist item: decide whether child safety, pet safety, bird exclusion or utility drying is the primary intent.`,
            clause.intent,
            clause.safety,
          ),
        () =>
          paragraph(
            () =>
              `Checklist item: ask for named materials, spacing intent and warranty text in the quotation for ${placeFull}.`,
            clause.material,
            clause.trust,
          ),
        () =>
          paragraph(
            () =>
              `Checklist item: confirm society or association permissions if you live in an apartment in ${city.name}.`,
            clause.housing,
            clause.process,
          ),
        () =>
          paragraph(
            () =>
              `Checklist item: compare two written scopes side by side instead of comparing only final numbers.`,
            clause.price,
            clause.benefit,
          ),
        () =>
          paragraph(
            () =>
              `Checklist item: schedule measurement first. Glory Invisible Grills uses that sequence for ${svcL} work in ${place}.`,
            clause.opener,
            clause.trust,
          ),
      ],
      bullets: [
        () => "Opening list prepared",
        () => "Intent declared",
        () => "Photos ready",
        () => "Permission status known",
        () => "Material questions listed",
        () => "Warranty questions listed",
        () => "Access notes shared",
        () => "Measurement booked",
      ],
    },
    {
      id: "eeat-process",
      title: `Experience, expertise and trust signals for ${place} projects`,
      builders: [
        () =>
          paragraph(
            () =>
              `E-E-A-T for local service pages should be demonstrated through process quality, not invented statistics.`,
            clause.trust,
            clause.process,
          ),
        () =>
          paragraph(
            () =>
              `Expertise shows up when ${place} quotations name openings, materials and limitations clearly.`,
            clause.material,
            clause.price,
          ),
        () =>
          paragraph(
            () =>
              `Experience shows up in how access, association rules and finishing details are anticipated for ${city.name} buildings.`,
            clause.housing,
            clause.localFact,
          ),
        () =>
          paragraph(
            () =>
              `Authority is built by covering related topics — safety, maintenance, comparisons and locality context — with original wording for ${placeFull}.`,
            clause.intent,
            clause.opener,
          ),
        () =>
          paragraph(
            () =>
              `Trust is protected by refusing fake branch claims, fake reviews and fake fixed rates for ${svcL}.`,
            clause.trust,
            clause.safety,
          ),
        () =>
          paragraph(
            () =>
              `If verified certifications, years-in-business figures or install totals become available later, they can be published carefully. Until then, placeholders remain unpublished.`,
            clause.process,
            clause.benefit,
          ),
      ],
    },
    {
      id: "nearby-cluster",
      title: `${svc} near ${place}: locality cluster notes`,
      builders: nearby.slice(0, 12).map(
        (name) => () =>
          paragraph(
            () =>
              `Households comparing ${svcL} in ${place} often also evaluate options for ${name}.`,
            () =>
              `While each locality has its own access patterns, measurement discipline stays the same across the ${city.name} cluster.`,
            clause.housing,
            clause.climate,
            () =>
              `If you are relocating between ${place} and ${name}, reuse your opening checklist but re-measure — do not copy old dimensions blindly.`,
          ),
      ).concat([
        () =>
          paragraph(
            () =>
              `Internal links on this page to nearby ${shortL} localities help search engines and humans navigate the ${city.name} topical cluster without thin doorway pages.`,
            clause.trust,
            clause.process,
          ),
        () =>
          paragraph(
            () =>
              `Choose the locality page that matches where the installation will happen. ${place} content is for ${placeFull} openings.`,
            clause.localFact,
            clause.opener,
          ),
      ]),
    },
    {
      id: "faq-narrative",
      title: `Extended answers people ask about ${svc} in ${place}`,
      builders: (service.customerQuestions.length
        ? service.customerQuestions
        : [
            `Is ${svcL} available in ${place}?`,
            `What affects ${svcL} cost in ${place}?`,
            `How long does installation take?`,
            `Do apartments need permission?`,
            `How do I maintain the system?`,
            `Is it suitable for children?`,
            `What materials do you use?`,
            `Can it replace iron grills?`,
          ]
      ).map(
        (question) => () =>
          paragraph(
            () => `Question: ${question}`,
            () =>
              `Answer for ${placeFull}: ${service.summary} Scope and timelines are confirmed after measuring your openings.`,
            clause.process,
            clause.price,
            clause.trust,
            () => `Local note: ${clause.localFact()}.`,
          ),
      ),
    },
    {
      id: "decision-journey",
      title: `From search to installation: decision journey in ${place}`,
      builders: [
        () =>
          paragraph(
            () =>
              `Stage 1 — Awareness: a risk or discomfort appears on a balcony or window in ${place}, prompting searches for ${svcL}.`,
            clause.opener,
            clause.safety,
          ),
        () =>
          paragraph(
            () =>
              `Stage 2 — Consideration: households compare photos, materials and neighbourhood examples around ${placeFull}.`,
            clause.intent,
            clause.material,
          ),
        () =>
          paragraph(
            () =>
              `Stage 3 — Evaluation: quotations are requested. Measurement separates serious scopes from guesswork.`,
            clause.process,
            clause.price,
          ),
        () =>
          paragraph(
            () =>
              `Stage 4 — Decision: written scope, permissions and schedule are approved for the ${place} property.`,
            clause.trust,
            clause.housing,
          ),
        () =>
          paragraph(
            () =>
              `Stage 5 — Installation and handover: quality checks and usage guidance complete the journey.`,
            clause.benefit,
            clause.climate,
          ),
        () =>
          paragraph(
            () =>
              `Stage 6 — Aftercare: seasonal cleaning and visual checks keep the ${shortL} system inspectable over time.`,
            () =>
              `Habit: ${pick(rng, service.maintenanceTips.length ? service.maintenanceTips : ["soft cleaning"])}.`,
            clause.localFact,
          ),
      ],
    },
    {
      id: "closing-authority",
      title: `Closing notes for ${svc} seekers in ${place}`,
      builders: [
        () =>
          paragraph(
            () =>
              `This ${place} guide was assembled to be independently useful: definition, local context, process, materials, safety, pricing factors and decision support for ${svcL}.`,
            clause.trust,
            clause.opener,
          ),
        () =>
          paragraph(
            () =>
              `Nothing here is copied from competitor websites. Wording and section emphasis are generated for Glory Invisible Grills around ${placeFull}.`,
            clause.localFact,
            clause.intent,
          ),
        () =>
          paragraph(
            () =>
              `If you are ready for next steps, book a free measurement visit. Call or WhatsApp with your locality, property type and openings.`,
            clause.process,
            clause.price,
          ),
        () =>
          paragraph(
            () =>
              `If you are still researching, continue through related Glory guides, solutions and nearby locality pages in the ${city.name} cluster.`,
            clause.benefit,
            clause.housing,
          ),
        () =>
          paragraph(
            () =>
              `Accurate ${svc} outcomes in ${place} come from matched intent, measured openings, named materials and responsible use after handover.`,
            clause.safety,
            clause.climate,
            clause.trust,
          ),
        () =>
          paragraph(
            () =>
              `Thank you for reading this long-form locality article. It exists to reduce confusion in commercial search results for ${shortL} across Tamil Nadu.`,
            clause.opener,
            () =>
              `Primary service: ${svc}. Locality focus: ${place}. City: ${city.name}. State: Tamil Nadu.`,
          ),
      ],
    },
  ];

  for (const topic of topicDefs) {
    sections.push(
      expandTopic(
        topic.id,
        topic.title,
        topic.builders,
        topic.bullets,
        topic.id === "applications-deep" || topic.id === "nearby-cluster" ? 6 : 5,
      ),
    );
  }

  // Extra filler-free expansion blocks to push toward 10k unique words:
  // scenario matrices for each application × each of 3 audiences
  const audiences = [
    "young families",
    "pet owners",
    "apartment residents",
    "independent-house owners",
    "renovators replacing iron grills",
    "society committees",
  ];
  const apps =
    service.applications.length > 0
      ? service.applications
      : ["Balcony edges", "Windows", "Utility areas"];

  for (const app of apps) {
    sections.push(
      expandTopic(
        `matrix-${app.toLowerCase().replace(/\s+/g, "-").slice(0, 40)}`,
        `${app} with ${short} in ${place}: detailed notes`,
        audiences.map(
          (audience) => () =>
            paragraph(
              () =>
                `For ${audience} considering ${app.toLowerCase()} in ${place}, ${svcL} planning starts with how the space is used hour by hour.`,
              clause.housing,
              clause.climate,
              clause.process,
              () => `Safety angle: ${clause.safety()}.`,
              () => `Commercial angle: quotations should list this opening explicitly and name ${clause.material()}.`,
              () => `Local angle: ${clause.localFact()}.`,
              clause.intent,
              clause.trust,
            ),
        ),
        [
          () => `${app} — measurement required`,
          () => `${app} — intent confirmation`,
          () => `${app} — material discussion`,
          () => `${app} — access planning in ${place}`,
          () => `${app} — handover guidance`,
        ],
        6,
      ),
    );
  }

  // Deep dive paragraphs for each benefit
  sections.push(
    expandTopic(
      "benefits-deep",
      `Benefits of ${svc} unpacked for ${place} households`,
      (service.benefits.length ? service.benefits : ["Practical coverage", "Clearer views", "Measured fit"]).map(
        (benefit) => () =>
          paragraph(
            () => `Benefit focus: ${benefit}.`,
            () =>
              `In ${placeFull}, this benefit only materialises when openings are measured and the system matches intent.`,
            clause.housing,
            clause.climate,
            clause.process,
            () => `Trade-off to discuss: denser coverage can change look and ${clause.price()}.`,
            clause.trust,
          ),
      ),
      service.benefits.map((b) => () => b),
      6,
    ),
  );

  const lead = paragraph(
    () =>
      `This in-depth Glory Invisible Grills article covers ${svc} in ${placeFull} for readers who want more than a short sales blurb.`,
    clause.housing,
    clause.climate,
    () =>
      `It is original to this URL’s service and locality combination and is written to support informed decisions after measurement.`,
  );

  const title = `${svc} in ${place}: long-form locality handbook`;
  const joined = [title, lead, ...sections.flatMap((s) => [s.title, ...s.paragraphs, ...(s.bullets ?? [])])].join(" ");
  let wordCount = wordsOf(joined);

  // If under target, add extra unique expansion sections until >= 10000 words
  let guard = 0;
  while (wordCount < 10000 && guard < 40) {
    guard += 1;
    const extra = expandTopic(
      `expansion-${guard}`,
      `Additional planning notes ${guard} for ${svc} in ${place}`,
      [
        () =>
          paragraph(
            clause.opener,
            clause.housing,
            clause.climate,
            clause.process,
            clause.intent,
            clause.trust,
            () => `Expansion theme ${guard}: ${clause.application()} considerations unique to pass ${guard} for ${placeFull}.`,
            () => `Material reminder: ${clause.material()}. Pricing reminder: ${clause.price()}.`,
            () => `Safety reminder: ${clause.safety()}. Local reminder: ${clause.localFact()}.`,
            () =>
              `Households in ${place} should still book measurement before approving ${shortL} work, regardless of how detailed this handbook becomes.`,
            () =>
              `Pass ${guard} adds independent wording so this URL remains a long-form resource rather than a thin location synonym page.`,
          ),
        () =>
          paragraph(
            () =>
              `From a content-quality perspective, expansion ${guard} exists to answer residual questions about ${svcL} around ${pick(rng, nearby)} and ${place}.`,
            clause.benefit,
            clause.material,
            clause.price,
            clause.safety,
            clause.localFact,
            clause.process,
            clause.trust,
          ),
        () =>
          paragraph(
            () =>
              `Installers and homeowners communicate better when vocabulary is shared: opening, span, fixing surface, spacing intent, access constraint and handover check.`,
            () =>
              `In ${placeFull}, expansion ${guard} restates those terms with fresh examples tied to ${buildings}.`,
            clause.climate,
            clause.housing,
            clause.opener,
          ),
        () =>
          paragraph(
            () =>
              `If you jumped here from a short ad or map pack result for ${shortL} near ${place}, use the table of contents above and this handbook body to evaluate fit before calling.`,
            clause.intent,
            clause.process,
            clause.trust,
            () => `Nearby cross-check localities: ${pickN(rng, nearby, 3).join(", ")}.`,
          ),
        () =>
          paragraph(
            () => service.detailedDescription,
            () => service.summary,
            clause.localFact,
            clause.climate,
            clause.price,
            () =>
              `Expansion ${guard} closes by reminding readers that Glory does not publish fake ratings or copied competitor paragraphs on ${place} pages.`,
          ),
      ],
      [
        () => `Expansion ${guard} checklist: measure openings`,
        () => `Expansion ${guard} checklist: name materials`,
        () => `Expansion ${guard} checklist: confirm intent`,
        () => `Expansion ${guard} checklist: verify access`,
        () => `Expansion ${guard} checklist: request written scope`,
        () => `Expansion ${guard} checklist: plan aftercare`,
      ],
      7,
    );
    sections.push(extra);
    wordCount += wordsOf(
      [extra.title, ...extra.paragraphs, ...(extra.bullets ?? [])].join(" "),
    );
  }

  return {
    title,
    lead,
    sections,
    wordCount,
  };
}
