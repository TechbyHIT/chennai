import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { generateAllPageRecords } from "../src/lib/pages/page-registry";

function getArg(name: string): string | undefined {
  const match = process.argv.find((arg) => arg.startsWith(`--${name}=`));
  return match?.split("=")[1];
}

const type = getArg("type") ?? "all";
const limit = Number(getArg("limit") ?? "1000");

let pages = generateAllPageRecords({ includeServiceArea: true });

if (type !== "all") {
  pages = pages.filter((page) => page.pageType === type || page.sitemapGroup === type);
}

pages = pages.slice(0, limit);

const report = {
  generatedAt: new Date().toISOString(),
  type,
  limit,
  created: pages.length,
  samplePaths: pages.slice(0, 20).map((page) => page.path),
};

mkdirSync(join(process.cwd(), "reports"), { recursive: true });
writeFileSync(
  join(process.cwd(), "reports/publishing-summary.json"),
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
