import { injectable, inject } from "inversify";
import { TYPES } from "../../../infrastructure/di/types"
import { IRestaurantRepository } from "../../../domain/repositories/IRestaurantRepository";
import { ICloudinaryService } from "../../../domain/services/ICloudinaryService";
import { ICreateRestaurantUseCase } from "./interfaces/ICreateRestaurantUseCase";
import { CreateRestaurantDTO } from "../../dto/restaurant/CreateRestaurantDTO";
import { RestaurantResponseDTO } from "../../dto/restaurant/RestaurantResponseDTO";
import { Restaurant } from "../../../domain/entities/Restaurant";
import { IRestaurantMapper } from "../../mappers/interfaces/IRestaurantMapper";

@injectable()
export class CreateRestaurantUseCase implements ICreateRestaurantUseCase {
    constructor(
        @inject(TYPES.IRestaurantRepository) private readonly _restaurantRepository: IRestaurantRepository,
        @inject(TYPES.IRestaurantMapper) private readonly _restaurantMapper:IRestaurantMapper,
        @inject(TYPES.ICloudinaryService) private readonly _cloudinaryService:ICloudinaryService
    ) {}
    async execute(userId: string, dto: CreateRestaurantDTO, imageFile?: Buffer): Promise<RestaurantResponseDTO> {
        let imageUrl: string | undefined ;
        if(imageFile){
            imageUrl = await this._cloudinaryService.uploadImage(imageFile,"dinehub/restaurants");
        }
        const restaurant = new Restaurant({
            name: dto.name,
            address: dto.address,
            phone:dto.phone,
            email:dto.email || undefined,
            description: dto.description || undefined,
            imageUrl,
            createdBy: userId,
        })

        const created = await this._restaurantRepository.create(restaurant)
        return this._restaurantMapper.toResponseDTO(created)
    }
}