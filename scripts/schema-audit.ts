import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { getPageRegistry } from "../src/lib/pages/page-registry";
import { webPageSchema } from "../src/lib/schema/web-page-schema";

const pages = getPageRegistry();
const findings = pages.flatMap((page) => {
  const schema = webPageSchema(page);
  const items = [];
  if (!schema.url) {
    items.push({ path: page.path, code: "missing-url" });
  }
  if (!page.hasValidSchema) {
    items.push({ path: page.path, code: "schema-flag-false" });
  }
  return items;
});

const report = {
  generatedAt: new Date().toISOString(),
  checked: pages.length,
  findings,
};

mkdirSync(join(process.cwd(), "reports"), { recursive: true });
writeFileSync(join(process.cwd(), "reports/schema-audit.json"), JSON.stringify(report, null, 2));
console.log(`Schema audit findings=${findings.length}`);
