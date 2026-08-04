# Deployment — PM2 + standalone Node (recommended)

Preferred production setup: **Node.js + PM2 + nginx**, no Docker. Lower disk use and easier cache cleanup across multiple sites.

| | Docker | PM2 (this project) |
| --- | --- | --- |
| Disk per site | ~1–1.5 GB | ~800 MB–1 GB |
| Build cache | containerd | project folder (easy to delete) |
| 10 sites | ~12–18 GB | ~8–12 GB |

## Server requirements

- Node.js 22+
- PM2 (`npm i -g pm2`)
- nginx reverse proxy

## Deploy steps

```bash
cd /var/www/glory-invisible-grills   # or your path
git pull
npm ci
npm run media:sync                   # sync HD photos → public/images/projects
npm run build

# Standalone output needs static + public assets beside server.js
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

pm2 start ecosystem.config.cjs
# later updates:
pm2 reload glory-invisible-grills
```

App listens on **127.0.0.1:3007**. Point nginx at it using `nginx/pm2-site.conf`.

### After build cleanup (optional, saves disk)

```bash
# Keep .next/standalone + node_modules needed by standalone runtime.
# You can remove unused source caches carefully; never delete .next/standalone.
rm -rf .next/cache
```

## Environment

Copy `.env.example` → `.env` (or export in PM2 `env`):

- `PORT=3007` (set in `ecosystem.config.cjs`)
- `NEXT_PUBLIC_SITE_URL=https://your-domain`
- `DATA_SOURCE=file` (default) or `db` if Postgres is configured
- `DATABASE_URL` / `REDIS_URL` only if using the DB mode
- `REVALIDATE_SECRET=...`

## Media

HD source folders live under `images/FINIALIZED PHOTOS*`.  
`npm run media:sync` dedupes and copies into `public/images/projects/` and regenerates `src/data/generated-media.json`.

## Optional Docker

`docker-compose.yml` remains for local Postgres/Redis experiments only. Production path is PM2.

## Health checks

```bash
curl -I http://127.0.0.1:3007/
pm2 status
pm2 logs glory-invisible-grills
```
