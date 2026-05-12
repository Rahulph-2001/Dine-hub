import { Request, Response, NextFunction } from "express";
import { UserRole } from "../../domain/enums/UserRole";
import { ERROR_MESSAGES } from "../../config/messages";
import { HttpStatus } from "../../shared/http/HttpStatus";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== UserRole.ADMIN) {
        res.status(HttpStatus.FORBIDDEN).json({
            success: false,
            message: ERROR_MESSAGES.AUTH.FORBIDDEN,
            error: { code: "FORBIDDEN", message: ERROR_MESSAGES.AUTH.FORBIDDEN },
        });
        return;
    }
    next()
}