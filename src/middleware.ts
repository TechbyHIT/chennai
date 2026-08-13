import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
