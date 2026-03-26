export const ROUTE_PATHS = {
  API_PREFIX: "/api",
  AUTH: {
    BASE: "/auth",
    SIGNUP: "/signup",
    LOGIN: "/login",
    LOGOUT: "/logout",
    ME: "/me",
  },
  RESTAURANT: {
    BASE: "/restaurants",
    BY_ID: "/:id",
    MY: "/my",
  },
  HEALTH: "/health",
} as const;