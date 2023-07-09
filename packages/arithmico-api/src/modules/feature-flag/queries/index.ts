import { GetFeatureFlagByIdController } from './get-feature-flag-by-id/get-feature-flag-by-id.controller';
import { GetFeatureFlagByIdHandler } from './get-feature-flag-by-id/get-feature-flag-by-id.handler';
import { GetFeatureFlagsController } from './get-feature-flags/get-feature-flags.controller';
import { GetFeatureFlagsHandler } from './get-feature-flags/get-feature-flags.handler';

export const queryHandlers = [
  GetFeatureFlagsHandler,
  GetFeatureFlagByIdHandler,
];

export const queryControllers = [
  GetFeatureFlagsController,
  GetFeatureFlagByIdController,
];
