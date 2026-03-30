import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../../config/routes";
import type { ApiResponse, Restaurant } from "../../types";

export const restaurantService = {
  getAll: async (params?: { page?: number; limit?: number; search?: string }) => {
    const response = await axiosInstance.get<ApiResponse<{ data: Restaurant[]; total: number }>>(
      API_ENDPOINTS.RESTAURANT.BASE,
      { params }
    );
    return response.data;
  },
  getMy: async (params?: { page?: number; limit?: number; search?: string }) => {
    const response = await axiosInstance.get<ApiResponse<{ data: Restaurant[]; total: number }>>(
      API_ENDPOINTS.RESTAURANT.MY,
      { params }
    );
    return response.data;
  },
  getById: async (id: string) => {
    const response = await axiosInstance.get<ApiResponse<Restaurant>>(
      API_ENDPOINTS.RESTAURANT.BY_ID(id)
    );
    return response.data;
  },
  create: async (data: FormData) => {
    const response = await axiosInstance.post<ApiResponse<Restaurant>>(
      API_ENDPOINTS.RESTAURANT.BASE,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  },
  update: async (id: string, data: FormData) => {
    const response = await axiosInstance.put<ApiResponse<Restaurant>>(
      API_ENDPOINTS.RESTAURANT.BY_ID(id),
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  },
  delete: async (id: string) => {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.RESTAURANT.BY_ID(id)
    );
    return response.data;
  }
};
