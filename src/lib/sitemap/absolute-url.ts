import { SITE_CONFIG } from "@/config/site";

/** Force absolute HTTPS URLs for sitemap/canonical discoverability. */
export function toAbsoluteHttpsUrl(pathOrUrl: string): string {
  const base = SITE_CONFIG.url.replace(/\/$/, "");
  const httpsBase = base.replace(/^http:\/\//i, "https://");

  if (/^https:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (/^http:\/\//i.test(pathOrUrl)) {
    return pathOrUrl.replace(/^http:\/\//i, "https://");
  }

  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${httpsBase}${path}`;
}

export function sitemapIndexUrl(): string {
  return toAbsoluteHttpsUrl("/sitemap.xml");
}

export function sitemapShardUrl(id: string): string {
  const key = id.endsWith(".xml") ? id : `${id}.xml`;
  return toAbsoluteHttpsUrl(`/sitemap/${key}`);
}
