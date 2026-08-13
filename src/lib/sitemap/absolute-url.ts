import { SITE_CONFIG } from "@/config/site";

const LOCAL_HOST =
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i;

function publicHttpsOrigin(): string {
  const base = SITE_CONFIG.url.replace(/\/$/, "");
  if (LOCAL_HOST.test(base)) {
    return "https://gloryinvisiblegrills.in";
  }
  return base.replace(/^http:\/\//i, "https://");
}

/** Force absolute HTTPS URLs for sitemap/canonical discoverability. */
export function toAbsoluteHttpsUrl(pathOrUrl: string): string {
  const httpsBase = publicHttpsOrigin();

  if (LOCAL_HOST.test(pathOrUrl)) {
    const path = pathOrUrl.replace(LOCAL_HOST, "") || "/";
    return `${httpsBase}${path.startsWith("/") ? path : `/${path}`}`;
  }

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
