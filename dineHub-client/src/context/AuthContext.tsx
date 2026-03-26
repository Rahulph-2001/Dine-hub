import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, ApiResponse } from "../types";
import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../config/routes";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: async () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axiosInstance.get<ApiResponse<{ user: User }>>(API_ENDPOINTS.AUTH.ME);
        setUser(data.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch {
      // Even if API fails, clear local state
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "ADMIN",
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};