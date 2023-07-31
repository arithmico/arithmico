export class PagedResponse<T> {
  items: T[];
  skip: number;
  limit: number;
  total: number;
}
