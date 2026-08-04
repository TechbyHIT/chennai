/**
 * PM2 process file — standalone Next.js on port 3007 (no Docker).
 *
 * Deploy flow:
 *   npm ci
 *   npm run media:sync   # if photos changed
 *   npm run build
 *   pm2 start ecosystem.config.cjs
 *   # or: pm2 reload glory-invisible-grills
 */
module.exports = {
  apps: [
    {
      name: "glory-invisible-grills",
      cwd: __dirname,
      script: ".next/standalone/server.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3007,
        HOSTNAME: "127.0.0.1",
        DATA_SOURCE: process.env.DATA_SOURCE || "file",
        NEXT_PUBLIC_SITE_URL:
          process.env.NEXT_PUBLIC_SITE_URL || "https://www.gloryinvisiblegrills.com",
      },
      max_memory_restart: "512M",
      time: true,
    },
  ],
};
