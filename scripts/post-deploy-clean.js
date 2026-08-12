/**
 * Safe post-deploy / post-build cache cleanup.
 * NEVER deletes .next/standalone, public/, or dist/production runtime files.
 *
 * Usage:
 *   node scripts/post-deploy-clean.js
 *   node scripts/post-deploy-clean.js --aggressive   # also drops unused root caches
 */
const { existsSync, rmSync, statSync, readdirSync } = require("node:fs");
const { join } = require("node:path");

const root = process.cwd();
const aggressive = process.argv.includes("--aggressive");

/** Paths safe to remove after a successful standalone build/deploy. */
const SAFE_TARGETS = [
  ".next/cache",
  ".next/trace",
  ".next/diagnostics",
  "node_modules/.cache",
  ".turbo",
  "coverage",
  "playwright-report",
  "test-results",
  "tsconfig.tsbuildinfo",
  ".next/cache/webpack",
  ".next/cache/swc",
  ".next/cache/images", // rebuilt on demand by image optimizer
];

const AGGRESSIVE_EXTRA = [
  // Full webpack/server compile artifacts are not needed once standalone is packed.
  // Keep .next/standalone + .next/static until pack-production has finished.
  "reports/sitemaps",
];

function sizeOf(path) {
  if (!existsSync(path)) return 0;
  const st = statSync(path);
  if (!st.isDirectory()) return st.size;
  let total = 0;
  for (const name of readdirSync(path)) {
    total += sizeOf(join(path, name));
  }
  return total;
}

const targets = [...SAFE_TARGETS, ...(aggressive ? AGGRESSIVE_EXTRA : [])];
let freed = 0;
const removed = [];

for (const rel of targets) {
  const full = join(root, rel);
  if (!existsSync(full)) continue;
  // Hard safety: never touch standalone or production pack
  if (full.includes(`${join(".next", "standalone")}`)) continue;
  if (full.includes(`${join("dist", "production")}`)) continue;
  const bytes = sizeOf(full);
  try {
    rmSync(full, { recursive: true, force: true });
    freed += bytes;
    removed.push({ path: rel, mb: Number((bytes / (1024 * 1024)).toFixed(2)) });
  } catch (error) {
    console.warn(`[post-deploy-clean] skip ${rel}:`, error.message);
  }
}

console.log(
  JSON.stringify(
    {
      ok: true,
      freedMb: Number((freed / (1024 * 1024)).toFixed(2)),
      removed,
      preserved: [".next/standalone", "dist/production", "public"],
    },
    null,
    2,
  ),
);
