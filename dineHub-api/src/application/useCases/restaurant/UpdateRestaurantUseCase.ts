import { injectable, inject } from "inversify";
import { TYPES } from "../../../infrastructure/di/types"
import { IRestaurantRepository } from "../../../domain/repositories/IRestaurantRepository";
import { IRestaurantMapper } from "../../mappers/interfaces/IRestaurantMapper";
import { ICloudinaryService } from "../../../domain/services/ICloudinaryService";
import { UpdateRestaurantDTO } from "../../dto/restaurant/UpdateRestaurantDTO";
import { IUpdateRestaurantUseCase } from "./interfaces/IUpdateRestaurantUseCase";
import { RestaurantResponseDTO } from "../../dto/restaurant/RestaurantResponseDTO";
import { NotFoundError, ForbiddenError } from "../../../domain/errors/AppError";
import { ERROR_MESSAGES } from "../../../config/messages";

@injectable()
export class UpdateRestaurantUseCase implements IUpdateRestaurantUseCase {
    constructor(
        @inject(TYPES.IRestaurantRepository) private readonly _restaurantRepository: IRestaurantRepository,
        @inject(TYPES.IRestaurantMapper) private readonly _restaurantMapper:IRestaurantMapper,
        @inject(TYPES.ICloudinaryService) private readonly _cloudinaryService: ICloudinaryService
    ) {}
    async execute(id: string, dto: UpdateRestaurantDTO, userId: string, role: string, imageFile?: Buffer): Promise<RestaurantResponseDTO> {
        const restaurant = await this._restaurantRepository.findById(id)
        if(!restaurant){
            throw new NotFoundError(ERROR_MESSAGES.RESTAURANT.NOT_FOUND)
        }
        
        if (role !== "admin" && restaurant.createdBy !== userId) {
            throw new ForbiddenError(ERROR_MESSAGES.AUTH.FORBIDDEN);
        }

        if(dto.name !== undefined) restaurant.updateName(dto.name)
        if(dto.address !== undefined) restaurant.updateAddress(dto.address)
        if(dto.phone !== undefined) restaurant.updatePhone(dto.phone)
        if(dto.email !== undefined) restaurant.updateEmail(dto.email || null)
        if(dto.description !== undefined) restaurant.updateDescription(dto.description || null)
        if(imageFile){
            const imageUrl = await this._cloudinaryService.uploadImage(imageFile,"dinehub/restaurants");
            restaurant.updateImageUrl(imageUrl)
        }
        const updated = await this._restaurantRepository.update(restaurant)
        return this._restaurantMapper.toResponseDTO(updated)
    }
}