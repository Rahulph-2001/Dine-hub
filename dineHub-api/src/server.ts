import "reflect-metadata";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import { ROUTE_PATHS } from "./config/routeConstants";
import { container } from "./infrastructure/di/container";
import { TYPES } from "./infrastructure/di/types";
import { Database } from "./infrastructure/database/Database";
import { AuthRoutes } from "./presentation/routes/auth/AuthRoutes";
import { RestaurantRoutes } from "./presentation/routes/restaurant/RestaurantRoutes";
import { errorHandler } from "./presentation/middlewares/errorHandler";

const app = express();

app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const authRoutes = container.get<AuthRoutes>(TYPES.AuthRoutes);
const restaurantRoutes = container.get<RestaurantRoutes>(TYPES.RestaurantRoutes);

app.use(ROUTE_PATHS.API_PREFIX + ROUTE_PATHS.AUTH.BASE, authRoutes.router);
app.use(ROUTE_PATHS.API_PREFIX + ROUTE_PATHS.RESTAURANT.BASE, restaurantRoutes.router);

app.get(ROUTE_PATHS.API_PREFIX + ROUTE_PATHS.HEALTH, (_req, res) => {
  res.json({ success: true, message: "DineHub API is running" });
});

app.use(errorHandler);

const startServer = async (): Promise<void> => {
  try {
    const database = container.get<Database>(TYPES.Database);
    await database.connect();
    app.listen(env.PORT, () => {
      console.log(`DineHub Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
export default app;
