import { createContext, useContext, useState, useEffect } from "react";
import { tokenStorage } from "../utils/token";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | authenticated | unauthenticated

  useEffect(() => {
    const hydrateAuth = () => {
      const token = tokenStorage.getAccessToken();
      const expiry = tokenStorage.getExpiry();

      // Check if token exists and if the refresh token is still valid
      if (token && !tokenStorage.isExpired()) {
        // In production, you'd decode the JWT or fetch /me here
        // For now, we restore user from a secondary localStorage key or just set status
        setStatus("authenticated");
      } else {
        tokenStorage.clear();
        setStatus("unauthenticated");
      }
    };
    hydrateAuth();
  }, []);

  const login = (authResponse) => {
    tokenStorage.setTokens(authResponse);
    setUser(authResponse.user);
    setStatus("authenticated");
  };

  const logout = () => {
    tokenStorage.clear();
    setUser(null);
    setStatus("unauthenticated");
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

export const useAuthContext = () => useContext(AuthContext);
