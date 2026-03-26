
export interface UserResponseDTO {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface AuthResponseDTO {
    user: UserResponseDTO;
    token : string
}