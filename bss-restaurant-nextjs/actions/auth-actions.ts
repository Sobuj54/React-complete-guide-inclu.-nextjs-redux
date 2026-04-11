"use server";

import { ApiError, LoginFormFields, LoginResponse } from "@/types";
import { clearAuthCookies, setAuthCookies } from "@/utils/auth-utils";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";

export async function loginActon(loginData: LoginFormFields) {
  try {
    const { data } = await axios.post<LoginResponse>(
      `${process.env.API_URL}/Auth/signIn`,
      loginData,
    );
    await setAuthCookies(data);

    return { success: true };
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;

    return {
      success: false,
      message: axiosError.response?.data?.message || "Authentication failed",
    };
  }
}

export async function logOut() {
  await clearAuthCookies();
  return { success: true };
}
