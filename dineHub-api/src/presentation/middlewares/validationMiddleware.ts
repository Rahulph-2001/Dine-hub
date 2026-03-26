import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { ERROR_MESSAGES } from "../../config/messages";

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        res.status(400).json({
          success: false,
          message: ERROR_MESSAGES.GENERAL.VALIDATION_FAILED,
          error: {
            code: "VALIDATION_ERROR",
            message: ERROR_MESSAGES.GENERAL.INVALID_INPUT,
            details: formattedErrors,
          },
        });
        return;
      }
      next(error);
    }
  };
};
``