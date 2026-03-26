import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import { IJwtService, JwtPayload } from "../../domain/services/IJwtService";
import { env } from "../../config/env";

@injectable()
export class JwtService implements IJwtService {
  public generateToken(payload: JwtPayload): string {
    return jwt.sign(
      { ...payload },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions
    );
  }

  public verifyToken(token: string): JwtPayload {
    const decoded = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
    return {
      userId: decoded.userId as string,
      role: decoded.role as string,
    };
  }
}
