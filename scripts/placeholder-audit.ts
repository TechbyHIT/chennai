import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { BUSINESS_CONFIG } from "../src/config/business";
import { getPageRegistry } from "../src/lib/pages/page-registry";
import { hasPlaceholder } from "../src/lib/utils/text";

const businessPlaceholders = Object.entries({
  street: BUSINESS_CONFIG.address.street,
  postalCode: BUSINESS_CONFIG.address.postalCode,
  instagram: BUSINESS_CONFIG.socialLinks.instagram,
  facebook: BUSINESS_CONFIG.socialLinks.facebook,
  youtube: BUSINESS_CONFIG.socialLinks.youtube,
  phone: BUSINESS_CONFIG.phone.display,
}).filter(([, value]) => hasPlaceholder(String(value)) || String(value).includes("90000"));

const pagePlaceholders = getPageRegistry()
  .filter((page) => page.placeholders.length > 0)
  .map((page) => ({ path: page.path, placeholders: page.placeholders }));

const report = {
  generatedAt: new Date().toISOString(),
  businessPlaceholders,
  pagePlaceholders: pagePlaceholders.slice(0, 200),
};

mkdirSync(join(process.cwd(), "reports"), { recursive: true });
writeFileSync(join(process.cwd(), "reports/placeholders.json"), JSON.stringify(report, null, 2));
console.log(`Placeholder audit business=${businessPlaceholders.length}`);
