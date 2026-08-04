import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { getPageRegistry } from "../src/lib/pages/page-registry";

function getArg(name: string): string | undefined {
  const match = process.argv.find((arg) => arg.startsWith(`--${name}=`));
  return match?.split("=")[1];
}

const qualityBelow = Number(getArg("quality-below") ?? "80");
const pages = getPageRegistry().filter((page) => page.qualityScore < qualityBelow);

const report = {
  generatedAt: new Date().toISOString(),
  qualityBelow,
  count: pages.length,
  paths: pages.map((page) => ({
    path: page.path,
    qualityScore: page.qualityScore,
    status: page.publicationStatus,
  })),
};

mkdirSync(join(process.cwd(), "reports"), { recursive: true });
writeFileSync(join(process.cwd(), "reports/noindex-candidates.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
