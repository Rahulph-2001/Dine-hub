export interface IDeleteRestaurantUseCase {
    execute(id: string, userId: string, role: string): Promise<void>
}