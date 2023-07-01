import { GetFeatureFlagsController } from './get-feature-flags/get-feature-flags.controller';
import { GetFeatureFlagsHandler } from './get-feature-flags/get-feature-flags.handler';

export const queryHandlers = [GetFeatureFlagsHandler];
export const queryControllers = [GetFeatureFlagsController];
