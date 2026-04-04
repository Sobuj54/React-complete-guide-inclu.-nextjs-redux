"use client";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";
import axiosPublic from "@/lib/axios/axiosPublic";
import { useRouter } from "next/navigation";
import { ApiError, LoginFormFields, LoginResponse } from "@/types";
import { AxiosError } from "axios";

export const useAuth = () => {
  const { login } = useAuthContext();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginFormFields) => {
      const { data } = await axiosPublic.post("/Auth/signIn", credentials);
      return data;
    },
    onSuccess: (data: LoginResponse) => {
      login(data);
      toast.success("Login Successful!");
      router.push("/dashboard");
    },
    onError: (error) => {
      const message =
        (error as AxiosError<ApiError>).response?.data?.message ||
        "Log in failed!";
      toast.error(message);
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
};
