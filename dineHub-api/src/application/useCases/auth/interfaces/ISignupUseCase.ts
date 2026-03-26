import { AuthResponseDTO } from "../../../dto/auth/AuthResponseDTO";
import { SignupDTO } from "../../../dto/auth/SignupDTO";

export interface ISignupUseCase {
 execute(dto: SignupDTO): Promise<AuthResponseDTO>;
}