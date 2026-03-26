import { RestaurantResponseDTO } from "../../../dto/restaurant/RestaurantResponseDTO";

export interface IGetRestaurantByIdUseCase {
    execute(id: string): Promise<RestaurantResponseDTO>;
}