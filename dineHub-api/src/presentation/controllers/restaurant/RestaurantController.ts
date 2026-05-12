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
import { HttpStatus } from "../../../shared/http/HttpStatus";

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
      const imageFileBuffer = req.file?.buffer;
      const createdRestaurant = await this._createRestaurantUseCase.execute(userId, req.body, imageFileBuffer);
      const response = this._responseBuilder.success(createdRestaurant, SUCCESS_MESSAGES.RESTAURANT.CREATED, HttpStatus.CREATED);
      res.status(response.statusCode).json(response.body);
    } catch (error: unknown) {
      next(error);
    }
  };

  public list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 9;
      const searchQuery = req.query.search as string;

      const restaurantList = await this._listRestaurantsUseCase.execute(page, limit, searchQuery);
      const response = this._responseBuilder.success(restaurantList, SUCCESS_MESSAGES.RESTAURANT.FETCHED, HttpStatus.OK);
      res.status(response.statusCode).json(response.body);
    } catch (error: unknown) {
      next(error);
    }
  };


  public listMy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 6;
      const searchQuery = req.query.search as string;

      const myRestaurantList = await this._listMyRestaurantsUseCase.execute(userId, page, limit, searchQuery);
      const response = this._responseBuilder.success(myRestaurantList, SUCCESS_MESSAGES.RESTAURANT.FETCHED, HttpStatus.OK);
      res.status(response.statusCode).json(response.body);
    } catch (error: unknown) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const restaurantDetails = await this._getRestaurantByIdUseCase.execute(req.params.id);
      const response = this._responseBuilder.success(restaurantDetails, SUCCESS_MESSAGES.RESTAURANT.DETAILS_FETCHED, HttpStatus.OK);
      res.status(response.statusCode).json(response.body);
    } catch (error: unknown) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId, role } = req.user!;
      const imageFileBuffer = req.file?.buffer;
      const updatedRestaurant = await this._updateRestaurantUseCase.execute(req.params.id, req.body, userId, role, imageFileBuffer);
      const response = this._responseBuilder.success(updatedRestaurant, SUCCESS_MESSAGES.RESTAURANT.UPDATED, HttpStatus.OK);
      res.status(response.statusCode).json(response.body);
    } catch (error: unknown) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId, role } = req.user!;
      await this._deleteRestaurantUseCase.execute(req.params.id, userId, role);
      const response = this._responseBuilder.success(null, SUCCESS_MESSAGES.RESTAURANT.DELETED, HttpStatus.OK);
      res.status(response.statusCode).json(response.body);
    } catch (error: unknown) {
      next(error);
    }
  };
}
