import { injectable, inject } from "inversify";
import bcrypt from 'bcrypt'
import { TYPES } from "../../../infrastructure/di/types";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IJwtService } from "../../../domain/services/IJwtService";
import { IUserMapper } from "../../mappers/interfaces/IUserMapper";
import { ISignupUseCase } from "./interfaces/ISignupUseCase";
import { SignupDTO } from "../../dto/auth/SignupDTO";
import { AuthResponseDTO } from "../../dto/auth/AuthResponseDTO";
import { User } from "../../../domain/entities/User";
import { UserRole } from "../../../domain/enums/UserRole";
import { ConflictError } from "../../../domain/errors/AppError";
import { ERROR_MESSAGES } from "../../../config/messages";

@injectable()
export class SignupUseCase implements ISignupUseCase {
    constructor(
        @inject(TYPES.IUserRepository) private readonly _userRepository: IUserRepository,
        @inject(TYPES.IJwtService) private readonly _jwtService: IJwtService,
        @inject(TYPES.IUserMapper) private readonly _userMapper: IUserMapper
    ) {}

    async execute(dto: SignupDTO): Promise<AuthResponseDTO>{
        const existingUser = await this._userRepository.findByEmail(dto.email);
        if(existingUser){
            throw new ConflictError(ERROR_MESSAGES.AUTH.EMAIL_ALREADY_EXISTS);
        }
        const hashedPassword = await bcrypt.hash(dto.password,12)
        const user = new User({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
            role: UserRole.USER,
        });

        const createdUser = await this._userRepository.create(user)

        const token = this._jwtService.generateToken({
            userId: createdUser.id,
            role: createdUser.role,
        });
        return { user: this._userMapper.toResponseDTO(createdUser),token}
    }
}