export class GetConfigurationRevisionsQuery {
  constructor(
    public readonly skip: number,
    public readonly limit: number,
    public readonly configurationId: string,
  ) {}
}
