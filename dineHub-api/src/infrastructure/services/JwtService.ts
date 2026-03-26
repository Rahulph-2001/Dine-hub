import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import { IJwtService, JwtPayload } from "../../domain/services/IJwtService";
import { env } from "../../config/env";

@injectable()
export class JwtService implements IJwtService {
  public generateToken(payload: JwtPayload): string {
    const expiresIn = env.JWT_EXPIRES_IN || "7d";
    return jwt.sign(
      { ...payload },
      env.JWT_SECRET,
      { expiresIn: expiresIn as jwt.SignOptions["expiresIn"] }
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
