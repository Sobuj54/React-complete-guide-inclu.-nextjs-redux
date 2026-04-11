export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "development",
  path: "/",
};

export const COOKIE_KEYS = {
  ACCESS: "bss_access_token",
  REFRESH: "bss_refresh_token",
  EXPIRY: "bss_token_expiry",
};
