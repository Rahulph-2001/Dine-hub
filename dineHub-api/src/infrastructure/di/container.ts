import { Container } from "inversify";
import { TYPES } from "./types";
import { IResponseBuilder } from "../../shared/http/IResponseBuilder";
import { ResponseBuilder } from "../../shared/http/ResponseBuilder";
import { Database } from "../database/Database";
import { registerAuthBindings } from "./modules/auth.bindings";
import { registerRestaurantBindings } from "./modules/restaurant.binding";

const container = new Container();

container.bind<Database>(TYPES.Database).to(Database).inSingletonScope();
container.bind<IResponseBuilder>(TYPES.IResponseBuilder).to(ResponseBuilder).inSingletonScope();

registerAuthBindings(container);
registerRestaurantBindings(container);

export { container };
