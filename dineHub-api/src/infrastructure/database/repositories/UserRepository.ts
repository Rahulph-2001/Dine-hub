import { injectable, inject } from "inversify";
import { User as PrismaUser } from '@prisma/client'
import { TYPES } from "../../di/types";
import { Database } from "../Database";
import { BaseRepository } from "../BaseRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";
import { UserRole } from "../../../domain/enums/UserRole";

@injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
    constructor(@inject(TYPES.Database) db: Database){
        super(db);
    }

    async create(user: User): Promise<User> {
        const data = await this.prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role,
                isDeleted: user.isDeleted
            }
        })
        return this.toDomain(data)
    }
    async findByEmail(email: string): Promise<User | null> {
        const data = await this.prisma.user.findFirst({
            where: {
                email,
                isDeleted: false

            },
        })
        return data ? this.toDomain(data) : null
    }
    async findById(id: string): Promise<User | null > {
       const data = await this.prisma.user.findFirst({
        where: {
            id,
            isDeleted: false
        }
       })
       return data ? this.toDomain(data) : null
    }
protected toDomain(data: PrismaUser): User {
    return new User({
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role as UserRole,
        isDeleted: data.isDeleted,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    })
}
}