const PUBLIC_SITE_URL = "https://gloryinvisiblegrills.in";

function publicWebsiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? PUBLIC_SITE_URL).replace(
    /\/$/,
    "",
  );
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(raw)) {
    return PUBLIC_SITE_URL;
  }
  return raw.replace(/^http:\/\//i, "https://");
}

export const BUSINESS_CONFIG = {
  name: "Glory Invisible Grills",
  legalName: "Glory Invisible Grills",
  description:
    "Invisible grills, safety nets, cloth hangers, sports nets and bird spikes for apartments and gated communities in Chennai and within 150 km, plus major Tamil Nadu cities. Free site measurement and written quotes.",
  websiteUrl: publicWebsiteUrl(),

  phone: {
    display: "+91 88707 77330",
    raw: "+918870777330",
  },

  whatsapp: {
    display: "+91 88707 77330",
    raw: "918870777330",
  },

  email: "gloryinvisiblegrills@gmail.com",

  address: {
    street: "1, 5/22, VGP Nagar, West Mogappair",
    city: "Chennai",
    district: "Chennai",
    state: "Tamil Nadu",
    postalCode: "600037",
    country: "India",
  },

  coordinates: {
    latitude: null as number | null,
    longitude: null as number | null,
  },

  logo: "/images/logo.png",
  defaultOpenGraphImage: "/images/services/invisible-grills/01.jpg",

  serviceArea: {
    primaryCity: "Chennai",
    state: "Tamil Nadu",
    country: "India",
  },

  socialLinks: {
    instagram: "[INSTAGRAM_URL]",
    facebook: "[FACEBOOK_URL]",
    youtube: "[YOUTUBE_URL]",
    whatsapp: "https://wa.me/918870777330",
  },

  analytics: {
    googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID,
    googleAnalyticsId:
      process.env.NEXT_PUBLIC_GA_ID || "G-JP41KLQH39",
    googleAdsId:
      process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18197506645",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
    clarityId: process.env.NEXT_PUBLIC_CLARITY_ID,
  },

  websiteCredit: "Programmatic SEO system",

  businessHours: {
    weekdays: "Mon–Sat: 9:00 AM – 7:00 PM",
    sunday: "Sun: By appointment",
    display: "Mon–Sat 9:00 AM – 7:00 PM · Sun by appointment",
  },

  mapEmbedUrl:
    "https://maps.google.com/maps?q=1%2C%205%2F22%2C%20VGP%20Nagar%2C%20West%20Mogappair%2C%20Chennai%20600037&hl=en&z=16&output=embed",
  googleMapsLink:
    "https://www.google.com/maps/search/?api=1&query=1%2C%205%2F22%2C%20VGP%20Nagar%2C%20West%20Mogappair%2C%20Chennai%20600037",
} as const;
