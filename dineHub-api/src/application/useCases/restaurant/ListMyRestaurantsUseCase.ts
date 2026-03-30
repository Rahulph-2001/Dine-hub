import { injectable, inject } from "inversify";
import { TYPES } from "../../../infrastructure/di/types";
import { IRestaurantRepository } from "../../../domain/repositories/IRestaurantRepository";
import { IRestaurantMapper } from "../../mappers/interfaces/IRestaurantMapper";
import { IListMyRestaurantsUseCase } from "./interfaces/IListMyRestaurantsUseCase";

@injectable()
export class ListMyRestaurantsUseCase implements IListMyRestaurantsUseCase {
  constructor(
    @inject(TYPES.IRestaurantRepository) private readonly _restaurantRepository: IRestaurantRepository,
    @inject(TYPES.IRestaurantMapper) private readonly _restaurantMapper: IRestaurantMapper
  ) {}

  public async execute(userId: string, page: number, limit: number, search?: string): Promise<{ data: any[]; total: number }> {
    const result = await this._restaurantRepository.findByCreatedBy(userId, page, limit, search);
    return {
      data: result.data.map((r) => this._restaurantMapper.toResponseDTO(r)),
      total: result.total,
    };
  }
}
