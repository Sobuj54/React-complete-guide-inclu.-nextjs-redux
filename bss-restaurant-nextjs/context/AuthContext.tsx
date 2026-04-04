"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import axiosPublic from "@/lib/axios/axiosPublic";
import { tokenStorage } from "@/utils/token";
import { AuthContextType, LoginResponse, User } from "@/types";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  useEffect(() => {
    const hydrateAuth = async () => {
      const token = tokenStorage.getAccessToken();

      if (!token || tokenStorage.isExpired()) {
        tokenStorage.clear();
        setUser(null);
        setStatus("unauthenticated");
        return;
      }

      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const { data } = await axiosPublic.get("/Auth/profile", { headers });

        setUser(data);
        setStatus("authenticated");
      } catch (error) {
        console.error("Hydration failed:", error);
        tokenStorage.clear();
        setUser(null);
        setStatus("unauthenticated");
      }
    };
    hydrateAuth();
  }, []);

  const login = (authResponse: LoginResponse) => {
    tokenStorage.setTokens(authResponse);
    setUser(authResponse.user);
    setStatus("authenticated");
  };

  const logout = () => {
    tokenStorage.clear();
    setUser(null);
    setStatus("unauthenticated");
    toast.success("Log out successful.");
  };

  const value = {
    user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
