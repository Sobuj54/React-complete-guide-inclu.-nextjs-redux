import { COOKIE_KEYS } from "@/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/") {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(COOKIE_KEYS.ACCESS)?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const expiry = request.cookies.get(COOKIE_KEYS.EXPIRY)?.value;
  const expiryTime = expiry ? Date.parse(expiry) : 0;
  const isTokenExpired = !expiryTime || Date.now() > expiryTime - 5000;

  if (isTokenExpired) {
    const res = NextResponse.redirect(new URL("/", request.url));

    res.cookies.delete(COOKIE_KEYS.ACCESS);
    res.cookies.delete(COOKIE_KEYS.REFRESH);
    res.cookies.delete(COOKIE_KEYS.EXPIRY);

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /static, favicon.ico, images, etc.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
