export class GetFeatureFlagsForConfigurationRevisionQuery {
  constructor(
    public readonly configurationId: string,
    public readonly revisionId: string,
    public readonly skip: number,
    public readonly limit: number,
  ) {}
}
