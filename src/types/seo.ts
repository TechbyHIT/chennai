export type RobotsDirectives = {
  index: boolean;
  follow: boolean;
  googleBot?: {
    index: boolean;
    follow: boolean;
    "max-image-preview"?: "none" | "standard" | "large";
    "max-snippet"?: number;
    "max-video-preview"?: number;
  };
};

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export type InternalLink = {
  href: string;
  label: string;
  rel?: string;
};

export type SitemapEntry = {
  url: string;
  lastModified: string;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
  sitemapGroup: string;
};

export type AuditFinding = {
  severity: "critical" | "warning" | "info";
  code: string;
  message: string;
  path?: string;
};
