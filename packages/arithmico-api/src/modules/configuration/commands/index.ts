import { CreateConfigurationController } from './create-configuration/create-configuration.controller';
import { CreateConfigurationHandler } from './create-configuration/create-configuration.handler';
import { CreateConfigurationRevisionController } from './create-configuration-revision/create-configuration-revision.controller';
import { CreateConfigurationRevisionHandler } from './create-configuration-revision/create-configuration-revision.handler';

export const commandHandlers = [
  CreateConfigurationHandler,
  CreateConfigurationRevisionHandler,
];

export const commandControllers = [
  CreateConfigurationController,
  CreateConfigurationRevisionController,
];
