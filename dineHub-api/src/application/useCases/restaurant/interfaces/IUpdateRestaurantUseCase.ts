import { RestaurantResponseDTO } from "../../../dto/restaurant/RestaurantResponseDTO";
import { UpdateRestaurantDTO } from "../../../dto/restaurant/UpdateRestaurantDTO";

export interface IUpdateRestaurantUseCase {
    execute(id: string, dto: UpdateRestaurantDTO, userId: string, role: string, imageFile?: Buffer): Promise<RestaurantResponseDTO>;
}