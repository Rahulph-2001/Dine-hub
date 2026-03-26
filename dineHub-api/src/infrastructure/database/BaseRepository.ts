import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import { Database } from "./Database";

@injectable()
export abstract class BaseRepository<TDomain> {
    protected readonly prisma: PrismaClient;

    constructor(db: Database) {
        this.prisma = db.client;
    }

    protected abstract toDomain(raw: Record<string, unknown>):TDomain;
}