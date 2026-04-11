"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LoginFormFields } from "@/types";
import { loginActon } from "@/actions/auth-actions";

export const useAuth = () => {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginFormFields) => {
      const result = await loginActon(credentials);
      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: () => {
      toast.success("Login Successful!");
      router.push("/dashboard");
      router.refresh(); // Forces Next.js to re-check the cookies/middleware
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
  };
};
