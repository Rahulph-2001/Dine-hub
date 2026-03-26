export const UI_MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: "Logged in successfully!",
    SIGNUP_SUCCESS: "Account created successfully!",
    LOGOUT_SUCCESS: "Logged out successfully!",
    SESSION_EXPIRED: "Session expired. Please login again.",
  },
  RESTAURANT: {
    CREATED: "Restaurant created successfully!",
    UPDATED: "Restaurant updated successfully!",
    DELETED: "Restaurant deleted successfully!",
    DELETE_CONFIRM: "Are you sure you want to delete this restaurant?",
  },
  ERROR: {
    GENERIC: "Something went wrong. Please try again.",
    NETWORK: "Network error. Please check your connection.",
  },
} as const;
