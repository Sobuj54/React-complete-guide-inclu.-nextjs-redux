import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import axiosPublic from "../api/axios";
import toast from "react-hot-toast";

export const useAuth = () => {
  const navigate = useNavigate();
  const { login: setGlobalAuth } = useAuthContext();

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const { data } = await axiosPublic.post("/Auth/signIn", credentials);
      console.log("Response data:", data);
      return data;
    },
    onSuccess: (data) => {
      setGlobalAuth(data);
      toast.success("Login Successful!");
      navigate("/dashboard");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Log in failed!";
      toast.error(message);
      console.error("Login Error Details:", error.response?.data);
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
};
