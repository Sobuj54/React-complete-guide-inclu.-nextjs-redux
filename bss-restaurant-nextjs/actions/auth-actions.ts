"use server";

import { serverApi } from "@/lib/axios/axios-server";
import { LoginFormFields, LoginResponse, User } from "@/types";
import { setAuthCookies } from "@/utils/auth-utils";
import { COOKIE_KEYS } from "@/utils/constants";
import { handleAction } from "@/utils/handle-action";
import axios from "axios";
import { cookies } from "next/headers";

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
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_KEYS.ACCESS);
  cookieStore.delete(COOKIE_KEYS.REFRESH);
  cookieStore.delete(COOKIE_KEYS.EXPIRY);

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
