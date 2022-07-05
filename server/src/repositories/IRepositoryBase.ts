export interface IRepositoryBase<T> {
  Get(id: string): Promise<T | undefined>;
  Create(params?: Partial<T>): Promise<T>;
  Update(params: T): Promise<T>;
  Delete(id: string): Promise<void>;
}
