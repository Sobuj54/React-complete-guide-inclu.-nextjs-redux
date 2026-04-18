import { logOut } from "@/actions/auth-actions";
import { getAuthCookies, setAuthCookies } from "@/utils/auth-utils";
import axios from "axios";

export const serverApi = async () => {
  const { accessToken, refreshToken } = await getAuthCookies();

  const instance = axios.create({
    baseURL: process.env.API_URL,
  });

  if (accessToken) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const res = await axios.post(
            `${process.env.API_URL}/Auth/refreshToken`,
            {
              refreshToken: refreshToken,
            },
          );

          if (res.status === 200) {
            const newTokens = res.data;
            await setAuthCookies(newTokens);

            originalRequest.headers["Authorization"] =
              `Bearer ${newTokens.accessToken}`;
            return instance(originalRequest);
          }
        } catch (refreshError) {
          await logOut();
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
};
