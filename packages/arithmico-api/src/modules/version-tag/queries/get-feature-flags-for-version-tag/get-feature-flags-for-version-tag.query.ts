export class GetFeatureFlagsForVersionTagQuery {
  constructor(
    public readonly tagId: string,
    public readonly skip: number,
    public readonly limit: number,
  ) {}
}
