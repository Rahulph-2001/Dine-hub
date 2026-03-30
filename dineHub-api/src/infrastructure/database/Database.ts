import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class Database {
    private static _instance : PrismaClient;

    public get client(): PrismaClient {
        if(!Database._instance){
            Database._instance = new PrismaClient()
        }
        return Database._instance
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