export interface PagedResponse<T> {
  items: T[];
  skip: number;
  limit: number;
  total: number;
}

export interface PageQueryParams {
  skip: number;
  limit: number;
}
