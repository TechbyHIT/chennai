import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { getPageRegistry } from "../src/lib/pages/page-registry";
import { isPageIndexable } from "../src/lib/seo/is-page-indexable";
import { hasPlaceholder } from "../src/lib/utils/text";
import type { AuditFinding } from "../src/types/seo";

const pages = getPageRegistry();
const titles = new Map<string, string[]>();
const descriptions = new Map<string, string[]>();
const findings: AuditFinding[] = [];

for (const page of pages) {
  titles.set(page.title, [...(titles.get(page.title) ?? []), page.path]);
  descriptions.set(page.metaDescription, [
    ...(descriptions.get(page.metaDescription) ?? []),
    page.path,
  ]);

  if (!page.title) {
    findings.push({ severity: "critical", code: "missing-title", message: "Missing title", path: page.path });
  }
  if (!page.metaDescription) {
    findings.push({
      severity: "critical",
      code: "missing-description",
      message: "Missing meta description",
      path: page.path,
    });
  }
  if (!page.h1) {
    findings.push({ severity: "critical", code: "missing-h1", message: "Missing H1", path: page.path });
  }
  if (!page.canonicalUrl) {
    findings.push({
      severity: "critical",
      code: "missing-canonical",
      message: "Missing canonical",
      path: page.path,
    });
  }
  if (page.wordCount < page.minimumRequiredWordCount) {
    findings.push({
      severity: "warning",
      code: "thin-content",
      message: `Word count ${page.wordCount} below ${page.minimumRequiredWordCount}`,
      path: page.path,
    });
  }
  if (page.placeholders.some(hasPlaceholder) || page.placeholders.length > 0) {
    findings.push({
      severity: "warning",
      code: "placeholder",
      message: "Unresolved placeholders detected in related business fields or content",
      path: page.path,
    });
  }
  if (isPageIndexable(page) && !page.hasInternalLinks) {
    findings.push({
      severity: "critical",
      code: "missing-internal-links",
      message: "Indexable page missing internal links flag",
      path: page.path,
    });
  }
}

for (const [title, paths] of titles) {
  if (paths.length > 1) {
    findings.push({
      severity: "critical",
      code: "duplicate-title",
      message: `Duplicate title: ${title}`,
      path: paths.join(", "),
    });
  }
}

for (const [description, paths] of descriptions) {
  if (paths.length > 1) {
    findings.push({
      severity: "critical",
      code: "duplicate-description",
      message: `Duplicate meta description: ${description}`,
      path: paths.join(", "),
    });
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  totalPages: pages.length,
  critical: findings.filter((item) => item.severity === "critical").length,
  warnings: findings.filter((item) => item.severity === "warning").length,
  findings: findings.slice(0, 500),
};

mkdirSync(join(process.cwd(), "reports"), { recursive: true });
writeFileSync(join(process.cwd(), "reports/seo-audit.json"), JSON.stringify(report, null, 2));
console.log(`SEO audit: ${report.critical} critical, ${report.warnings} warnings`);
if (report.critical > 0) {
  process.exitCode = 1;
}
