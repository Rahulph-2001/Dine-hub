import { inject, injectable } from "inversify";
import bcrypt from "bcrypt"
import { TYPES } from "../../../infrastructure/di/types"
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IJwtService } from "../../../domain/services/IJwtService";
import { IUserMapper } from "../../mappers/interfaces/IUserMapper";
import { ILoginUseCase } from "./interfaces/ILoginUseCase";
import { LoginDTO } from "../../dto/auth/LoginDTO";
import { AuthResponseDTO } from "../../dto/auth/AuthResponseDTO";
import { UnauthorizedError } from "../../../domain/errors/AppError";
import { ERROR_MESSAGES } from "../../../config/messages";

@injectable()
export class LoginUseCase implements ILoginUseCase {
    constructor(
        @inject(TYPES.IUserRepository) private readonly _userRepository: IUserRepository,
        @inject(TYPES.IJwtService) private readonly _jwtService: IJwtService,
        @inject(TYPES.IUserMapper) private readonly _userMapper: IUserMapper
    ) {}

    async execute(dto: LoginDTO): Promise<AuthResponseDTO> {
        const user = await this._userRepository.findByEmail(dto.email)
        if(!user){
            throw new UnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS)
        }
        const isPasswordValid = await bcrypt.compare(dto.password,user.password)
        if(!isPasswordValid){
            throw new UnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS)
        }
        const token = this._jwtService.generateToken({userId:user.id, role:user.role})
        return { user: this._userMapper.toResponseDTO(user),token}
    }
}