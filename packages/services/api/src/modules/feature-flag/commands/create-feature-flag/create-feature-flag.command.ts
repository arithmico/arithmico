import { FeatureFlagType } from '../../../../infrastructure/database/schemas/feature-flag/feature-flag.schema';

export class CreateFeatureFlagCommand {
  constructor(
    public readonly type: FeatureFlagType,
    public readonly name: string,
    public readonly flag: string,
    public readonly enabledSinceVersionTagId: string,
  ) {}
}
