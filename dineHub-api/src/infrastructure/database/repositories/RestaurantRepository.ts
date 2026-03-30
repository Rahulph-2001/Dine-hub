import { injectable, inject } from "inversify";
import { Restaurant as PrismaRestaurant} from "@prisma/client"
import { TYPES } from "../../di/types"
import { Database } from "../Database";
import { BaseRepository } from "../BaseRepository";
import { IRestaurantRepository } from "../../../domain/repositories/IRestaurantRepository";
import { Restaurant } from "../../../domain/entities/Restaurant";

@injectable()
export class RestaurantRepository extends BaseRepository<Restaurant> implements IRestaurantRepository {
    constructor(@inject(TYPES.Database) db: Database){
        super(db)
    }
     async create(restaurant: Restaurant): Promise<Restaurant> {
        const data = await this.prisma.restaurant.create({
            data: {
                id: restaurant.id,
                name: restaurant.name,
                address: restaurant.address,
                phone: restaurant.phone,
                email: restaurant.email,
                description: restaurant.description,
                imageUrl: restaurant.imageUrl,
                createdBy: restaurant.createdBy,
                isDeleted: restaurant.isDeleted
            }
        });
        return this.toDomain(data)
    }

     async findAll(page: number, limit: number, search?: string): Promise<{ data: Restaurant[]; total: number }> {
    const skip = (page - 1) * limit;
    const whereClause: any = { isDeleted: false };
    
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } },
      ];
    }
    const [data, total] = await Promise.all([
      this.prisma.restaurant.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      this.prisma.restaurant.count({
        where: whereClause,
      }),
    ]);
    return {
      data: data.map((item) => this.toDomain(item)),
      total,
    };
  }
    
    async findByCreatedBy(userId: string, page: number, limit: number, search?: string): Promise<{ data: Restaurant[]; total: number }> {
        const skip = (page - 1) * limit;
        const whereClause: any = { createdBy: userId, isDeleted: false };

        if (search) {
            whereClause.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { address: { contains: search, mode: "insensitive" } },
            ];
        }

        const [data, total] = await Promise.all([
            this.prisma.restaurant.findMany({
                where: whereClause,
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            this.prisma.restaurant.count({
                where: whereClause,
            }),
        ]);

        return {
            data: data.map((item) => this.toDomain(item)),
            total,
        };
    }
    async findById(id: string): Promise<Restaurant | null> {
        const data = await this.prisma.restaurant.findFirst({
            where: {
                id,
                isDeleted: false
            }
        });
        return data ? this.toDomain(data): null
    }
    async update(restaurant: Restaurant): Promise<Restaurant> {
      const data = await this.prisma.restaurant.update({
           where : { id: restaurant.id},
           data: {
            name: restaurant.name,
            address: restaurant.address,
            phone: restaurant.phone,
            email: restaurant.email,
            description: restaurant.description,
            imageUrl: restaurant.imageUrl,
            isDeleted: restaurant.isDeleted,
            updatedAt: new Date()
           },
      })
      return this.toDomain(data)
    }

    async delete(id: string): Promise<void> {
       await this.prisma.restaurant.update({
        where: {id},
        data: { isDeleted: true}
       })
    }
    

    protected toDomain(data: PrismaRestaurant): Restaurant {
        return new Restaurant({
            id: data.id,
            name: data.name,
            address: data.address,
            phone: data.phone,
            email: data.email ?? undefined,
            description: data.description ?? undefined,
            imageUrl: data.imageUrl ?? undefined,
            createdBy : data.createdBy,
            isDeleted: data.isDeleted,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        });
    }
}