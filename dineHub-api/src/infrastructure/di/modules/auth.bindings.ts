import { Container } from "inversify";
import { TYPES } from "../types";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UserRepository } from "../../database/repositories/UserRepository";
import { IJwtService } from "../../../domain/services/IJwtService";
import { JwtService } from "../../services/JwtService";
import { IUserMapper } from "../../../application/mappers/interfaces/IUserMapper";
import { UserMapper } from "../../../application/mappers/UserMapper";
import { ISignupUseCase } from "../../../application/useCases/auth/interfaces/ISignupUseCase";
import { SignupUseCase } from "../../../application/useCases/auth/SignupUseCase";
import { ILoginUseCase } from "../../../application/useCases/auth/interfaces/ILoginUseCase";
import { LoginUseCase } from "../../../application/useCases/auth/LoginUseCase";
import { AuthController } from "../../../presentation/controllers/auth/AuthController"; 
import { AuthRoutes } from "../../../presentation/routes/auth/AuthRoutes"; 

export function registerAuthBindings(container: Container): void {
  container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope();
  container.bind<IJwtService>(TYPES.IJwtService).to(JwtService).inSingletonScope();
  container.bind<IUserMapper>(TYPES.IUserMapper).to(UserMapper).inSingletonScope();
  container.bind<ISignupUseCase>(TYPES.ISignupUseCase).to(SignupUseCase).inSingletonScope();
  container.bind<ILoginUseCase>(TYPES.ILoginUseCase).to(LoginUseCase).inSingletonScope();
  container.bind<AuthController>(TYPES.AuthController).to(AuthController).inSingletonScope();
  container.bind<AuthRoutes>(TYPES.AuthRoutes).to(AuthRoutes).inSingletonScope();
}
