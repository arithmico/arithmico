export class GetConfigurationsQuery {
  constructor(
    public readonly skip: number,
    public readonly limit: number,
  ) {}
}
