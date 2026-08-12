/**
 * Pack a production-only deploy directory from the standalone build.
 *
 * Output: dist/production/
 * Contains ONLY what PM2 needs to run — no src, tests, docs, git, or build cache.
 *
 * Usage (after npm run build):
 *   node scripts/pack-production.js
 */
const {
  cpSync,
  existsSync,
  mkdirSync,
  rmSync,
  writeFileSync,
  readFileSync,
  readdirSync,
  statSync,
} = require("node:fs");
const { join } = require("node:path");

const root = process.cwd();
const standalone = join(root, ".next", "standalone");
const outDir = join(root, "dist", "production");

if (!existsSync(standalone)) {
  console.error("[pack-production] Missing .next/standalone — run `npm run build` first");
  process.exit(1);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

cpSync(standalone, outDir, { recursive: true });

// Runtime PM2 config (paths relative to deploy root = standalone contents)
const ecoSrc = join(root, "ecosystem.config.cjs");
if (existsSync(ecoSrc)) {
  let eco = readFileSync(ecoSrc, "utf8");
  // In the packed tree, server.js is at the root.
  eco = eco.replace(
    /script:\s*["']\.next\/standalone\/server\.js["']/,
    'script: "server.js"',
  );
  writeFileSync(join(outDir, "ecosystem.config.cjs"), eco);
}

// Minimal package.json for ops identity (not for npm install on server)
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
writeFileSync(
  join(outDir, "package.json"),
  JSON.stringify(
    {
      name: pkg.name,
      version: pkg.version,
      private: true,
      engines: pkg.engines ?? { node: ">=22" },
      scripts: {
        start: "node server.js",
        "pm2:start": "pm2 start ecosystem.config.cjs",
        "pm2:reload": "pm2 reload glory-invisible-grills",
      },
    },
    null,
    2,
  ),
);

mkdirSync(join(outDir, "logs"), { recursive: true });
writeFileSync(join(outDir, "logs", ".gitkeep"), "");

function dirSize(dir) {
  let total = 0;
  if (!existsSync(dir)) return 0;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    total += st.isDirectory() ? dirSize(full) : st.size;
  }
  return total;
}

const bytes = dirSize(outDir);
const mb = (bytes / (1024 * 1024)).toFixed(1);
writeFileSync(
  join(outDir, "FOOTPRINT.json"),
  JSON.stringify(
    {
      packedAt: new Date().toISOString(),
      bytes,
      megabytes: Number(mb),
      includes: [
        "server.js",
        ".next/static",
        "public",
        "traced node_modules",
        "ecosystem.config.cjs",
      ],
      excludes: [
        "src",
        "tests",
        "docs",
        ".git",
        "devDependencies",
        "build cache",
        "source maps",
      ],
    },
    null,
    2,
  ),
);

console.log(`[pack-production] Ready: dist/production (${mb} MB)`);
console.log("[pack-production] Deploy this folder only; do not copy the full repo.");
