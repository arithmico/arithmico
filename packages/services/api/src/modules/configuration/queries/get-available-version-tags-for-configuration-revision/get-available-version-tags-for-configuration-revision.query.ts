export class GetAvailableVersionTagsForConfigurationRevisionQuery {
  constructor(
    public readonly skip: number,
    public readonly limit: number,
    public readonly configurationId: string,
    public readonly configurationRevisionId: string,
  ) {}
}
