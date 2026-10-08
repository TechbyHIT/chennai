import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  RETIRED_CITY_SLUGS,
  RETIRED_TOWN_LOCALITIES,
} from "@/lib/routing/retired-locations";

/** Splits a /{service}-in-{city}/ style segment into its two halves. */
function parseServiceInCity(segment: string) {
  const marker = "-in-";
  const index = segment.lastIndexOf(marker);
  if (index <= 0) return null;
  const serviceSlug = segment.slice(0, index);
  const citySlug = segment.slice(index + marker.length);
  if (!serviceSlug || !citySlug) return null;
  return { serviceSlug, citySlug };
}

/**
 * Towns that lost their own city hub now redirect to the locality that
 * replaced them. Middleware returns a real 308 before any page render, so
 * Google records a redirect instead of a 200 noindex shell.
 */
function retiredTownRedirect(pathname: string): string | null {
  const parts = pathname.split("/").filter(Boolean);

  // /locations/{town}/ → /locations/{city}/{area}/
  if (parts.length === 2 && parts[0] === "locations") {
    const target = RETIRED_TOWN_LOCALITIES[parts[1]!];
    if (target) return `/locations/${target.citySlug}/${target.areaSlug}/`;
  }

  // /{service}-in-{town}/ → /{service}/tamil-nadu/{city}/{area}/
  if (parts.length === 1) {
    const parsed = parseServiceInCity(parts[0]!);
    const target = parsed && RETIRED_TOWN_LOCALITIES[parsed.citySlug];
    if (parsed && target) {
      return `/${parsed.serviceSlug}/tamil-nadu/${target.citySlug}/${target.areaSlug}/`;
    }
  }

  return null;
}

/** True for URL shapes belonging to a city we have stopped serving outright. */
function isRetiredCityUrl(pathname: string): boolean {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 2 && parts[0] === "locations") {
    return RETIRED_CITY_SLUGS.has(parts[1]!);
  }
  if (parts.length === 1) {
    const parsed = parseServiceInCity(parts[0]!);
    return Boolean(parsed && RETIRED_CITY_SLUGS.has(parsed.citySlug));
  }
  // /{service}/tamil-nadu/{city}/{area}/
  if (parts.length === 4 && parts[1] === "tamil-nadu") {
    return RETIRED_CITY_SLUGS.has(parts[2]!);
  }
  return false;
}

const GONE_BODY = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>Outside our service coverage</title></head>
<body style="font-family:system-ui,sans-serif;margin:0;padding:3rem 1.5rem;line-height:1.6">
<main style="max-width:38rem;margin:0 auto">
<h1 style="font-size:1.5rem">Outside our service coverage</h1>
<p>We no longer take bookings in this location. We serve Chennai and the towns
within 150 km, plus Coimbatore, Madurai, Tiruchirappalli, Salem, Tiruppur,
Erode, Hosur, Tirunelveli and Ooty.</p>
<p><a href="/locations/">See where we serve</a> &middot; <a href="/">Home</a></p>
</main></body></html>`;

/**
 * trailingSlash is on for HTML URLs. Sitemap/robots XML must 200 at the
 * exact path Google requests — a 308 to a trailing slash makes GSC report
 * "Couldn't fetch" with 0 URLs.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const retired = retiredTownRedirect(pathname);
  if (retired) {
    const url = request.nextUrl.clone();
    url.pathname = retired;
    return NextResponse.redirect(url, 308);
  }

  if (isRetiredCityUrl(pathname)) {
    return new NextResponse(GONE_BODY, {
      status: 410,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Robots-Tag": "noindex",
      },
    });
  }

  const last = pathname.split("/").filter(Boolean).pop() ?? "";
  const isFile = last.includes(".");

  if (isFile) {
    if (pathname.endsWith("/")) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.slice(0, -1);
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  if (pathname !== "/" && !pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = `${pathname}/`;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|images/|favicon.ico|icon.png).*)",
  ],
};
