export type AnalyticsEvent =
  | "call_click"
  | "whatsapp_click"
  | "quote_submit"
  | "contact_submit"
  | "service_engagement"
  | "location_engagement";

export function trackEvent(event: AnalyticsEvent, payload?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const w = window as Window & {
    dataLayer?: Array<Record<string, unknown>>;
  };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...payload });
}
