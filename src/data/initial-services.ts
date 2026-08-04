import type { Service, ServiceCategory } from "@/types/service";
import {
  ADDITIONAL_SERVICE_CATEGORIES,
  ADDITIONAL_SERVICES,
} from "@/data/additional-services";
import {
  getPrimaryKeywordsForService,
  getSecondaryKeywordsForService,
} from "@/data/keyword-clusters";

const now = "2026-08-01T00:00:00.000Z";

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "cat-safety-grills",
    slug: "safety-grills",
    name: "Safety Grills",
    description:
      "Invisible and balcony safety grill solutions designed for homes, apartments and high-rise buildings.",
  },
  ...ADDITIONAL_SERVICE_CATEGORIES,
];

const BASE_SERVICES: Service[] = [
  {
    id: "svc-invisible-grills",
    slug: "invisible-grills",
    name: "Invisible Grills",
    shortName: "Invisible Grills",
    categoryId: "cat-safety-grills",
    publicationStatus: "published",
    allowIndexing: true,
    summary:
      "Nylon-coated stainless steel invisible grills that protect balconies and windows while preserving open views.",
    introduction:
      "Invisible grills offer a clear, low-profile safety barrier for balconies, windows and sit-outs. Glory Invisible Grills installs measured systems suited to apartment and independent-home structures across Chennai and served cities in Tamil Nadu.",
    detailedDescription:
      "Our invisible grill systems use high-tensile stainless steel cables with protective nylon coating. Each installation starts with accurate measurement, opening assessment and spacing recommendations based on child safety, pet safety and building guidelines. We focus on neat frame fixing, consistent tensioning and clean finishing so the view remains open while the opening is secured.",
    customerProblems: [
      "Open balconies that feel unsafe for children",
      "Need for protection without heavy iron grill visuals",
      "High-rise window openings that require fall protection",
      "Pet safety concerns on elevated floors",
    ],
    benefits: [
      "Clear sightlines compared with conventional iron grills",
      "Custom spacing based on your safety requirements",
      "Suitable for apartments and independent houses",
      "Corrosion-resistant stainless steel cable options",
      "Neat installation with attention to wall and railing conditions",
    ],
    features: [
      "Stainless steel cable systems with nylon coating",
      "Adjustable spacing options",
      "Frame and bracket fixing suited to site conditions",
      "Tensioned cable layout for a clean finish",
      "Optional colour matching for visible hardware",
    ],
    applications: [
      "Balcony fall protection",
      "Window safety",
      "Sit-out protection",
      "Staircase void safety where suitable",
      "Duplex and high-rise openings",
    ],
    materials: [
      "Stainless steel cables",
      "Nylon coating",
      "Powder-coated or stainless frames where required",
      "Corrosion-resistant fasteners",
    ],
    specifications: [
      "Cable grade and coating selected for Tamil Nadu coastal and humid exposure where relevant",
      "Spacing planned according to intended use and safety need",
      "Fixing method adapted to concrete, masonry or metal railings",
      "Site measurement before fabrication or on-site finishing",
    ],
    installationSteps: [
      "Site visit and opening measurement",
      "Safety requirement discussion and spacing recommendation",
      "Material and fixing plan confirmation",
      "Frame or bracket installation",
      "Cable stringing and tensioning",
      "Final safety check and handover guidance",
    ],
    safetyInformation: [
      "Spacing should match the intended protection need, especially for young children",
      "Existing railings and parapets are assessed before fixing",
      "Do not climb or hang loads on invisible grill cables",
      "Periodic visual checks help maintain long-term safety",
    ],
    maintenanceTips: [
      "Wipe cables periodically with a soft cloth",
      "Avoid harsh chemical cleaners on nylon coating",
      "Check end fittings after major weather events",
      "Report loose tension or damaged coating promptly",
    ],
    pricingFactors: [
      "Opening measurements",
      "Material grade",
      "Required spacing",
      "Installation complexity",
      "Building height and access",
      "Total project quantity",
    ],
    suitablePropertyTypes: [
      "apartments",
      "independent-houses",
      "villas",
      "high-rise-apartments",
    ],
    primaryKeywords: ["invisible grills", "invisible grill installation"],
    secondaryKeywords: [
      "balcony invisible grills",
      "window invisible grills",
      "stainless steel invisible grills",
    ],
    customerQuestions: [
      "How much do invisible grills cost?",
      "Are invisible grills safe for children?",
      "Do invisible grills block the view?",
      "How long does installation take?",
    ],
    searchIntents: ["commercial", "safety", "local-service"],
    relatedServiceIds: [
      "svc-balcony-safety-grills",
      "svc-window-invisible-grills",
      "svc-children-safety-grills",
    ],
    heroImage: "/images/services/invisible-grills-hero.webp",
    galleryImages: [
      "/images/services/invisible-grills-1.webp",
      "/images/services/invisible-grills-2.webp",
    ],
    contentReviewed: true,
    qualityScore: 92,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "svc-balcony-safety-grills",
    slug: "balcony-safety-grills",
    name: "Balcony Safety Grills",
    shortName: "Balcony Safety Grills",
    categoryId: "cat-safety-grills",
    publicationStatus: "published",
    allowIndexing: true,
    summary:
      "Balcony safety grill solutions focused on fall protection for apartments and homes without heavy visual obstruction.",
    introduction:
      "Balcony safety grills help secure open edges while keeping outdoor spaces usable. We plan spacing, fixing points and finishing around your existing railing or parapet.",
    detailedDescription:
      "Balcony openings vary by building design, railing height and usable depth. Our balcony safety grill work starts with understanding how the balcony is used—children playing, clothes drying, seating or pet movement—and then recommending a suitable invisible grill layout.",
    customerProblems: [
      "Low balcony railings",
      "Gaps that feel unsafe for toddlers",
      "Need for protection without closing the balcony fully",
    ],
    benefits: [
      "Improved fall protection",
      "Open balcony feel retained",
      "Custom fit for irregular openings",
    ],
    features: [
      "Opening-specific spacing",
      "Secure fixing to suitable structural points",
      "Clean cable alignment",
    ],
    applications: ["Apartment balconies", "Villa sit-outs", "Duplex terraces with open edges"],
    materials: ["Stainless steel cables", "Nylon coating", "Compatible frames and fasteners"],
    specifications: [
      "Measured to balcony width and height",
      "Spacing planned for the household safety need",
    ],
    installationSteps: [
      "Balcony assessment",
      "Measurement and quote",
      "Installation and tensioning",
      "Safety walkthrough",
    ],
    safetyInformation: [
      "Not a climbing surface",
      "Existing railing strength is considered before installation",
    ],
    maintenanceTips: ["Clean gently", "Inspect fittings seasonally"],
    pricingFactors: [
      "Balcony size",
      "Access difficulty",
      "Material selection",
      "Spacing requirements",
    ],
    suitablePropertyTypes: ["apartments", "villas", "high-rise-apartments"],
    primaryKeywords: ["balcony safety grills", "balcony invisible grills"],
    secondaryKeywords: ["apartment balcony grills", "balcony fall protection"],
    customerQuestions: [
      "Can invisible grills be installed on existing balcony railings?",
      "What spacing is recommended for balcony safety?",
    ],
    searchIntents: ["commercial", "safety"],
    relatedServiceIds: ["svc-invisible-grills", "svc-children-safety-grills"],
    heroImage: "/images/services/balcony-safety-hero.webp",
    galleryImages: ["/images/services/balcony-safety-1.webp"],
    contentReviewed: true,
    qualityScore: 90,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "svc-window-invisible-grills",
    slug: "window-invisible-grills",
    name: "Window Invisible Grills",
    shortName: "Window Invisible Grills",
    categoryId: "cat-safety-grills",
    publicationStatus: "published",
    allowIndexing: true,
    summary:
      "Window invisible grill installation for ventilation-friendly fall protection in apartments and homes.",
    introduction:
      "Window invisible grills help secure large or low openings while allowing light and airflow. We assess window type, shutter clearance and fixing surfaces before recommending a layout.",
    detailedDescription:
      "Windows in high-rise and mid-rise homes often need protection without the bulk of traditional grills. Our window invisible grill installations consider opening style, mosquito mesh, curtain movement and cleaning access.",
    customerProblems: [
      "Large window openings on upper floors",
      "Child safety near windows",
      "Desire to avoid heavy window grills",
    ],
    benefits: ["Better view retention", "Ventilation-friendly protection", "Neat appearance"],
    features: ["Custom window sizing", "Spacing options", "Careful edge finishing"],
    applications: ["Bedroom windows", "Living room openings", "Utility windows"],
    materials: ["Stainless steel cables", "Nylon coating"],
    specifications: ["Measured to each window opening", "Clearance planned for shutters where present"],
    installationSteps: [
      "Window survey",
      "Measurement",
      "Installation",
      "Operation and safety guidance",
    ],
    safetyInformation: ["Keep furniture away from climbable window edges"],
    maintenanceTips: ["Dust regularly", "Check coating near coastal exposure"],
    pricingFactors: ["Number of windows", "Opening sizes", "Access conditions"],
    suitablePropertyTypes: ["apartments", "independent-houses", "high-rise-apartments"],
    primaryKeywords: ["window invisible grills"],
    secondaryKeywords: ["window safety grills", "invisible window grills"],
    customerQuestions: ["Will invisible grills interfere with window shutters?"],
    searchIntents: ["commercial", "safety"],
    relatedServiceIds: ["svc-invisible-grills", "svc-balcony-safety-grills"],
    heroImage: "/images/services/window-invisible-hero.webp",
    galleryImages: [],
    contentReviewed: true,
    qualityScore: 88,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "svc-children-safety-grills",
    slug: "children-safety-grills",
    name: "Children Safety Grills",
    shortName: "Children Safety Grills",
    categoryId: "cat-safety-grills",
    publicationStatus: "published",
    allowIndexing: true,
    summary:
      "Child-focused invisible grill spacing and installation guidance for balconies and windows.",
    introduction:
      "Children safety grills prioritise spacing, fixing reliability and practical household use. We discuss age-related concerns and recommend layouts that reduce fall risk at open edges.",
    detailedDescription:
      "Families often need balcony and window protection that remains visually light. Children safety grill planning focuses on closer spacing where appropriate, secure fixing and clear guidance on what the system can and cannot do.",
    customerProblems: [
      "Toddlers near balcony edges",
      "Openings that feel unsafe during play",
      "Need for protection without darkening rooms",
    ],
    benefits: [
      "Safety-led spacing recommendations",
      "Clear installation process",
      "Open visual feel retained",
    ],
    features: ["Child-focused spacing options", "Secure terminations", "Practical maintenance guidance"],
    applications: ["Family apartments", "Homes with young children", "Play-adjacent balconies"],
    materials: ["Stainless steel cables", "Nylon coating"],
    specifications: ["Spacing discussed against household needs", "Openings measured individually"],
    installationSteps: [
      "Safety discussion",
      "Measurement",
      "Installation",
      "Parent handover checklist",
    ],
    safetyInformation: [
      "Invisible grills are not a substitute for adult supervision",
      "Do not allow children to climb fittings",
    ],
    maintenanceTips: ["Inspect after rough play nearby", "Keep cables clean"],
    pricingFactors: ["Opening count", "Closer spacing requirements", "Access"],
    suitablePropertyTypes: ["apartments", "independent-houses", "villas"],
    primaryKeywords: ["children safety grills", "child balcony safety"],
    secondaryKeywords: ["toddler balcony protection", "kids safety grills"],
    customerQuestions: ["What spacing is better for child safety?"],
    searchIntents: ["safety", "commercial"],
    relatedServiceIds: ["svc-balcony-safety-grills", "svc-invisible-grills"],
    heroImage: "/images/services/children-safety-hero.webp",
    galleryImages: [],
    contentReviewed: true,
    qualityScore: 89,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "svc-pet-safety-grills",
    slug: "pet-safety-grills",
    name: "Pet Safety Grills",
    shortName: "Pet Safety Grills",
    categoryId: "cat-safety-grills",
    publicationStatus: "published",
    allowIndexing: true,
    summary:
      "Pet-oriented invisible grill layouts that help protect dogs and cats near balconies and windows.",
    introduction:
      "Pet safety grills help reduce fall risk for curious pets while keeping living spaces open and bright.",
    detailedDescription:
      "Pets behave differently from children around edges and railings. We discuss pet size, jumping habits and balcony use before recommending spacing and fixing details.",
    customerProblems: [
      "Pets near open balconies",
      "Risk of slipping through railing gaps",
      "Need for protection without heavy cages",
    ],
    benefits: ["Open views retained", "Gap protection", "Custom spacing discussion"],
    features: ["Pet-use spacing options", "Secure cable ends", "Practical cleaning guidance"],
    applications: ["Pet-friendly apartments", "Balcony homes with dogs or cats"],
    materials: ["Stainless steel cables", "Nylon coating"],
    specifications: ["Spacing planned with pet behaviour in mind"],
    installationSteps: ["Requirement discussion", "Measurement", "Installation", "Handover"],
    safetyInformation: ["Supervision still matters for energetic pets"],
    maintenanceTips: ["Clean paw marks gently", "Check tension periodically"],
    pricingFactors: ["Opening size", "Spacing", "Access"],
    suitablePropertyTypes: ["apartments", "independent-houses"],
    primaryKeywords: ["pet safety grills"],
    secondaryKeywords: ["dog balcony safety", "cat window safety"],
    customerQuestions: ["Can invisible grills stop pets from slipping through railings?"],
    searchIntents: ["safety", "commercial"],
    relatedServiceIds: ["svc-invisible-grills", "svc-balcony-safety-grills"],
    heroImage: "/images/services/pet-safety-hero.webp",
    galleryImages: [],
    contentReviewed: true,
    qualityScore: 86,
    createdAt: now,
    updatedAt: now,
  },
];

function enrichKeywords(service: Service): Service {
  return {
    ...service,
    primaryKeywords: Array.from(
      new Set([
        ...service.primaryKeywords,
        ...getPrimaryKeywordsForService(service.slug).slice(0, 10),
      ]),
    ),
    secondaryKeywords: Array.from(
      new Set([
        ...service.secondaryKeywords,
        ...getSecondaryKeywordsForService(service.slug).slice(0, 24),
      ]),
    ),
  };
}

export const INITIAL_SERVICES: Service[] = [
  ...BASE_SERVICES.map(enrichKeywords),
  ...ADDITIONAL_SERVICES,
];
