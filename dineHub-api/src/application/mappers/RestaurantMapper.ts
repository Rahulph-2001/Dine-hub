import { injectable } from "inversify";
import { Restaurant } from "../../domain/entities/Restaurant";
import { RestaurantResponseDTO } from "../dto/restaurant/RestaurantResponseDTO";
import { IRestaurantMapper } from "./interfaces/IRestaurantMapper";

@injectable()
export class RestaurantMapper implements IRestaurantMapper {
    public toResponseDTO(restaurant: Restaurant): RestaurantResponseDTO {
        return {
            id: restaurant.id,
            name: restaurant.name,
            address: restaurant.address,
            phone: restaurant.phone,
            email: restaurant.email,
            description: restaurant.description,
            imageUrl : restaurant.imageUrl,
            createBy : restaurant.createdBy,
            createdAt : restaurant.createdAt,
            updatedAt : restaurant.updatedAt
        };
    }
}