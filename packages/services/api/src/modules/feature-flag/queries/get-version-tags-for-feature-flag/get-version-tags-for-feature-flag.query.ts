export class GetVersionTagsForFeatureFlagQuery {
  constructor(
    public readonly flagId: string,
    public readonly skip: number,
    public readonly limit: number,
  ) {}
}
