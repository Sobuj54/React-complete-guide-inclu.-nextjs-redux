"use server";

import { serverApi } from "@/lib/axios/axios-server";
import { LoginFormFields, LoginResponse, User } from "@/types";
import { clearAuthCookies, setAuthCookies } from "@/utils/auth-utils";
import { handleAction } from "@/utils/handle-action";
import axios from "axios";

export async function loginActon(loginData: LoginFormFields) {
  return handleAction(async () => {
    const { data } = await axios.post<LoginResponse>(
      `${process.env.API_URL}/Auth/signIn`,
      loginData,
    );
    await setAuthCookies(data);
  });
}

export async function logOut() {
  await clearAuthCookies();
  return { success: true };
}

export async function getCurrentUserProfile() {
  const api = await serverApi();

  return handleAction(async () => {
    return handleAction(async () => {
      const { data } = await api.get<User>(
        `${process.env.API_URL}/Auth/profile`,
      );

      return data;
    });
  });
}
