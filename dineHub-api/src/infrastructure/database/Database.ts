import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class Database {
    private static instance : PrismaClient;

    public get client(): PrismaClient {
        if(!Database.instance){
            Database.instance = new PrismaClient()
        }
        return Database.instance
    }
    public async connect(): Promise<void> {
        await this.client.$connect();
        console.log("Database connected successfully");
    }
    public async disconnect(): Promise<void>{
        await this.client.$disconnect();
        console.log("Database disconnected")
    }
}