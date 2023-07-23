export class GetConfigurationRevisionJsonExportQuery {
  constructor(
    public readonly configurationId: string,
    public readonly revisionId: string,
  ) {}
}
