# Lean production deployment — PM2 + standalone (recommended)

Target host: Ubuntu 24.04, Node.js 22 LTS, PM2, Nginx, shared SSD for **50+ sites**.

| Path | Approx disk | Notes |
| --- | --- | --- |
| Full repo + `node_modules` | ~500 MB+ | Build machine only |
| `.next/standalone` (runtime) | ~80–150 MB + `public` | What each site should run |
| `dist/production` pack | same as standalone | Rsync this folder only |

## Preferred deploy (smallest footprint)

On a **build** machine (or CI):

```bash
npm ci
npm run build                 # postbuild prepares standalone + strips maps/docs
npm run deploy:pack           # writes dist/production/
npm run deploy:clean          # deletes .next/cache etc. (keeps standalone)
```

On the **server**:

```bash
rsync -a --delete dist/production/ /var/www/glory-invisible-grills/
cd /var/www/glory-invisible-grills
pm2 start ecosystem.config.cjs
# updates:
pm2 reload glory-invisible-grills
```

Do **not** copy: `src/`, tests, docs, `.git`, full `node_modules`, `.next/cache`.

App listens on **127.0.0.1:3007**. Nginx: `nginx/pm2-site.conf` + global `nginx/nginx.conf`.

## PM2 logrotate (once per server)

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 5M
pm2 set pm2-logrotate:retain 3
pm2 set pm2-logrotate:compress true
pm2 set pm2-logrotate:workerInterval 60
```

One fork process per site — **no cluster** unless a single site needs it.

## After-build cleanup (safe)

```bash
npm run footprint             # see largest dirs
npm run deploy:clean          # free cache without touching runtime
```

Never delete `.next/standalone` or `dist/production` while the site is live.

## Environment

- `PORT=3007` (ecosystem)
- `NEXT_PUBLIC_SITE_URL=https://gloryinvisiblegrills.in`
- `DATA_SOURCE=file` (default; skip Postgres/Redis for lowest RAM)
- `DATABASE_URL` / `REDIS_URL` only if `DATA_SOURCE=db`
- `REVALIDATE_SECRET=...`
- `NEXT_TELEMETRY_DISABLED=1` (set in ecosystem)

## Optional Docker

Multi-stage `Dockerfile` ships standalone only. Prefer PM2 packs on multi-site hosts (no containerd layer bloat).

## Health

```bash
curl -I http://127.0.0.1:3007/
curl -sI https://gloryinvisiblegrills.in/sitemap.xml
pm2 status
pm2 logs glory-invisible-grills --lines 50
```

## Why these choices

| Optimization | Impact |
| --- | --- |
| `output: "standalone"` | Avoids shipping full `node_modules` (~400 MB+ saved per site) |
| `productionSourceMaps: false` | Tens of MB less disk; faster cold start |
| Strip `*.map` / README in postbuild | Extra few MB cleaned per build |
| `optimizePackageImports` | Smaller JS chunks → less CPU/RAM parsing |
| Lean image size list | Smaller image-optimizer cache on SSD |
| PM2 fork + 450M restart + 384M heap | Stable under 50 concurrent sites |
| Nginx gzip/HTTP2 + long cache for `/_next/static` | Less origin CPU, faster TTFB |
| High-intent sitemaps only | Crawl budget + less sitemap generation CPU |
