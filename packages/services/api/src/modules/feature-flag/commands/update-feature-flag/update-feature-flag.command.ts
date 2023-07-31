export class UpdateFeatureFlagCommand {
  constructor(
    public readonly flagId: string,
    public readonly name: string | undefined,
    public readonly disabledSinceVersionTagId: string | undefined,
  ) {}
}
