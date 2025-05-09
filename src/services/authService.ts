import api from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}

export const login = (data: LoginPayload) => api.post("/auth/login", data);

export const register = (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => api.post("/auth/register", data);

export const forgotPassword = (email: string) =>
  api.post("/auth/forgot-password", { email });

export const resetPassword = (code: string, newPassword: string) =>
  api.post("/auth/reset-password", { code, newPassword });