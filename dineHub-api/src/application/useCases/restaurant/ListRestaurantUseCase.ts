import { injectable, inject } from "inversify";
import { TYPES } from "../../../infrastructure/di/types";
import { IRestaurantRepository } from "../../../domain/repositories/IRestaurantRepository";
import { IListRestaurantUseCase, PaginatedRestaurantResponse } from "./interfaces/ILIstRestaurantsUseCase";
import { IRestaurantMapper } from "../../mappers/interfaces/IRestaurantMapper";

@injectable()
export class ListRestaurantUseCase implements IListRestaurantUseCase {
  constructor(
    @inject(TYPES.IRestaurantRepository) private readonly _restaurantRepository: IRestaurantRepository,
    @inject(TYPES.IRestaurantMapper) private readonly _restaurantMapper: IRestaurantMapper
  ) {}

  async execute(page: number = 1, limit: number = 10, search?: string): Promise<PaginatedRestaurantResponse> {
    const { data: restaurants, total } = await this._restaurantRepository.findAll(page, limit, search);
    return {
      data: restaurants.map((r) => this._restaurantMapper.toResponseDTO(r)),
      total,
    };
  }
}
