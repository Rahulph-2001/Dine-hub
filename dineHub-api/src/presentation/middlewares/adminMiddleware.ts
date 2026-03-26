import { Request, Response, NextFunction } from "express";
import { UserRole } from "../../domain/enums/UserRole";
import { ERROR_MESSAGES } from "../../config/messages";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    if(!req.user || req.user.role !== UserRole.ADMIN){
        res.status(403).json({
            success:false,
            message: ERROR_MESSAGES.AUTH.FORBIDDEN,
            error: { code: "FORBIDDEN", message: ERROR_MESSAGES.AUTH.FORBIDDEN },
        });
        return ;
    }
    next()
}