import { Router } from "express";
import { injectable, inject } from "inversify";
import multer from "multer";
import { TYPES } from "../../../infrastructure/di/types";
import { RestaurantController } from "../../controllers/restaurant/RestaurantController";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { adminMiddleware } from "../../middlewares/adminMiddleware";
import { validateBody } from "../../middlewares/validationMiddleware";
import { CreateRestaurantSchema } from "../../../application/dto/restaurant/CreateRestaurantDTO";
import { UpdateRestaurantSchema } from "../../../application/dto/restaurant/UpdateRestaurantDTO";
import { ROUTE_PATHS } from "../../../config/routeConstants";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

@injectable()
export class RestaurantRoutes {
  public readonly router: Router = Router();

  constructor(@inject(TYPES.RestaurantController) private readonly controller: RestaurantController) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", this.controller.list);
    this.router.get(ROUTE_PATHS.RESTAURANT.MY, authMiddleware, this.controller.listMy);
    this.router.get(ROUTE_PATHS.RESTAURANT.BY_ID, this.controller.getById);
    this.router.post("/", authMiddleware, upload.single("image"), validateBody(CreateRestaurantSchema), this.controller.create);
    this.router.put(ROUTE_PATHS.RESTAURANT.BY_ID, authMiddleware, upload.single("image"), validateBody(UpdateRestaurantSchema), this.controller.update);
    this.router.delete(ROUTE_PATHS.RESTAURANT.BY_ID, authMiddleware, this.controller.delete);
  }
}
