import { BUSINESS_CONFIG } from "@/config/business";
import { SITE_CONFIG } from "@/config/site";

function realSocialLinks(): string[] {
  // Placeholder values like "[INSTAGRAM_URL]" must never reach structured data.
  return Object.values(BUSINESS_CONFIG.socialLinks).filter((url) =>
    /^https?:\/\//.test(url),
  );
}

export function organizationSchema() {
  const sameAs = realSocialLinks();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: BUSINESS_CONFIG.name,
    legalName: BUSINESS_CONFIG.legalName,
    url: BUSINESS_CONFIG.websiteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${BUSINESS_CONFIG.websiteUrl}${BUSINESS_CONFIG.logo}`,
      caption: BUSINESS_CONFIG.name,
    },
    image: `${BUSINESS_CONFIG.websiteUrl}${BUSINESS_CONFIG.defaultOpenGraphImage}`,
    description: BUSINESS_CONFIG.description,
    email: BUSINESS_CONFIG.email,
    telephone: BUSINESS_CONFIG.phone.raw,
    knowsLanguage: ["en-IN", "ta-IN"],
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS_CONFIG.address.city,
      addressRegion: BUSINESS_CONFIG.address.state,
      addressCountry: BUSINESS_CONFIG.address.country,
    },
    areaServed: {
      "@type": "State",
      name: "Tamil Nadu",
      containedInPlace: { "@type": "Country", name: "India" },
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: BUSINESS_CONFIG.phone.raw,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Tamil"],
      },
      {
        "@type": "ContactPoint",
        telephone: BUSINESS_CONFIG.whatsapp.raw,
        contactType: "sales",
        contactOption: "TollFree",
        areaServed: "IN",
        availableLanguage: ["English", "Tamil"],
      },
    ],
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}
