export class GetVersionTagsQuery {
  constructor(
    public readonly skip: number,
    public readonly limit: number,
  ) {}
}
