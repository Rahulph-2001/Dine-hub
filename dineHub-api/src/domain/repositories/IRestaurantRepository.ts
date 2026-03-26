import { Restaurant } from "../entities/Restaurant";

export interface IRestaurantRepository {
  create(restaurant: Restaurant): Promise<Restaurant>;
  findAll(page: number, limit: number, search?: string): Promise<{ data: Restaurant[]; total: number }>;
  findById(id: string): Promise<Restaurant | null>;
  findByCreatedBy(userId: string): Promise<Restaurant[]>;
  update(restaurant: Restaurant): Promise<Restaurant>;
  delete(id: string): Promise<void>;
}
