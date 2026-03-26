export const TYPES = {
  Database: Symbol.for("Database"),
  IResponseBuilder: Symbol.for("IResponseBuilder"),
  ICloudinaryService: Symbol.for("ICloudinaryService"),
  IJwtService: Symbol.for("IJwtService"),

  IUserRepository: Symbol.for("IUserRepository"),
  IRestaurantRepository: Symbol.for("IRestaurantRepository"),

  IUserMapper: Symbol.for("IUserMapper"),
  IRestaurantMapper: Symbol.for("IRestaurantMapper"),

  ISignupUseCase: Symbol.for("ISignupUseCase"),
  ILoginUseCase: Symbol.for("ILoginUseCase"),

  ICreateRestaurantUseCase: Symbol.for("ICreateRestaurantUseCase"),
  IListRestaurantsUseCase: Symbol.for("IListRestaurantsUseCase"),
  IGetRestaurantByIdUseCase: Symbol.for("IGetRestaurantByIdUseCase"),
  IUpdateRestaurantUseCase: Symbol.for("IUpdateRestaurantUseCase"),
  IDeleteRestaurantUseCase: Symbol.for("IDeleteRestaurantUseCase"),

  AuthController: Symbol.for("AuthController"),
  RestaurantController: Symbol.for("RestaurantController"),

  AuthRoutes: Symbol.for("AuthRoutes"),
  RestaurantRoutes: Symbol.for("RestaurantRoutes"),
};
