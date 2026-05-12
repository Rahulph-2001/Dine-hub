import { Request, Response, NextFunction } from "express";
import { container } from "../../infrastructure/di/container";
import { TYPES } from "../../infrastructure/di/types";
import { IJwtService, JwtPayload } from "../../domain/services/IJwtService";
import { ERROR_MESSAGES } from "../../config/messages";
import { HttpStatus } from "../../shared/http/HttpStatus";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.AUTH.UNAUTHORIZED,
        error: { code: "UNAUTHORIZED", message: ERROR_MESSAGES.AUTH.UNAUTHORIZED },
      });
      return;
    }

    const jwtService = container.get<IJwtService>(TYPES.IJwtService);
    const decoded = jwtService.verifyToken(token);

    req.user = decoded;
    next();
  } catch (error: unknown) {
    res.clearCookie("token", { path: "/" });
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: ERROR_MESSAGES.AUTH.INVALID_TOKEN,
      error: { code: "UNAUTHORIZED", message: ERROR_MESSAGES.AUTH.INVALID_TOKEN },
    });
  }
};
