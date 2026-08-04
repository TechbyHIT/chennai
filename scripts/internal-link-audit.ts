import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { buildInternalLinks } from "../src/lib/internal-links/build-internal-links";
import { getPageRegistry } from "../src/lib/pages/page-registry";

const pages = getPageRegistry();
const pathSet = new Set(pages.map((page) => page.path));
const inbound = new Map<string, number>();
const findings: Array<{ path: string; code: string; detail: string }> = [];

for (const page of pages) {
  const links = buildInternalLinks(page);
  if (links.length === 0) {
    findings.push({ path: page.path, code: "no-links", detail: "No internal links generated" });
  }
  for (const link of links) {
    inbound.set(link.href, (inbound.get(link.href) ?? 0) + 1);
    if (
      link.href.startsWith("/") &&
      !link.href.startsWith("/contact") &&
      !pathSet.has(link.href) &&
      !["/about/", "/gallery/", "/projects/", "/faq/", "/pricing-guide/", "/materials-guide/", "/installation-process/", "/safety-guide/", "/privacy-policy/", "/terms-and-conditions/", "/disclaimer/", "/thank-you/", "/services/", "/locations/", "/solutions/", "/property-types/", "/guides/", "/blog/", "/testimonials/"].includes(link.href)
    ) {
      findings.push({
        path: page.path,
        code: "possible-broken-link",
        detail: link.href,
      });
    }
  }
}

const orphans = pages
  .filter((page) => (inbound.get(page.path) ?? 0) === 0)
  .map((page) => page.path);

const report = {
  generatedAt: new Date().toISOString(),
  orphans: orphans.slice(0, 200),
  orphanCount: orphans.length,
  findings: findings.slice(0, 300),
};

mkdirSync(join(process.cwd(), "reports"), { recursive: true });
writeFileSync(join(process.cwd(), "reports/internal-links.json"), JSON.stringify(report, null, 2));
console.log(`Internal link audit orphans=${orphans.length}`);
