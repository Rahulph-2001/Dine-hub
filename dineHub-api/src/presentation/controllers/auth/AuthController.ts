import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../infrastructure/di/types";
import { ISignupUseCase } from "../../../application/useCases/auth/interfaces/ISignupUseCase";
import { ILoginUseCase } from "../../../application/useCases/auth/interfaces/ILoginUseCase";
import { IGetCurrentUserUseCase } from "../../../application/useCases/auth/interfaces/IGetCurrentUserUseCase";
import { IResponseBuilder } from "../../../shared/http/IResponseBuilder";
import { SUCCESS_MESSAGES } from "../../../config/messages";
import { env } from "../../../config/env";
import { HttpStatus } from "../../../shared/http/HttpStatus";

const isProd = process.env.NODE_ENV === "production";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProd, 
  sameSite: (isProd ? "none" : "lax") as "none" | "lax", 
  maxAge: env.MAX_AGE,
  path: "/",
};

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.ISignupUseCase) private readonly _signupUseCase: ISignupUseCase,
    @inject(TYPES.ILoginUseCase) private readonly _loginUseCase: ILoginUseCase,
    @inject(TYPES.IGetCurrentUserUseCase) private readonly _getCurrentUserUseCase: IGetCurrentUserUseCase,
    @inject(TYPES.IResponseBuilder) private readonly _responseBuilder: IResponseBuilder
  ) {}

  public signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const signupResponse = await this._signupUseCase.execute(req.body);
      res.cookie("token", signupResponse.token, COOKIE_OPTIONS);
      const response = this._responseBuilder.success(
        { user: signupResponse.user },
        SUCCESS_MESSAGES.AUTH.SIGNUP_SUCCESS,
        HttpStatus.CREATED
      );
      res.status(response.statusCode).json(response.body);
    } catch (error: unknown) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const loginResponse = await this._loginUseCase.execute(req.body);
      res.cookie("token", loginResponse.token, COOKIE_OPTIONS);
      const response = this._responseBuilder.success(
        { user: loginResponse.user },
        SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS,
        HttpStatus.OK
      );
      res.status(response.statusCode).json(response.body);
    } catch (error: unknown) {
      next(error);
    }
  };

  public me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const currentUser = await this._getCurrentUserUseCase.execute(userId);
      if (!currentUser) {
        res.clearCookie("token", { path: "/" });
        res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: "User not found" });
        return;
      }
      const response = this._responseBuilder.success({ user: currentUser }, "User fetched", HttpStatus.OK);
      res.status(response.statusCode).json(response.body);
    } catch (error: unknown) {
      next(error);
    }
  };

  public logout = async (_req: Request, res: Response): Promise<void> => {
    res.clearCookie("token", { path: "/" });
    res.status(HttpStatus.OK).json({ success: true, message: "Logged out successfully" });
  };
}
