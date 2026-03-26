export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string | null;
  description: string | null;
  imageUrl: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

export interface RestaurantFormData {
  name: string;
  address: string;
  phone: string;
  email?: string;
  description?: string;
  image?: File | null;
}