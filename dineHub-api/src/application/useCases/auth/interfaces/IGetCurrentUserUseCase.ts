export interface IGetCurrentUserUseCase {
  execute(userId: string): Promise<any>;
}
