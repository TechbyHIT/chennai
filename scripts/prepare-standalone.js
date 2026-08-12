/**
 * After `next build`, assemble a minimal runnable standalone tree:
 * - copy public + .next/static into .next/standalone
 * - strip *.map / docs / junk that Next may leave behind
 *
 * Runtime needs ONLY the standalone folder (+ its nested node_modules).
 */
const {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  unlinkSync,
} = require("node:fs");
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

/** Recursively delete files matching predicate. */
function walkDelete(dir, shouldDelete) {
  if (!existsSync(dir)) return { files: 0, bytes: 0 };
  let files = 0;
  let bytes = 0;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      const nested = walkDelete(full, shouldDelete);
      files += nested.files;
      bytes += nested.bytes;
      // Remove empty dirs left behind
      try {
        if (readdirSync(full).length === 0) rmSync(full, { recursive: true, force: true });
      } catch {
        /* ignore */
      }
      continue;
    }
    if (shouldDelete(full, name)) {
      bytes += st.size;
      files += 1;
      try {
        unlinkSync(full);
      } catch {
        /* ignore */
      }
    }
  }
  return { files, bytes };
}

const stripped = walkDelete(standalone, (_full, name) => {
  const lower = name.toLowerCase();
  return (
    lower.endsWith(".map") ||
    lower.endsWith(".md") ||
    lower === "license" ||
    lower === "licence" ||
    lower === "changelog" ||
    lower === "readme" ||
    lower.startsWith("readme.")
  );
});

const mb = (stripped.bytes / (1024 * 1024)).toFixed(2);
console.log(
  `[prepare-standalone] Copied public/ + .next/static; stripped ${stripped.files} junk files (~${mb} MB)`,
);
