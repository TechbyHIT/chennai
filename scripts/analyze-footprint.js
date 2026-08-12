/**
 * Disk footprint reporter for multi-site hosts (read-only).
 * Usage: node scripts/analyze-footprint.js
 */
const { existsSync, readdirSync, statSync } = require("node:fs");
const { join } = require("node:path");

const root = process.cwd();

function sizeOf(path) {
  if (!existsSync(path)) return 0;
  const st = statSync(path);
  if (!st.isDirectory()) return st.size;
  let total = 0;
  for (const name of readdirSync(path)) {
    try {
      total += sizeOf(join(path, name));
    } catch {
      /* ignore permission races */
    }
  }
  return total;
}

function mb(bytes) {
  return Number((bytes / (1024 * 1024)).toFixed(1));
}

const watch = [
  "node_modules",
  ".next",
  ".next/standalone",
  ".next/cache",
  ".next/static",
  "public",
  "dist/production",
  "logs",
  "reports",
  "src",
];

const rows = watch.map((rel) => {
  const bytes = sizeOf(join(root, rel));
  return { path: rel, mb: mb(bytes), bytes };
});

rows.sort((a, b) => b.bytes - a.bytes);

const recommendations = [];
const cache = rows.find((r) => r.path === ".next/cache");
if (cache && cache.mb > 20) {
  recommendations.push({
    action: "node scripts/post-deploy-clean.js",
    why: `.next/cache is ${cache.mb} MB and is not required at runtime after standalone build`,
    impact: `~${cache.mb} MB disk freed per site`,
  });
}
const nm = rows.find((r) => r.path === "node_modules");
const standalone = rows.find((r) => r.path === ".next/standalone");
if (nm && standalone && nm.mb > 200 && standalone.mb > 0) {
  recommendations.push({
    action: "Deploy dist/production only (npm run deploy:pack)",
    why: "Full node_modules is unnecessary when running standalone/server.js",
    impact: `Avoid copying ~${nm.mb} MB per site; ship ~${standalone.mb} MB instead`,
  });
}

console.log(
  JSON.stringify(
    {
      analyzedAt: new Date().toISOString(),
      paths: rows,
      recommendations,
    },
    null,
    2,
  ),
);
