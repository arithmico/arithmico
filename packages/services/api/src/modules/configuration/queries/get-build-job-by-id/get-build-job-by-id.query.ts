export class GetBuildJobByIdQuery {
  constructor(
    public readonly configurationId: string,
    public readonly configurationRevisionId: string,
    public readonly buildJobId: string,
  ) {}
}
