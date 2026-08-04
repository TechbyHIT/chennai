/**
 * Sync finalized HD photos into public/images/projects and generate media catalog.
 * Dedupes by basename+size across FINIALIZED PHOTOS folders.
 */
import { createHash } from "node:crypto";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, extname, join, relative } from "node:path";

const ROOT = process.cwd();
const SOURCE_ROOT = join(ROOT, "images");
const DEST_ROOT = join(ROOT, "public", "images", "projects");
const CATALOG_PATH = join(ROOT, "src", "data", "generated-media.json");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/** Folder name fragments → canonical category keys */
const FOLDER_TO_CATEGORY: Array<{ match: RegExp; category: string }> = [
  { match: /invisible grill balcony/i, category: "invisible-grill-balcony" },
  { match: /invisible grill window/i, category: "invisible-grill-window" },
  { match: /children safety nets/i, category: "children-safety-nets" },
  { match: /pet safety nets/i, category: "pet-safety-nets" },
  { match: /safety nets balcony/i, category: "safety-nets-balcony" },
  { match: /duct area nets/i, category: "duct-area-nets" },
  { match: /mosquito nets/i, category: "mosquito-nets" },
  { match: /cloth hangers/i, category: "cloth-hangers" },
  { match: /cricket nets/i, category: "cricket-nets" },
  { match: /spikes/i, category: "bird-spikes" },
];

/** Service slug → ordered categories (hero from first image of first category) */
const SERVICE_CATEGORIES: Record<string, string[]> = {
  "invisible-grills": ["invisible-grill-balcony", "invisible-grill-window"],
  "balcony-safety-grills": ["invisible-grill-balcony", "safety-nets-balcony"],
  "window-invisible-grills": ["invisible-grill-window", "invisible-grill-balcony"],
  "children-safety-grills": ["children-safety-nets", "invisible-grill-balcony"],
  "pet-safety-grills": ["pet-safety-nets", "invisible-grill-balcony"],
  "safety-nets": ["safety-nets-balcony", "duct-area-nets", "children-safety-nets"],
  "kids-safety-nets": ["children-safety-nets", "safety-nets-balcony"],
  "children-safety-nets": ["children-safety-nets", "safety-nets-balcony"],
  "pet-safety-nets": ["pet-safety-nets", "safety-nets-balcony"],
  "balcony-safety-nets": ["safety-nets-balcony", "invisible-grill-balcony"],
  "building-safety-nets": ["duct-area-nets", "safety-nets-balcony"],
  "mosquito-nets": ["mosquito-nets", "invisible-grill-window"],
  "bird-nets": ["bird-spikes", "safety-nets-balcony", "duct-area-nets"],
  "monkey-nets": ["safety-nets-balcony", "duct-area-nets"],
  "bird-spikes": ["bird-spikes"],
  "cloth-hangers": ["cloth-hangers"],
  "ceiling-cloth-hangers": ["cloth-hangers"],
  "sports-nets": ["cricket-nets"],
};

type Catalog = {
  generatedAt: string;
  totalImages: number;
  categories: Record<string, string[]>;
  services: Record<string, { hero: string; gallery: string[] }>;
  homepage: string[];
  galleryPage: string[];
};

