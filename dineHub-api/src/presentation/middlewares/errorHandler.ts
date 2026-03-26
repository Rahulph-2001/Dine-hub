import { Request, Response, NextFunction } from "express";
import { AppError } from "../../domain/errors/AppError";
import { ERROR_MESSAGES } from "../../config/messages";

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error("Error:", err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: { code: err.constructor.name, message: err.message },
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: ERROR_MESSAGES.GENERAL.INTERNAL_SERVER_ERROR,
    error: { code: "InternalServerError", message: ERROR_MESSAGES.GENERAL.INTERNAL_SERVER_ERROR },
  });
};
