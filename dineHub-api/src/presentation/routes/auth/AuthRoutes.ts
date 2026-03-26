import { Router } from "express";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../infrastructure/di/types";
import { AuthController } from "../../controllers/auth/AuthController";
import { validateBody } from "../../middlewares/validationMiddleware";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { SignupSchema } from "../../../application/dto/auth/SignupDTO";
import { LoginSchema } from "../../../application/dto/auth/LoginDTO";
import { ROUTE_PATHS } from "../../../config/routeConstants";

@injectable()
export class AuthRoutes {
  public readonly router: Router = Router();

  constructor(@inject(TYPES.AuthController) private readonly controller: AuthController) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(ROUTE_PATHS.AUTH.SIGNUP, validateBody(SignupSchema), this.controller.signup);
    this.router.post(ROUTE_PATHS.AUTH.LOGIN, validateBody(LoginSchema), this.controller.login);
    this.router.get(ROUTE_PATHS.AUTH.ME, authMiddleware, this.controller.me);
    this.router.post(ROUTE_PATHS.AUTH.LOGOUT, this.controller.logout);
  }
}
