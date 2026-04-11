import { LoginResponse } from "@/types";
import { cookies } from "next/headers";
import { COOKIE_KEYS, cookieOptions } from "./constants";

export async function getAuthCookies() {
  const cookieStore = await cookies();

  return {
    accessToken: cookieStore.get(COOKIE_KEYS.ACCESS)?.value,
    refreshToken: cookieStore.get(COOKIE_KEYS.REFRESH)?.value,
    expiry: cookieStore.get(COOKIE_KEYS.EXPIRY)?.value,
  };
}

export async function setAuthCookies(data: LoginResponse) {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_KEYS.ACCESS, data.token, cookieOptions);
  cookieStore.set(COOKIE_KEYS.REFRESH, data.refreshToken, cookieOptions);
  cookieStore.set(
    COOKIE_KEYS.EXPIRY,
    data.refreshTokenExpiryTime,
    cookieOptions,
  );
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_KEYS.ACCESS);
  cookieStore.delete(COOKIE_KEYS.REFRESH);
  cookieStore.delete(COOKIE_KEYS.EXPIRY);
}
