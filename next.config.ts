import type { NextConfig } from "next";
import path from "node:path";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "standalone",
  // Avoid picking /var/www/package-lock.json when multiple sites share a parent folder.
  outputFileTracingRoot: path.join(__dirname),
  reactStrictMode: true,
  poweredByHeader: false,
  // Skip ESLint during `next build` so VPS deploys are not blocked by lint.
  eslint: { ignoreDuringBuilds: true },
  // Keep URL shape consistent with SITE_CONFIG.trailingSlash and all route builders.
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  compress: true,
  // Browser source maps off by default; keep explicit for lean prod disks.
  productionBrowserSourceMaps: false,
  // Optional DB/Redis stay external to the server bundle graph.
  serverExternalPackages: ["ioredis", "pg", "drizzle-orm"],
  compiler: {
    // Drop console.* in production client/server bundles (keep error/warn for ops).
    removeConsole: isProd ? { exclude: ["error", "warn"] } : false,
  },
  experimental: {
    // Tree-shake heavy barrels → smaller client chunks, less RAM at runtime.
    optimizePackageImports: ["framer-motion", "zod"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Leaner variant set = less image-optimizer cache on a 50-site SSD.
    deviceSizes: [360, 640, 768, 1024, 1280],
    imageSizes: [32, 64, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://www.clarity.ms",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=43200",
          },
        ],
      },
      {
        source: "/sitemap/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=43200",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=43200",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
