import { Restaurant } from "../../../domain/entities/Restaurant";
import { RestaurantResponseDTO } from "../../dto/restaurant/RestaurantResponseDTO";

export interface IRestaurantMapper {
    toResponseDTO(restaurant: Restaurant):RestaurantResponseDTO;
}