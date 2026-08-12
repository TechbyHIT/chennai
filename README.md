# Glory Invisible Grills — Tamil Nadu Enterprise SEO Platform

Production-grade programmatic SEO site for **Tamil Nadu only**: Next.js App Router, PostgreSQL + Drizzle, Redis, Docker Compose, Nginx. Pages generate from structured data — no admin CMS.

## Stack

- Next.js App Router + React + TypeScript strict + Tailwind + Framer Motion
- Drizzle ORM + PostgreSQL (Docker)
- Redis cache / search autocomplete (in-memory fallback locally)
- Zod, Vitest, Playwright, ESLint, Prettier

## Quick start (file data, no Docker)

```bash
npm install
cp .env.example .env.local
npm run media:sync
npm run dev
```

Open [http://localhost:3009](http://localhost:3009).

## Production (PM2 + standalone, port 3009)

```bash
npm ci
npm run media:sync
npm run build
# Linux server: copy public + static into standalone (see DEPLOYMENT.md)
pm2 start ecosystem.config.cjs
```

Nginx proxies to `127.0.0.1:3009`. See `DEPLOYMENT.md` and `nginx/pm2-site.conf`.

## Optional local Docker (Postgres/Redis only)

```bash
docker compose up postgres redis -d
npm run db:migrate && npm run db:seed
# DATA_SOURCE=db
```

## Important commands

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run db:generate
npm run db:migrate
npm run db:seed
npm run pages:count
npm run pages:create -- --type=service-location --limit=1000
npm run pages:publish -- --batch-size=100
npm run pages:noindex
npm run seo:audit
npm run content:audit
npm run schema:audit
npm run placeholders:audit
```

## URL patterns

- City: `/{service}-in-{city}/`
- Area: `/{service}/tamil-nadu/{city}/{area}/`
- Legacy 301s retained under `src/app/[segment]/`

## Trust / SEO honesty

No fabricated AggregateRating, Review schema, or install-count claims until verified data exists. NAP/map/social placeholders live in `src/config/business.ts`.

## Docs

- `ARCHITECTURE.md`
- `DATABASE_ARCHITECTURE.md`
- `SEO_ARCHITECTURE.md`
- `CONTENT_GUIDELINES.md`
- `PAGE_GENERATION.md`
- `PUBLISHING_WORKFLOW.md`
- `DEPLOYMENT.md`
- `URL_STRUCTURE.md`
- `KEYWORD_STRATEGY.md`
