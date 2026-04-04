import { User } from "./common";

export interface LoginResponse {
  token: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (authResponse: LoginResponse) => void;
  logout: () => void;
}

export interface LoginFormFields {
  userName: string;
  password: string;
}
