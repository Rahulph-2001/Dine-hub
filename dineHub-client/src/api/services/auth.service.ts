import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../../config/routes";
import type { ApiResponse, AuthResponse, LoginFormData, SignupFormData } from "../../types";

export const authService = {
  login: async (data: LoginFormData) => {
    const response = await axiosInstance.post<ApiResponse<{ user: AuthResponse["user"] }>>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    return response.data;
  },
  signup: async (data: SignupFormData) => {
    const response = await axiosInstance.post<ApiResponse<{ user: AuthResponse["user"] }>>(
      API_ENDPOINTS.AUTH.SIGNUP,
      data
    );
    return response.data;
  },
  logout: async () => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },
  me: async () => {
    const response = await axiosInstance.get<ApiResponse<{ user: AuthResponse["user"] }>>(
      API_ENDPOINTS.AUTH.ME
    );
    return response.data;
  }
};
