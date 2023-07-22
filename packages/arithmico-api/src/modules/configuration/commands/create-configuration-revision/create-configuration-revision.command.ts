export class CreateConfigurationRevisionCommand {
  constructor(
    public readonly configurationId: string,
    public readonly minimumVersionTagId: string,
    public readonly featureFlagIds: string[],
  ) {}
}
