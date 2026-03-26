import { User } from "../../../domain/entities/User";
import { UserResponseDTO } from "../../dto/auth/AuthResponseDTO";

export interface IUserMapper {
    toResponseDTO(user: User):UserResponseDTO;
}