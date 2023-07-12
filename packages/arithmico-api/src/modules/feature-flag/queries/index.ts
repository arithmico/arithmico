import { GetFeatureFlagByIdController } from './get-feature-flag-by-id/get-feature-flag-by-id.controller';
import { GetFeatureFlagByIdHandler } from './get-feature-flag-by-id/get-feature-flag-by-id.handler';
import { GetFeatureFlagsController } from './get-feature-flags/get-feature-flags.controller';
import { GetFeatureFlagsHandler } from './get-feature-flags/get-feature-flags.handler';
import { GetVersionTagsForFeatureFlagController } from './get-version-tags-for-feature-flag/get-version-tags-for-feature-flag.controller';
import { GetVersionTagsForFeatureFlagHandler } from './get-version-tags-for-feature-flag/get-version-tags-for-feature-flag.handler';

export const queryHandlers = [
  GetFeatureFlagsHandler,
  GetFeatureFlagByIdHandler,
  GetVersionTagsForFeatureFlagHandler,
];

export const queryControllers = [
  GetFeatureFlagsController,
  GetFeatureFlagByIdController,
  GetVersionTagsForFeatureFlagController,
];
