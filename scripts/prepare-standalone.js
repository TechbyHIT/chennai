/**
 * After `next build`, copy public + static assets into the standalone output
 * so PM2 can run `.next/standalone/server.js` without Docker.
 */
const { cpSync, existsSync, mkdirSync } = require("node:fs");
const { join } = require("node:path");

const root = process.cwd();
const standalone = join(root, ".next", "standalone");
const staticSrc = join(root, ".next", "static");
const publicSrc = join(root, "public");

if (!existsSync(standalone)) {
  console.warn("[prepare-standalone] .next/standalone missing — skip");
  process.exit(0);
}

mkdirSync(join(standalone, ".next"), { recursive: true });
if (existsSync(staticSrc)) {
  cpSync(staticSrc, join(standalone, ".next", "static"), { recursive: true });
}
if (existsSync(publicSrc)) {
  cpSync(publicSrc, join(standalone, "public"), { recursive: true });
}

console.log("[prepare-standalone] Copied public/ and .next/static into standalone");
