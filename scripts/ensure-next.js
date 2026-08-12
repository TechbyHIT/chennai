/**
 * Fail fast with a clear VPS message when node_modules/next is missing.
 */
const { existsSync } = require("node:fs");
const { join } = require("node:path");

const nextBin = join(__dirname, "..", "node_modules", "next", "dist", "bin", "next");

if (!existsSync(nextBin)) {
  console.error(`
[build] Next.js is not installed (node_modules/next missing).

On the VPS run:

  cd /var/www/glory-invisible-grills
  npm install
  npm run build
`);
  process.exit(1);
}
