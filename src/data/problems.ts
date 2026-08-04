import type { Problem } from "@/types/content";

export const PROBLEMS: Problem[] = [
  {
    id: "prob-child-balcony-safety",
    slug: "child-balcony-safety",
    name: "Child Balcony Safety",
    summary:
      "Open balcony edges can feel unsafe for homes with toddlers and young children.",
    detailedDescription:
      "Parents often look for balcony protection that reduces fall risk without turning the balcony into a closed cage. Invisible grills can help when spacing, fixing and household use are planned carefully. Adult supervision remains essential.",
    relatedServiceIds: ["svc-children-safety-grills", "svc-balcony-safety-grills"],
    customerQuestions: [
      "What spacing is better for child balcony safety?",
      "Can invisible grills be installed on existing railings?",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 90,
  },
  {
    id: "prob-pet-fall-protection",
    slug: "pet-fall-protection",
    name: "Pet Fall Protection",
    summary:
      "Dogs and cats can slip through railing gaps or jump near open edges on upper floors.",
    detailedDescription:
      "Pet fall protection with invisible grills focuses on practical gap coverage and durable finishing while keeping views open. Recommendations depend on pet size and behaviour.",
    relatedServiceIds: ["svc-pet-safety-grills", "svc-balcony-safety-grills"],
    customerQuestions: [
      "Can invisible grills help keep pets safer on balconies?",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 86,
  },
  {
    id: "prob-heavy-grill-replacement",
    slug: "heavy-grill-replacement",
    name: "Heavy Grill Replacement",
    summary:
      "Many homeowners want to move away from bulky iron grills that block light and views.",
    detailedDescription:
      "Invisible grills are often considered when customers want a lighter visual alternative. Suitability depends on opening type, safety need and building conditions.",
    relatedServiceIds: ["svc-invisible-grills", "svc-window-invisible-grills"],
    customerQuestions: [
      "Are invisible grills a good alternative to iron grills?",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 84,
  },
  {
    id: "prob-high-rise-window-safety",
    slug: "high-rise-window-safety",
    name: "High-Rise Window Safety",
    summary:
      "Upper-floor windows may need fall protection without restricting daylight and ventilation.",
    detailedDescription:
      "High-rise window safety planning considers shutter clearance, cleaning access and secure fixing. Invisible grills can support this need when measured and installed carefully.",
    relatedServiceIds: ["svc-window-invisible-grills", "svc-invisible-grills"],
    customerQuestions: [
      "Do window invisible grills affect ventilation?",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 85,
  },
  {
    id: "prob-pigeon-balcony-control",
    slug: "pigeon-balcony-control",
    name: "Pigeon Balcony Control",
    summary:
      "Pigeons roosting on balcony ledges, AC units and parapets create cleaning and hygiene concerns.",
    detailedDescription:
      "Bird and pigeon control often starts with identifying roosting points. Bird spikes and, where suitable, bird netting can reduce roosting without converting the whole balcony into a closed cage.",
    relatedServiceIds: ["svc-bird-spikes", "svc-bird-nets", "svc-safety-nets"],
    customerQuestions: [
      "Do bird spikes help stop pigeons on balcony ledges?",
      "When is bird netting better than spikes?",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 86,
  },
  {
    id: "prob-balcony-drying-space",
    slug: "balcony-drying-space",
    name: "Balcony Drying Space",
    summary:
      "Apartment balconies often need neat cloth drying arrangements without cluttering the space.",
    detailedDescription:
      "Ceiling and balcony cloth hangers can improve everyday drying convenience when span, load and fixing points are assessed properly.",
    relatedServiceIds: ["svc-cloth-hangers", "svc-ceiling-cloth-hangers"],
    customerQuestions: [
      "Can ceiling cloth hangers be installed in apartment balconies?",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 82,
  },
  {
    id: "prob-mosquito-entry",
    slug: "mosquito-entry-on-balconies",
    name: "Mosquito Entry on Balconies",
    summary:
      "Evenings on Tamil Nadu balconies often mean insect pressure through open railings and windows.",
    detailedDescription:
      "Mosquito nets help when insect screening is the real goal. If fall protection is also needed, plan safety nets or invisible grills as a separate system so the household does not buy the wrong product.",
    relatedServiceIds: ["svc-mosquito-nets", "svc-balcony-safety-nets"],
    customerQuestions: [
      "Are mosquito nets enough for child balcony safety?",
      "Can mosquito nets be fitted on existing windows?",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 88,
  },
  {
    id: "prob-monkey-intrusion",
    slug: "monkey-intrusion-around-homes",
    name: "Monkey Intrusion Around Homes",
    summary:
      "Some residential corridors see monkeys entering kitchens, terraces and open balconies.",
    detailedDescription:
      "Monkey nets are considered when intrusion patterns are clear and openings can be covered without blocking essential access. Measurement and mesh selection should match real animal pressure, not generic balcony decor.",
    relatedServiceIds: ["svc-monkey-nets", "svc-bird-nets"],
    customerQuestions: [
      "Do monkey nets work on independent houses?",
      "How is monkey netting different from bird netting?",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 87,
  },
  {
    id: "prob-duct-area-birds",
    slug: "duct-area-bird-nesting",
    name: "Duct Area Bird Nesting",
    summary:
      "Service ducts and AC ledges often become quiet roosting zones in apartment buildings.",
    detailedDescription:
      "Duct-area bird control usually needs careful access planning, tidy framing and coordination with how technicians reach outdoor units. Bird nets or spikes may be recommended after seeing the ledge geometry.",
    relatedServiceIds: ["svc-bird-nets", "svc-bird-spikes", "svc-building-safety-nets"],
    customerQuestions: [
      "Can bird nets be installed around AC ducts?",
      "Will installers leave service access for AC technicians?",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 88,
  },
  {
    id: "prob-sports-enclosure",
    slug: "sports-net-enclosures",
    name: "Sports Net Enclosures",
    summary:
      "Practice nets and turf enclosures need durable perimeter coverage for cricket, football and multi-sport use.",
    detailedDescription:
      "Sports nets are planned around playing dimensions, ball impact, access gates and weather exposure. Residential terrace practice setups differ from commercial turf projects and should be measured accordingly.",
    relatedServiceIds: ["svc-sports-nets"],
    customerQuestions: [
      "Do you install cricket practice nets on terraces?",
      "What affects sports net quotation?",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 85,
  },
];
