import { SITE_CONFIG } from "@/config/site";
import type { MetadataRoute } from "next";

const DISALLOW = [
  "/admin/",
  "/api/",
  "/thank-you/",
  "/search/",
  "/*?q=",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
      // Major crawlers get explicit allowance so deep programmatic pages are reachable.
      { userAgent: "Googlebot", allow: "/", disallow: DISALLOW },
      { userAgent: "Googlebot-Image", allow: "/", disallow: DISALLOW },
      { userAgent: "Bingbot", allow: "/", disallow: DISALLOW },
      { userAgent: "DuckDuckBot", allow: "/", disallow: DISALLOW },
      // AI answer engines: allowed, since being cited is the goal.
      { userAgent: "OAI-SearchBot", allow: "/", disallow: DISALLOW },
      { userAgent: "ChatGPT-User", allow: "/", disallow: DISALLOW },
      { userAgent: "PerplexityBot", allow: "/", disallow: DISALLOW },
      { userAgent: "Google-Extended", allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
