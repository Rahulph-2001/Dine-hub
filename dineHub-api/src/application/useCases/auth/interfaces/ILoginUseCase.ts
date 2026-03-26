import { AuthResponseDTO } from "../../../dto/auth/AuthResponseDTO";
import { LoginDTO } from "../../../dto/auth/LoginDTO";

export interface ILoginUseCase {
    execute(dto: LoginDTO): Promise<AuthResponseDTO>;
}