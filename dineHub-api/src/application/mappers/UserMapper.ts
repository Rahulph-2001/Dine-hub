import { injectable } from "inversify";
import { User } from "../../domain/entities/User";
import { UserResponseDTO } from "../dto/auth/AuthResponseDTO";
import { IUserMapper } from "./interfaces/IUserMapper";

@injectable()
export class UserMapper implements IUserMapper {
  public toResponseDTO(user: User): UserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
