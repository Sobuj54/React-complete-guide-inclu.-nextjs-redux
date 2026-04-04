"use client";

import { LoginFormFields } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const loginSchema = z.object({
  userName: z.email("Email is required."),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const useAuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "admin@mail.com",
      password: "Admin@123",
    },
  });

  return {
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    errors,
  };
};