function walk(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (/siri/i.test(entry.name)) continue;
      walk(full, out);
    } else if (IMAGE_EXT.has(extname(entry.name).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

function categoryForPath(filePath: string): string | null {
  const rel = relative(SOURCE_ROOT, filePath).replace(/\\/g, "/");
  for (const rule of FOLDER_TO_CATEGORY) {
    if (rule.match.test(rel)) return rule.category;
  }
  return null;
}

function slugifyName(name: string): string {
  const ext = extname(name).toLowerCase();
  const base = basename(name, extname(name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${base || "image"}${ext === ".jpeg" ? ".jpg" : ext}`;
}

function fileFingerprint(path: string): string {
  const stat = statSync(path);
  // Fast fingerprint: size + first/last 8kb hash
  const buf = readFileSync(path);
  const head = buf.subarray(0, Math.min(8192, buf.length));
  const tail = buf.subarray(Math.max(0, buf.length - 8192));
  return createHash("sha1")
    .update(String(stat.size))
    .update(head)
    .update(tail)
    .digest("hex")
    .slice(0, 16);
}

function ensureDir(dir: string) {
  mkdirSync(dir, { recursive: true });
}

function main() {
  const sourceDirs = readdirSync(SOURCE_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /FINIALIZED PHOTOS/i.test(d.name))
    .map((d) => join(SOURCE_ROOT, d.name));

  if (!sourceDirs.length) {
    throw new Error("No FINIALIZED PHOTOS folders found under images/");
  }

  const allFiles = sourceDirs.flatMap((dir) => walk(dir));
  const seen = new Set<string>();
  const byCategory: Record<string, string[]> = {};

  for (const file of allFiles) {
    const category = categoryForPath(file);
    if (!category) continue;

    const fp = fileFingerprint(file);
    if (seen.has(fp)) continue;
    seen.add(fp);

    const destDir = join(DEST_ROOT, category);
    ensureDir(destDir);

    let destName = slugifyName(basename(file));
    let destPath = join(destDir, destName);
    let n = 1;
    while (existsSync(destPath) && fileFingerprint(destPath) !== fp) {
      const ext = extname(destName);
      const stem = basename(destName, ext);
      destName = `${stem}-${n}${ext}`;
      destPath = join(destDir, destName);
      n += 1;
    }

    if (!existsSync(destPath)) {
      copyFileSync(file, destPath);
    }

    const publicPath = `/images/projects/${category}/${destName}`;
    byCategory[category] ??= [];
    byCategory[category].push(publicPath);
  }

  // Prefer larger files first within each category (likely higher quality)
  for (const [category, paths] of Object.entries(byCategory)) {
    byCategory[category] = paths.sort((a, b) => {
      const sa = statSync(join(ROOT, "public", a.replace(/^\//, ""))).size;
      const sb = statSync(join(ROOT, "public", b.replace(/^\//, ""))).size;
      return sb - sa;
    });
  }

  const services: Catalog["services"] = {};
  for (const [slug, categories] of Object.entries(SERVICE_CATEGORIES)) {
    const gallery = Array.from(
      new Set(categories.flatMap((cat) => byCategory[cat] ?? [])),
    );
    services[slug] = {
      hero: gallery[0] ?? "/images/hero-balcony.jpg",
      gallery: gallery.slice(0, 24),
    };
  }

  const homepage = Array.from(
    new Set([
      ...(byCategory["invisible-grill-balcony"] ?? []).slice(0, 8),
      ...(byCategory["safety-nets-balcony"] ?? []).slice(0, 6),
      ...(byCategory["mosquito-nets"] ?? []).slice(0, 3),
      ...(byCategory["cloth-hangers"] ?? []).slice(0, 3),
      ...(byCategory["bird-spikes"] ?? []).slice(0, 3),
      ...(byCategory["cricket-nets"] ?? []).slice(0, 3),
      ...(byCategory["duct-area-nets"] ?? []).slice(0, 4),
      ...(byCategory["children-safety-nets"] ?? []).slice(0, 3),
    ]),
  ).slice(0, 24);

  const galleryPage = Object.values(byCategory)
    .flat()
    .slice(0, 120);

  const catalog: Catalog = {
    generatedAt: new Date().toISOString(),
    totalImages: Object.values(byCategory).reduce((n, arr) => n + arr.length, 0),
    categories: byCategory,
    services,
    homepage,
    galleryPage,
  };

  ensureDir(join(ROOT, "src", "data"));
  writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));

  // Hero / OG fallbacks from best balcony shot
  const heroSrc =
    byCategory["invisible-grill-balcony"]?.[0] ??
    byCategory["safety-nets-balcony"]?.[0];
  if (heroSrc) {
    const abs = join(ROOT, "public", heroSrc.replace(/^\//, ""));
    ensureDir(join(ROOT, "public", "images"));
    copyFileSync(abs, join(ROOT, "public", "images", "hero-balcony.jpg"));
    copyFileSync(abs, join(ROOT, "public", "images", "open-graph.jpg"));
  }

  console.log(
    `Synced ${catalog.totalImages} unique images across ${Object.keys(byCategory).length} categories`,
  );
  console.log(`Catalog → ${relative(ROOT, CATALOG_PATH)}`);
}

main();
