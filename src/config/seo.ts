export const SEO_CONFIG = {
  minimumWordCounts: {
    home: 600,
    core: 700,
    service: 1200,
    location: 700,
    area: 700,
  // Raise helpful-content floors for programmatic landings.
  "service-location": 10000,
  "service-area": 10000,
    solution: 900,
    "property-type-service": 900,
    guide: 1500,
    blog: 1200,
  } as Record<string, number>,

  titlePatterns: {
    service: [
      "{service} Installation in {city}",
      "{service} for Balconies & Windows | {city}",
      "Professional {service} Services in {city}",
    ],
    "service-location": [
      "{service} in {location} | Safety Installation",
      "{location} {service} Installation Experts",
      "Book {service} Installation in {location}",
    ],
    "service-area": [
      "{service} Installation in {area}, {location}",
      "{area} {service} Installation | {location}",
      "Local {service} Service in {area}",
    ],
    solution: [
      "{problem} Solutions with Invisible Grills",
      "How Invisible Grills Help with {problem}",
    ],
    guide: ["{guideTitle} | Practical Buying Guide", "{guideTitle}"],
    blog: ["{postTitle}", "{postTitle} | Tips & Advice"],
  },

  defaultRobots: {
    index: true,
    follow: true,
  },
} as const;
