import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../infrastructure/di/types";
import { ISignupUseCase } from "../../../application/useCases/auth/interfaces/ISignupUseCase";
import { ILoginUseCase } from "../../../application/useCases/auth/interfaces/ILoginUseCase";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IUserMapper } from "../../../application/mappers/interfaces/IUserMapper";
import { IResponseBuilder } from "../../../shared/http/IResponseBuilder";
import { SUCCESS_MESSAGES } from "../../../config/messages";
import { env } from "../../../config/env";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true, // Always true for HTTPS production
  sameSite: "none" as const, // Required for cross-domain cookies
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.ISignupUseCase) private readonly signupUseCase: ISignupUseCase,
    @inject(TYPES.ILoginUseCase) private readonly loginUseCase: ILoginUseCase,
    @inject(TYPES.IUserRepository) private readonly userRepository: IUserRepository,
    @inject(TYPES.IUserMapper) private readonly userMapper: IUserMapper,
    @inject(TYPES.IResponseBuilder) private readonly responseBuilder: IResponseBuilder
  ) {}

  public signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.signupUseCase.execute(req.body);
      res.cookie("token", result.token, COOKIE_OPTIONS);
      const response = this.responseBuilder.success(
        { user: result.user },
        SUCCESS_MESSAGES.AUTH.SIGNUP_SUCCESS,
        201
      );
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.loginUseCase.execute(req.body);
      res.cookie("token", result.token, COOKIE_OPTIONS);
      const response = this.responseBuilder.success(
        { user: result.user },
        SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS,
        200
      );
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  };

  public me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const user = await this.userRepository.findById(userId);
      if (!user) {
        res.clearCookie("token", { path: "/" });
        res.status(401).json({ success: false, message: "User not found" });
        return;
      }
      const userDTO = this.userMapper.toResponseDTO(user);
      const response = this.responseBuilder.success({ user: userDTO }, "User fetched", 200);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  };

  public logout = async (_req: Request, res: Response): Promise<void> => {
    res.clearCookie("token", { path: "/" });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  };
}
