export class DispatchBuildJobForConfigurationCommand {
  constructor(
    public readonly configurationId: string,
    public readonly configurationRevisionId: string,
    public readonly versionTagId: string,
  ) {}
}
