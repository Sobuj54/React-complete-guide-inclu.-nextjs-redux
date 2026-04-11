"use client";

import axios from "axios";
import Cookies from "js-cookie";

const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

clientApi.interceptors.request.use((config) => {
  const token = Cookies.get("bss_access_token");
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default clientApi;
