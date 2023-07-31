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
  enabledSinceVersion: {
    major: number;
    minor: number;
    patch: number;
  };
  disabledSinceVersion?: {
    major: number;
    minor: number;
    patch: number;
  };
}
