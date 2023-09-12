export class GetBuildJobsForConfigurationRevisionQuery {
  constructor(
    public readonly configurationId: string,
    public readonly configurationRevisionId: string,
    public readonly skip: number,
    public readonly limit: number,
  ) {}
}
