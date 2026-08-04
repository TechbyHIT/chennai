import type { PropertyType } from "@/types/content";

export const PROPERTY_TYPES: PropertyType[] = [
  {
    id: "pt-apartments",
    slug: "apartments",
    name: "Apartments",
    summary:
      "Apartment balconies and windows often need discreet fall protection that works with existing railings and society norms.",
    recommendations: [
      "Measure each balcony and window separately",
      "Discuss spacing for children or pets if relevant",
      "Plan installation around building access rules",
    ],
    commonRequirements: [
      "Balcony fall protection",
      "Window safety without heavy iron work",
      "Neat finishing visible from living areas",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 88,
  },
  {
    id: "pt-independent-houses",
    slug: "independent-houses",
    name: "Independent Houses",
    summary:
      "Independent houses may need invisible grills for sit-outs, upper-floor windows and open edges used by family members.",
    recommendations: [
      "Assess structural fixing points carefully",
      "Consider multiple openings across floors",
      "Balance safety with ventilation and daylight",
    ],
    commonRequirements: [
      "Upper-floor window protection",
      "Sit-out safety",
      "Custom layouts for non-standard openings",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 86,
  },
  {
    id: "pt-villas",
    slug: "villas",
    name: "Villas",
    summary:
      "Villa projects often combine larger balconies, sit-outs and view-oriented openings where invisible grills preserve openness.",
    recommendations: [
      "Plan for larger spans carefully",
      "Discuss aesthetics alongside safety",
      "Review coastal or humidity exposure where relevant",
    ],
    commonRequirements: ["Wide balcony protection", "Premium visual finish"],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 85,
  },
  {
    id: "pt-high-rise-apartments",
    slug: "high-rise-apartments",
    name: "High-Rise Apartments",
    summary:
      "High-rise apartments require careful access planning, secure fixing and clear safety guidance for elevated openings.",
    recommendations: [
      "Confirm building access and work permissions",
      "Prioritise secure terminations",
      "Explain maintenance expectations clearly",
    ],
    commonRequirements: [
      "Elevated balcony protection",
      "Reliable fixing",
      "Minimal visual bulk",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 87,
  },
];
