export class GetConfigurationRevisionByIdQuery {
  constructor(
    public readonly configurationId: string,
    public readonly revisionId: string,
  ) {}
}
