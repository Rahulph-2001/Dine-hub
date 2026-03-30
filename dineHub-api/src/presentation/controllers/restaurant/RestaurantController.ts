import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../infrastructure/di/types";
import { ICreateRestaurantUseCase } from "../../../application/useCases/restaurant/interfaces/ICreateRestaurantUseCase";
import { IListRestaurantUseCase } from "../../../application/useCases/restaurant/interfaces/ILIstRestaurantsUseCase"; 
import { IListMyRestaurantsUseCase } from "../../../application/useCases/restaurant/interfaces/IListMyRestaurantsUseCase";
import { IGetRestaurantByIdUseCase } from "../../../application/useCases/restaurant/interfaces/IGetRestaurantByIdUseCase";
import { IUpdateRestaurantUseCase } from "../../../application/useCases/restaurant/interfaces/IUpdateRestaurantUseCase";
import { IDeleteRestaurantUseCase } from "../../../application/useCases/restaurant/interfaces/IDeleteRestaurantUseCase";
import { IResponseBuilder } from "../../../shared/http/IResponseBuilder";
import { SUCCESS_MESSAGES } from "../../../config/messages";

@injectable()
export class RestaurantController {
  constructor(
    @inject(TYPES.ICreateRestaurantUseCase) private readonly _createRestaurantUseCase: ICreateRestaurantUseCase,
    @inject(TYPES.IListRestaurantsUseCase) private readonly _listRestaurantsUseCase: IListRestaurantUseCase,
    @inject(TYPES.IListMyRestaurantsUseCase) private readonly _listMyRestaurantsUseCase: IListMyRestaurantsUseCase,
    @inject(TYPES.IGetRestaurantByIdUseCase) private readonly _getRestaurantByIdUseCase: IGetRestaurantByIdUseCase,
    @inject(TYPES.IUpdateRestaurantUseCase) private readonly _updateRestaurantUseCase: IUpdateRestaurantUseCase,
    @inject(TYPES.IDeleteRestaurantUseCase) private readonly _deleteRestaurantUseCase: IDeleteRestaurantUseCase,
    @inject(TYPES.IResponseBuilder) private readonly _responseBuilder: IResponseBuilder
  ) {}

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const imageFile = req.file?.buffer;
      const result = await this._createRestaurantUseCase.execute(userId, req.body, imageFile);
      const response = this._responseBuilder.success(result, SUCCESS_MESSAGES.RESTAURANT.CREATED, 201);
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

      const result = await this._listRestaurantsUseCase.execute(page, limit, search);
      
      const response = this._responseBuilder.success(result, SUCCESS_MESSAGES.RESTAURANT.FETCHED, 200);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  };


  public listMy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 6;
      const search = req.query.search as string;

      const result = await this._listMyRestaurantsUseCase.execute(userId, page, limit, search);
      const response = this._responseBuilder.success(result, SUCCESS_MESSAGES.RESTAURANT.FETCHED, 200);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this._getRestaurantByIdUseCase.execute(req.params.id);
      const response = this._responseBuilder.success(result, SUCCESS_MESSAGES.RESTAURANT.DETAILS_FETCHED, 200);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId, role } = req.user!;
      const imageFile = req.file?.buffer;
      const result = await this._updateRestaurantUseCase.execute(req.params.id, req.body, userId, role, imageFile);
      const response = this._responseBuilder.success(result, SUCCESS_MESSAGES.RESTAURANT.UPDATED, 200);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId, role } = req.user!;
      await this._deleteRestaurantUseCase.execute(req.params.id, userId, role);
      const response = this._responseBuilder.success(null, SUCCESS_MESSAGES.RESTAURANT.DELETED, 200);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  };
}
