import { Container } from "inversify";
import { TYPES } from "../types";
import { IRestaurantRepository } from "../../../domain/repositories/IRestaurantRepository";
import { RestaurantRepository } from "../../database/repositories/RestaurantRepository";
import { ICloudinaryService } from "../../../domain/services/ICloudinaryService";
import { CloudinaryService } from "../../services/CloudinaryService";
import { IRestaurantMapper } from "../../../application/mappers/interfaces/IRestaurantMapper";
import { RestaurantMapper } from "../../../application/mappers/RestaurantMapper";
import { ICreateRestaurantUseCase } from "../../../application/useCases/restaurant/interfaces/ICreateRestaurantUseCase";
import { CreateRestaurantUseCase } from "../../../application/useCases/restaurant/CreateRestaurantUseCase";
import { IListRestaurantUseCase } from "../../../application/useCases/restaurant/interfaces/ILIstRestaurantsUseCase";
import { ListRestaurantUseCase } from "../../../application/useCases/restaurant/ListRestaurantUseCase";
import { IListMyRestaurantsUseCase } from "../../../application/useCases/restaurant/interfaces/IListMyRestaurantsUseCase";
import { ListMyRestaurantsUseCase } from "../../../application/useCases/restaurant/ListMyRestaurantsUseCase";
import { IGetRestaurantByIdUseCase } from "../../../application/useCases/restaurant/interfaces/IGetRestaurantByIdUseCase";
import { GetRestaurantByIdUseCase } from "../../../application/useCases/restaurant/GetRestaurantByIdUseCase";
import { IUpdateRestaurantUseCase } from "../../../application/useCases/restaurant/interfaces/IUpdateRestaurantUseCase";
import { UpdateRestaurantUseCase } from "../../../application/useCases/restaurant/UpdateRestaurantUseCase";
import { IDeleteRestaurantUseCase } from "../../../application/useCases/restaurant/interfaces/IDeleteRestaurantUseCase";
import { DeleteRestaurantUseCase } from "../../../application/useCases/restaurant/DeleteRestaurantUseCase";
import { RestaurantController } from "../../../presentation/controllers/restaurant/RestaurantController"; 
import { RestaurantRoutes } from "../../../presentation/routes/restaurant/RestaurantRoutes";

export function registerRestaurantBindings(container: Container): void {
  container.bind<IRestaurantRepository>(TYPES.IRestaurantRepository).to(RestaurantRepository).inSingletonScope();
  container.bind<ICloudinaryService>(TYPES.ICloudinaryService).to(CloudinaryService).inSingletonScope();
  container.bind<IRestaurantMapper>(TYPES.IRestaurantMapper).to(RestaurantMapper).inSingletonScope();
  container.bind<ICreateRestaurantUseCase>(TYPES.ICreateRestaurantUseCase).to(CreateRestaurantUseCase).inSingletonScope();
  container.bind<IListRestaurantUseCase>(TYPES.IListRestaurantsUseCase).to(ListRestaurantUseCase).inSingletonScope();
  container.bind<IListMyRestaurantsUseCase>(TYPES.IListMyRestaurantsUseCase).to(ListMyRestaurantsUseCase).inSingletonScope();
  container.bind<IGetRestaurantByIdUseCase>(TYPES.IGetRestaurantByIdUseCase).to(GetRestaurantByIdUseCase).inSingletonScope();
  container.bind<IUpdateRestaurantUseCase>(TYPES.IUpdateRestaurantUseCase).to(UpdateRestaurantUseCase).inSingletonScope();
  container.bind<IDeleteRestaurantUseCase>(TYPES.IDeleteRestaurantUseCase).to(DeleteRestaurantUseCase).inSingletonScope();
  container.bind<RestaurantController>(TYPES.RestaurantController).to(RestaurantController).inSingletonScope();
  container.bind<RestaurantRoutes>(TYPES.RestaurantRoutes).to(RestaurantRoutes).inSingletonScope();
}
