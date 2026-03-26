export interface JwtPayload {
    userId: string;
    role: string
}

export interface IJwtService {
    generateToken(payload: JwtPayload): string;
    verifyToken(token: string): JwtPayload;
}