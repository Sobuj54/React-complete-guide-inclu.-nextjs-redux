import { COOKIE_KEYS, cookieOptions } from "@/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/") {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(COOKIE_KEYS.ACCESS)?.value;
  const refreshToken = request.cookies.get(COOKIE_KEYS.REFRESH)?.value;
  const expiry = request.cookies.get(COOKIE_KEYS.EXPIRY)?.value;

  const expiryTime = expiry ? Date.parse(expiry) : 0;

  const isTokenExpired = !expiryTime || Date.now() > expiryTime - 5000;

  if (isTokenExpired && refreshToken) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);

      const res = await fetch(`${process.env.API_URL}/Auth/refreshToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error("Refresh request failed");
      }

      const data = await res.json();
      // Validate response structure
      if (
        !data?.accessToken ||
        !data?.refreshToken ||
        !data?.refreshTokenExpiryTime
      ) {
        throw new Error("Invalid refresh response");
      }

      const nextResponse = NextResponse.next();

      // Set new tokens securely
      nextResponse.cookies.set(
        COOKIE_KEYS.ACCESS,
        data.accessToken,
        cookieOptions,
      );
      nextResponse.cookies.set(
        COOKIE_KEYS.REFRESH,
        data.refreshToken,
        cookieOptions,
      );
      nextResponse.cookies.set(
        COOKIE_KEYS.EXPIRY,
        data.refreshTokenExpiryTime,
        cookieOptions,
      );

      return nextResponse;
    } catch (error) {
      const res = NextResponse.redirect(new URL("/", request.url));

      res.cookies.delete(COOKIE_KEYS.ACCESS);
      res.cookies.delete(COOKIE_KEYS.REFRESH);
      res.cookies.delete(COOKIE_KEYS.EXPIRY);

      return res;
    }
  }

  //  If no tokens at all → redirect early
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
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
