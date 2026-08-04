import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { PUBLISHING_CONFIG } from "../src/config/publishing";
import { getPageRegistry } from "../src/lib/pages/page-registry";
import { isPageIndexable } from "../src/lib/seo/is-page-indexable";

function getArg(name: string): string | undefined {
  const match = process.argv.find((arg) => arg.startsWith(`--${name}=`));
  return match?.split("=")[1];
}

const batchSize = Math.min(
  Number(getArg("batch-size") ?? PUBLISHING_CONFIG.defaultBatchSize),
  PUBLISHING_CONFIG.maxBatchSize,
);

const candidates = getPageRegistry()
  .filter((page) => page.publicationStatus === "published" || page.publicationStatus === "review")
  .filter((page) => isPageIndexable({ ...page, publicationStatus: "published" }))
  .slice(0, batchSize);

const report = {
  generatedAt: new Date().toISOString(),
  batchSize,
  approvedForPublish: candidates.length,
  paths: candidates.map((page) => page.path),
  workflow:
    "Draft → validation → content audit → local verification → duplicate audit → SEO audit → human review → published",
  warning:
    "File-based mode marks eligible pages in reports only. Review before expanding sitemap inclusion.",
};

mkdirSync(join(process.cwd(), "reports"), { recursive: true });
writeFileSync(
  join(process.cwd(), "reports/publishing-summary.json"),
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
