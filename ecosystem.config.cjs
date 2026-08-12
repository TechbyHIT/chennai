/**
 * PM2 — one fork process per site (no cluster).
 * Tuned for 50+ Next.js sites on a shared Ubuntu host.
 *
 * Install once on the server:
 *   pm2 install pm2-logrotate
 *   pm2 set pm2-logrotate:max_size 5M
 *   pm2 set pm2-logrotate:retain 3
 *   pm2 set pm2-logrotate:compress true
 *   pm2 set pm2-logrotate:workerInterval 60
 *
 * Build + pack on CI/build host, then rsync dist/production/ to this cwd.
 */
module.exports = {
  apps: [
    {
      name: "glory-invisible-grills",
      cwd: __dirname,
      // Repo deploy: ".next/standalone/server.js"
      // Packed deploy (dist/production): "server.js"
      script: require("node:fs").existsSync(
        require("node:path").join(__dirname, "server.js"),
      )
        ? "server.js"
        : ".next/standalone/server.js",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_restarts: 12,
      min_uptime: "10s",
      exp_backoff_restart_delay: 200,
      kill_timeout: 5000,
      listen_timeout: 12000,
      // Soft cap — restart leaky processes before they starve other sites.
      max_memory_restart: "450M",
      merge_logs: true,
      time: false,
      out_file: "logs/out.log",
      error_file: "logs/err.log",
      log_date_format: "YYYY-MM-DD HH:mm:ssZ",
      env: {
        NODE_ENV: "production",
        PORT: 3009,
        HOSTNAME: "127.0.0.1",
        NEXT_TELEMETRY_DISABLED: "1",
        // Keep V8 heap modest so 50 sites fit in RAM.
        NODE_OPTIONS: "--max-old-space-size=384",
        DATA_SOURCE: process.env.DATA_SOURCE || "file",
        NEXT_PUBLIC_SITE_URL:
          process.env.NEXT_PUBLIC_SITE_URL ||
          "https://gloryinvisiblegrills.in",
      },
    },
  ],
};
