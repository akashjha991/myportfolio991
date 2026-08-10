import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Mobile UA detection regex — matches Android phones, iPhones, iPads (touch),
 * and other common mobile/tablet User-Agent strings.
 */
const MOBILE_UA_RE =
  /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") ?? "";
  const isMobile = MOBILE_UA_RE.test(ua);

  /**
   * Rule 1: Mobile visits "/" → redirect to "/android"
   * But only if they haven't explicitly chosen the classic view
   * (we check for a "view=classic" cookie set by the override link).
   */
  if (pathname === "/" && isMobile) {
    const viewPref = request.cookies.get("view-preference")?.value;
    if (viewPref !== "classic") {
      return NextResponse.redirect(new URL("/android", request.url));
    }
  }

  /**
   * Rule 2: Desktop visits "/android" → redirect to "/" (classic view)
   * But only if they haven't explicitly chosen Android mode
   * (we check for a "view=android" cookie, set when someone clicks the
   * "Android Mode" pill on the classic site).
   */
  if (pathname === "/android" && !isMobile) {
    const viewPref = request.cookies.get("view-preference")?.value;
    if (viewPref === "android") {
      // They explicitly chose Android mode on desktop — allow it
      return NextResponse.next();
    }
    // Regular desktop visitor hitting /android directly — allow it
    // (we keep the phone-in-bezel view for desktop as intended)
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Only run on "/" and "/android".
     * Exclude API routes, static files, images, and metadata files.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
