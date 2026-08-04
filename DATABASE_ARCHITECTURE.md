# Data Architecture (PostgreSQL + Drizzle + Redis)

Production data layer for the Tamil Nadu programmatic SEO platform. File seeds remain the source of truth for local builds without Docker.

## Stack

| Concern | Implementation |
| --- | --- |
| ORM | Drizzle (`src/db/schema.ts`) |
| Database | PostgreSQL 16 |
| Cache / search | Redis (`src/lib/cache/redis.ts`) with in-memory fallback |
| Seeds | `scripts/seed-database.ts` ← `src/data/*` + `tn-districts-cities.ts` |
| Repositories | `src/lib/data/repositories.ts` (`DATA_SOURCE=file` \| `db`) |

## Core tables

- `geo_nodes` — state / district / city / town / area / locality
- `geo_edges` — parent + nearby relations
- `service_categories`, `services`
- `page_records` — generated programmatic pages
- `media_assets`, `reviews` (empty until verified), `redirects`

## Modes

1. **Local / CI default:** `DATA_SOURCE=file` — sync reads from TypeScript seeds (no Postgres required for `next build`).
2. **Docker / production:** set `DATABASE_URL`, `REDIS_URL`, `DATA_SOURCE=db`, run migrations + `npm run db:seed`. `src/instrumentation.ts` hydrates an in-memory store (Redis-cached).

## Geo model

`buildTamilNaduLocations()` merges curated city content with expanded TN districts/cities. Areas from Chennai/Coimbatore seeds import into `geo_nodes` as area/locality rows.

## Publishing gates

Indexable only when published + quality ≥ 80 + unique metadata/content + verified local fields + no unresolved placeholders. CLI only — no admin CMS.
