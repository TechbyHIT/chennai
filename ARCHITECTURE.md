# Architecture

## Overview

Glory Invisible Grills is a **Tamil Nadu–only** programmatic SEO platform:

- Next.js App Router (RSC + ISR)
- PostgreSQL + Drizzle for production data
- Redis for search/cache (in-memory fallback)
- File seeds for local builds without Docker (`DATA_SOURCE=file`)

## Key layers

1. **Config** — business, SEO, navigation, publishing, routes
2. **Data / DB** — `src/data/*` seeds → `geo_nodes` / `services` via `npm run db:seed`
3. **Repositories** — `src/lib/data/repositories.ts` (file or hydrated DB store)
4. **Page registry** — combination generation, quality gates, cursor pagination
5. **Content engine** — module composer + unique place intros
6. **Search** — `/api/search` with Redis-backed index
7. **SEO** — metadata, canonicals, honest JSON-LD, sharded sitemaps
8. **App Router** — preferred URLs + legacy 301s, ISR (`revalidate = 86400`)
9. **Deploy** — Docker Compose (`web`, `postgres`, `redis`, `nginx`)

## Preferred URLs

- `/{service}-in-{city}/`
- `/{service}/tamil-nadu/{city}/{area}/`

## Capacity model

Possible page capacity grows with services × cities × areas. Publish only validated, useful pages (quality ≥ 80, verified local fields, no unresolved placeholders).

## Trust

No fabricated AggregateRating, Review schema, or install counts until verified data exists.
