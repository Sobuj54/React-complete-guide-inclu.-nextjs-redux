export interface User {
  fullName: string;
  email: string;
  id: string;
  image: string | null;
  phoneNumber: string;
  userName: string;
}

export interface ApiError {
  message: string;
}

export type colorType = "primary" | "secondary" | "success" | "error";
