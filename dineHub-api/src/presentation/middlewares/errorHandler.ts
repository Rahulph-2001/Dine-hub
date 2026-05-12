import { Request, Response, NextFunction } from "express";
import { AppError } from "../../domain/errors/AppError";
import { ERROR_MESSAGES } from "../../config/messages";
import { HttpStatus } from "../../shared/http/HttpStatus";

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error("Error:", err);

  if (err instanceof AppError) {
    const appError = err as AppError;
    res.status(appError.statusCode).json({
      success: false,
      message: appError.message,
      error: { code: appError.constructor.name, message: appError.message },
    });
    return;
  }

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: ERROR_MESSAGES.GENERAL.INTERNAL_SERVER_ERROR,
    error: { code: "InternalServerError", message: ERROR_MESSAGES.GENERAL.INTERNAL_SERVER_ERROR },
  });
};
