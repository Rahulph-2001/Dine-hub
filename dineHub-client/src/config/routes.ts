export const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PROFILE: "/profile",
  RESTAURANTS: "/restaurants",
  RESTAURANT_DETAIL: "/restaurants/:id",
  RESTAURANT_CREATE: "/restaurants/new",
  RESTAURANT_EDIT: "/restaurants/:id/edit",
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: "/api/auth/signup",
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    ME: "/api/auth/me",
  },
  RESTAURANT: {
    BASE: "/api/restaurants",
    MY: "/api/restaurants/my",
    BY_ID: (id: string) => `/api/restaurants/${id}`,
  },
} as const;
