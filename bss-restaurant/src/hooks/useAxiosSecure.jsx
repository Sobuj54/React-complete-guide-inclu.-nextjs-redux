import axios from "axios";
import { useEffect } from "react";
import { tokenStorage } from "../utils/token";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API,
});

const useAxiosSecure = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = tokenStorage.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err.config;

        if (
          err.response &&
          err.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            const refreshToken = tokenStorage.getRefreshToken();

            if (!refreshToken || tokenStorage.isExpired()) {
              throw new Error("No refresh token found in storage");
            }

            const response = await axios.post(
              `${import.meta.env.VITE_API}/Auth/refreshToken`,
              {
                refreshToken,
              },
            );

            const {
              accessToken: token,
              refreshToken: newRefreshToken,
              refreshTokenExpiryTime,
            } = response.data;

            localStorage.setItem("bss_access_token", token);
            localStorage.setItem("bss_refresh_token", newRefreshToken);
            localStorage.setItem("bss_token_expiry", refreshTokenExpiryTime);

            originalRequest.headers.Authorization = `Bearer ${token}`;

            return axiosSecure(originalRequest);
          } catch (refreshError) {
            logout();
            navigate("/");
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(err);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
