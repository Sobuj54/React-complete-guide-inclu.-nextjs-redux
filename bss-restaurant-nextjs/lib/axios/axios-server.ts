import { getAuthCookies } from "@/utils/auth-utils";
import axios from "axios";

export const serverApi = async () => {
  const { accessToken } = await getAuthCookies();

  const instance = axios.create({
    baseURL: process.env.API_URL,
  });

  if (accessToken) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  return instance;
};
