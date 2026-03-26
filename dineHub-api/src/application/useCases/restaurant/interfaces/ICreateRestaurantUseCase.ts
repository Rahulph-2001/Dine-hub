import { RestaurantResponseDTO } from "../../../dto/restaurant/RestaurantResponseDTO";
import { CreateRestaurantDTO } from "../../../dto/restaurant/CreateRestaurantDTO";

export interface ICreateRestaurantUseCase {
    execute(userId: string, dto: CreateRestaurantDTO, imageFile?: Buffer): Promise<RestaurantResponseDTO>;
}