# SEO Architecture

## URL structure

Exact public routes as specified in the master brief, with Tamil Nadu locations.

## Indexability

Central rule: `src/lib/seo/is-page-indexable.ts`

Indexable pages require published status, quality ≥ 80, reviewed content, verified local data (when required), unique metadata/content, valid canonical/schema, internal links, and similarity ≤ 0.7.

## Metadata

`generatePageMetadata()` builds title, description, canonical, robots, Open Graph and Twitter tags from page records.

## Sitemaps

Runtime: `src/app/sitemap.ts`  
Offline grouped XML export: `npm run sitemaps:generate`

Only indexable pages are included.

## Robots

`src/app/robots.ts` allows public routes and blocks `/admin/` and private APIs.
