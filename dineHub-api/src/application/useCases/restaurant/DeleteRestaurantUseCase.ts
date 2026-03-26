import { injectable, inject } from "inversify";
import { TYPES } from "../../../infrastructure/di/types"
import { IRestaurantRepository } from "../../../domain/repositories/IRestaurantRepository";
import { IDeleteRestaurantUseCase } from "./interfaces/IDeleteRestaurantUseCase";
import { NotFoundError, ForbiddenError } from "../../../domain/errors/AppError";
import { ERROR_MESSAGES } from "../../../config/messages";

@injectable()
export class DeleteRestaurantUseCase implements IDeleteRestaurantUseCase {
    constructor(
        @inject(TYPES.IRestaurantRepository) private readonly _restaurantRepository: IRestaurantRepository
    ) {}

    async execute(id: string, userId: string, role: string): Promise<void> {
        const restaurant = await this._restaurantRepository.findById(id)
        if(!restaurant){
            throw new NotFoundError(ERROR_MESSAGES.RESTAURANT.NOT_FOUND);
        }

        if (role !== "admin" && restaurant.createdBy !== userId) {
            throw new ForbiddenError(ERROR_MESSAGES.AUTH.FORBIDDEN);
        }

        await this._restaurantRepository.delete(id)
    }
}