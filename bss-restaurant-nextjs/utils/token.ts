"use client";

import { LoginResponse } from "@/types";

const TOKEN_KEY = "bss_access_token";
const REFRESH_TOKEN_KEY = "bss_refresh_token";
const EXPIRY_KEY = "bss_token_expiry";

export const tokenStorage = {
  setTokens: (data: LoginResponse) => {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    localStorage.setItem(EXPIRY_KEY, data.refreshTokenExpiryTime);
  },

  getAccessToken: () => localStorage.getItem(TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  getExpiry: () => localStorage.getItem(EXPIRY_KEY),

  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(EXPIRY_KEY);
  },

  isExpired: () => {
    const expiry = localStorage.getItem(EXPIRY_KEY);
    if (!expiry) return true;
    return new Date().getTime() > new Date(expiry).getTime();
  },
};
