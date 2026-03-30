export interface IListMyRestaurantsUseCase {
  execute(userId: string, page: number, limit: number, search?: string): Promise<{ data: any[]; total: number }>;
}
