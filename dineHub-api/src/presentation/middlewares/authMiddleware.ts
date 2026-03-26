import { Request, Response, NextFunction } from "express";
import { container } from "../../infrastructure/di/container";
import { TYPES } from "../../infrastructure/di/types";
import { IJwtService, JwtPayload } from "../../domain/services/IJwtService";
import { ERROR_MESSAGES } from "../../config/messages";

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
      res.status(401).json({
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
  } catch (error) {
    res.clearCookie("token", { path: "/" });
    res.status(401).json({
      success: false,
      message: ERROR_MESSAGES.AUTH.INVALID_TOKEN,
      error: { code: "UNAUTHORIZED", message: ERROR_MESSAGES.AUTH.INVALID_TOKEN },
    });
  }
};
