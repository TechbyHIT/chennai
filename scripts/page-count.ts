import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import {
  estimatePossiblePageCapacity,
  getPageCounts,
} from "../src/lib/pages/page-registry";

const counts = getPageCounts();
const report = {
  generatedAt: new Date().toISOString(),
  serviceArea: "Tamil Nadu",
  architecture: "file-based (no database)",
  ...counts,
  possibleCapacityFromCurrentEntities: estimatePossiblePageCapacity(),
  note: "Capacity scales by adding Tamil Nadu cities, areas, services, property types, problems, guides and blogs. Do not publish thin combinations.",
};

mkdirSync(join(process.cwd(), "reports"), { recursive: true });
writeFileSync(join(process.cwd(), "reports/page-count.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
