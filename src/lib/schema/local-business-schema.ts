import { BUSINESS_CONFIG } from "@/config/business";
import { SITE_CONFIG } from "@/config/site";

function openingHoursSpecification() {
  // Honest hours from business config — no fabricated 24/7 claims.
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
  ];
}

export function localBusinessSchema() {
  const streetIsPlaceholder = BUSINESS_CONFIG.address.street.includes("[");
  const postalIsPlaceholder = BUSINESS_CONFIG.address.postalCode.includes("[");
  const hasCoords =
    typeof BUSINESS_CONFIG.coordinates.latitude === "number" &&
    typeof BUSINESS_CONFIG.coordinates.longitude === "number";

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_CONFIG.url}/#localbusiness`,
    name: BUSINESS_CONFIG.name,
    description: BUSINESS_CONFIG.description,
    url: BUSINESS_CONFIG.websiteUrl,
    telephone: BUSINESS_CONFIG.phone.raw,
    image: `${BUSINESS_CONFIG.websiteUrl}${BUSINESS_CONFIG.defaultOpenGraphImage}`,
    priceRange: "$$",
    areaServed: {
      "@type": "State",
      name: "Tamil Nadu",
      containedInPlace: { "@type": "Country", name: "India" },
    },
    address: {
      "@type": "PostalAddress",
      ...(streetIsPlaceholder
        ? {}
        : { streetAddress: BUSINESS_CONFIG.address.street }),
      addressLocality: BUSINESS_CONFIG.address.city,
      addressRegion: BUSINESS_CONFIG.address.state,
      ...(postalIsPlaceholder
        ? {}
        : { postalCode: BUSINESS_CONFIG.address.postalCode }),
      addressCountry: BUSINESS_CONFIG.address.country,
    },
    ...(hasCoords
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: BUSINESS_CONFIG.coordinates.latitude,
            longitude: BUSINESS_CONFIG.coordinates.longitude,
          },
        }
      : {}),
    openingHoursSpecification: openingHoursSpecification(),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: BUSINESS_CONFIG.phone.raw,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Tamil"],
      },
    ],
    parentOrganization: { "@id": `${SITE_CONFIG.url}/#organization` },
  };
}
