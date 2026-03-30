import axios from "axios";

// In development, force relative URLs so the Vite proxy handles it.
// In production, use the hosted remote URL (e.g., Vercel environment variable).
const API_BASE_URL = import.meta.env.DEV ? "" : (import.meta.env.VITE_API_URL || "");

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
