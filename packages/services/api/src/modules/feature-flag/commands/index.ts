import { CreateFeatureFlagController } from './create-feature-flag/create-feature-flag.controller';
import { CreateFeatureFlagHandler } from './create-feature-flag/create-feature-flag.handler';
import { UpdateFeatureFlagController } from './update-feature-flag/update-feature-flag.controller';
import { UpdateFeatureFlagHandler } from './update-feature-flag/update-feature-flag.handler';

export const commandHandlers = [
  CreateFeatureFlagHandler,
  UpdateFeatureFlagHandler,
];

export const commandControllers = [
  CreateFeatureFlagController,
  UpdateFeatureFlagController,
];
