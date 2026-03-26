export const SUCCESS_MESSAGES = {
  AUTH: {
    SIGNUP_SUCCESS: "User registered successfully",
    LOGIN_SUCCESS: "User logged in successfully",
  },
  RESTAURANT: {
    CREATED: "Restaurant created successfully",
    FETCHED: "Restaurants retrieved successfully",
    DETAILS_FETCHED: "Restaurant details retrieved successfully",
    UPDATED: "Restaurant updated successfully",
    DELETED: "Restaurant deleted successfully",
  },
} as const;

export const ERROR_MESSAGES = {
  AUTH: {
    EMAIL_ALREADY_EXISTS: "A user with this email already exists",
    INVALID_CREDENTIALS: "Invalid email or password",
    UNAUTHORIZED: "Authentication required. Please log in",
    FORBIDDEN: "You do not have permission to perform this action",
    INVALID_TOKEN: "Invalid or expired token",
  },
  RESTAURANT: {
    NOT_FOUND: "Restaurant not found",
  },
  GENERAL: {
    INTERNAL_SERVER_ERROR: "An unexpected error occurred",
    VALIDATION_FAILED: "Validation failed",
    INVALID_INPUT: "Invalid input data",
  },
} as const;
