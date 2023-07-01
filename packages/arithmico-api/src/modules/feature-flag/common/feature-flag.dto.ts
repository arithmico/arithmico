import { FeatureFlagType } from '../../../infrastructure/database/schemas/feature-flag/feature-flag.schema';

export class FeatureFlagDto {
  id: string;
  name: string;
  flag: string;
  type: FeatureFlagType;
  enabledSinceVersionTagId: string;
  disabledSinceVersionTagId?: string;
}

export class FeatureFlagWithVersionsDto {
  id: string;
  name: string;
  flag: string;
  type: FeatureFlagType;
  enabledSinceVersionTag: {
    major: number;
    minor: number;
    patch: number;
  };
  disabledSinceVersionTag?: {
    major: number;
    minor: number;
    patch: number;
  };
}
