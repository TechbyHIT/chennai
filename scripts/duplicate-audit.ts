import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { getPageRegistry } from "../src/lib/pages/page-registry";
import { similarityScore } from "../src/lib/utils/text";

const pages = getPageRegistry();
const findings: Array<{ a: string; b: string; score: number }> = [];

for (let i = 0; i < pages.length; i += 1) {
  for (let j = i + 1; j < Math.min(pages.length, i + 40); j += 1) {
    const a = pages[i];
    const b = pages[j];
    if (!a || !b) continue;
    if (a.pageType !== b.pageType) continue;
    const score = similarityScore(a.introduction, b.introduction);
    if (score > 0.7) {
      findings.push({ a: a.path, b: b.path, score: Number(score.toFixed(3)) });
    }
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  threshold: 0.7,
  duplicatesFound: findings.length,
  findings: findings.slice(0, 200),
};

mkdirSync(join(process.cwd(), "reports"), { recursive: true });
writeFileSync(join(process.cwd(), "reports/duplicate-content.json"), JSON.stringify(report, null, 2));
console.log(`Duplicate audit findings=${findings.length}`);
