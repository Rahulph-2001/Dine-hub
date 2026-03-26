import { RestaurantResponseDTO } from "../../../dto/restaurant/RestaurantResponseDTO";

export interface PaginatedRestaurantResponse {
    data: RestaurantResponseDTO[];
    total: number;
}



export interface IListRestaurantUseCase {
   execute(page: number, limit: number, search?: string): Promise<PaginatedRestaurantResponse>
}