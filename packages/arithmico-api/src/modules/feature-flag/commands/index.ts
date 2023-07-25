
import { CreateFeatureFlagController } from './create-feature-flag/create-feature-flag.controller';
import { CreateFeatureFlagHandler } from './create-feature-flag/create-feature-flag.handler';

export const commandHandlers = [CreateFeatureFlagHandler];
export const commandControllers = [CreateFeatureFlagController];
