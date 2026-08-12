#!/usr/bin/env bash
# One-shot VPS deploy from the repo root.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> Installing dependencies"
npm install

echo "==> Building standalone"
npm run build

if [ ! -f .next/standalone/server.js ]; then
  echo "Build did not produce .next/standalone/server.js"
  exit 1
fi

mkdir -p logs

echo "==> Starting PM2 on port 3009"
pm2 delete glory-invisible-grills 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save

echo "==> Health check"
curl -I http://127.0.0.1:3009/ || true
pm2 status
