import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { getPageRegistry } from "../src/lib/pages/page-registry";

function getArg(name: string): string | undefined {
  const match = process.argv.find((arg) => arg.startsWith(`--${name}=`));
  return match?.split("=")[1];
}

const status = getArg("status");
const limit = Number(getArg("limit") ?? "1000");

let pages = getPageRegistry();
if (status) pages = pages.filter((page) => page.publicationStatus === status);
pages = pages.slice(0, limit);

const findings = pages.flatMap((page) => {
  const items = [];
  if (page.qualityScore < 80) {
    items.push({ path: page.path, code: "low-quality", detail: page.qualityScore });
  }
  if (!page.contentReviewed) {
    items.push({ path: page.path, code: "not-reviewed", detail: true });
  }
  if (!page.localDataVerified && ["location", "area", "service-location", "service-area"].includes(page.pageType)) {
    items.push({ path: page.path, code: "local-unverified", detail: true });
  }
  if (page.wordCount < page.minimumRequiredWordCount) {
    items.push({
      path: page.path,
      code: "thin-content",
      detail: `${page.wordCount}/${page.minimumRequiredWordCount}`,
    });
  }
  return items;
});

const report = {
  generatedAt: new Date().toISOString(),
  checked: pages.length,
  findings,
};

mkdirSync(join(process.cwd(), "reports"), { recursive: true });
writeFileSync(join(process.cwd(), "reports/content-quality.json"), JSON.stringify(report, null, 2));
console.log(`Content audit checked ${pages.length} pages, findings=${findings.length}`);
