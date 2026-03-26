import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../infrastructure/di/types";
import { ICreateRestaurantUseCase } from "../../../application/useCases/restaurant/interfaces/ICreateRestaurantUseCase";
import { IListRestaurantUseCase } from "../../../application/useCases/restaurant/interfaces/ILIstRestaurantsUseCase"; 
import { IGetRestaurantByIdUseCase } from "../../../application/useCases/restaurant/interfaces/IGetRestaurantByIdUseCase";
import { IUpdateRestaurantUseCase } from "../../../application/useCases/restaurant/interfaces/IUpdateRestaurantUseCase";
import { IDeleteRestaurantUseCase } from "../../../application/useCases/restaurant/interfaces/IDeleteRestaurantUseCase";
import { IRestaurantRepository } from "../../../domain/repositories/IRestaurantRepository";
import { IRestaurantMapper } from "../../../application/mappers/interfaces/IRestaurantMapper";
import { IResponseBuilder } from "../../../shared/http/IResponseBuilder";
import { SUCCESS_MESSAGES } from "../../../config/messages";

@injectable()
export class RestaurantController {
  constructor(
    @inject(TYPES.ICreateRestaurantUseCase) private readonly createRestaurantUseCase: ICreateRestaurantUseCase,
    @inject(TYPES.IListRestaurantsUseCase) private readonly listRestaurantsUseCase: IListRestaurantUseCase,
    @inject(TYPES.IGetRestaurantByIdUseCase) private readonly getRestaurantByIdUseCase: IGetRestaurantByIdUseCase,
    @inject(TYPES.IUpdateRestaurantUseCase) private readonly updateRestaurantUseCase: IUpdateRestaurantUseCase,
    @inject(TYPES.IDeleteRestaurantUseCase) private readonly deleteRestaurantUseCase: IDeleteRestaurantUseCase,
    @inject(TYPES.IRestaurantRepository) private readonly restaurantRepository: IRestaurantRepository,
    @inject(TYPES.IRestaurantMapper) private readonly restaurantMapper: IRestaurantMapper,
    @inject(TYPES.IResponseBuilder) private readonly responseBuilder: IResponseBuilder
  ) {}

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const imageFile = req.file?.buffer;
      const result = await this.createRestaurantUseCase.execute(userId, req.body, imageFile);
      const response = this.responseBuilder.success(result, SUCCESS_MESSAGES.RESTAURANT.CREATED, 201);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  };

    public list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 9;
      const search = req.query.search as string;

      const result = await this.listRestaurantsUseCase.execute(page, limit, search);
      
      const response = this.responseBuilder.success(result, SUCCESS_MESSAGES.RESTAURANT.FETCHED, 200);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  };


  public listMy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const restaurants = await this.restaurantRepository.findByCreatedBy(userId);
      const mapped = restaurants.map((r) => this.restaurantMapper.toResponseDTO(r));
      const response = this.responseBuilder.success(mapped, SUCCESS_MESSAGES.RESTAURANT.FETCHED, 200);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.getRestaurantByIdUseCase.execute(req.params.id);
      const response = this.responseBuilder.success(result, SUCCESS_MESSAGES.RESTAURANT.DETAILS_FETCHED, 200);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId, role } = req.user!;
      const imageFile = req.file?.buffer;
      const result = await this.updateRestaurantUseCase.execute(req.params.id, req.body, userId, role, imageFile);
      const response = this.responseBuilder.success(result, SUCCESS_MESSAGES.RESTAURANT.UPDATED, 200);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId, role } = req.user!;
      await this.deleteRestaurantUseCase.execute(req.params.id, userId, role);
      const response = this.responseBuilder.success(null, SUCCESS_MESSAGES.RESTAURANT.DELETED, 200);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  };
}
