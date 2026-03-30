import { injectable, inject } from "inversify";
import { TYPES } from "../../../infrastructure/di/types";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IUserMapper } from "../../mappers/interfaces/IUserMapper";
import { IGetCurrentUserUseCase } from "./interfaces/IGetCurrentUserUseCase";

@injectable()
export class GetCurrentUserUseCase implements IGetCurrentUserUseCase {
  constructor(
    @inject(TYPES.IUserRepository) private readonly _userRepository: IUserRepository,
    @inject(TYPES.IUserMapper) private readonly _userMapper: IUserMapper
  ) {}

  public async execute(userId: string): Promise<any> {
    const user = await this._userRepository.findById(userId);
    if (!user) {
      return null;
    }
    return this._userMapper.toResponseDTO(user);
  }
}
