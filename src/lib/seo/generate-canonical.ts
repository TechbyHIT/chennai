import { SITE_CONFIG } from "@/config/site";
import { ensureTrailingSlash } from "@/lib/utils/slug";

export function generateCanonical(path: string): string {
  const normalizedPath = ensureTrailingSlash(path.startsWith("/") ? path : `/${path}`);
  return `${SITE_CONFIG.url}${normalizedPath}`;
}
