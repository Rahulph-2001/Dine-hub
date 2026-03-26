import { injectable, inject } from "inversify";
import { TYPES } from "../../../infrastructure/di/types"
import { IRestaurantRepository } from "../../../domain/repositories/IRestaurantRepository";
import { IRestaurantMapper } from "../../mappers/interfaces/IRestaurantMapper";
import { IGetRestaurantByIdUseCase } from "./interfaces/IGetRestaurantByIdUseCase";
import { RestaurantResponseDTO } from "../../dto/restaurant/RestaurantResponseDTO";
import { NotFoundError } from "../../../domain/errors/AppError";
import { ERROR_MESSAGES } from "../../../config/messages";

@injectable()
export class GetRestaurantByIdUseCase implements IGetRestaurantByIdUseCase {
    constructor(
        @inject(TYPES.IRestaurantRepository) private readonly _restaurantRepository: IRestaurantRepository,
        @inject(TYPES.IRestaurantMapper) private readonly _restaurantMapper: IRestaurantMapper
    ) {}

    async execute(id: string): Promise<RestaurantResponseDTO> {
        const restaurant = await this._restaurantRepository.findById(id)
        if(!restaurant){
            throw new NotFoundError(ERROR_MESSAGES.RESTAURANT.NOT_FOUND)
        }
        return this._restaurantMapper.toResponseDTO(restaurant)
    }
}