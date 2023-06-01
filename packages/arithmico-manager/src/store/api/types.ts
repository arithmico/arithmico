export interface PagedResponse<T> {
  items: T[];
  skip: number;
  limit: number;
  total: number;
}
