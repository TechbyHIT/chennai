import Script from "next/script";
import { BUSINESS_CONFIG } from "@/config/business";

/**
 * One gtag.js loader + both property configs (GA4 + Google Ads).
 * Equivalent to two separate Google tag snippets, without double-loading the script.
 */
export function GoogleTags() {
  const gaId = BUSINESS_CONFIG.analytics.googleAnalyticsId;
  const adsId = BUSINESS_CONFIG.analytics.googleAdsId;
  const ids = [gaId, adsId].filter((id): id is string => Boolean(id));
  if (ids.length === 0) return null;

  const primary = ids[0];
  const configs = ids
    .map((id) => `gtag('config', '${id}');`)
    .join("\n          ");

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primary}`}
        strategy="afterInteractive"
      />
      <Script id="google-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${configs}
        `}
      </Script>
    </>
  );
}
