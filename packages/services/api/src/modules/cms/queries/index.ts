import { GetConfigurationByIdController } from './get-configuration-by-id/get-configuration-by-id.controller';
import { GetConfigurationByIdHandler } from './get-configuration-by-id/get-configuration-by-id.handler';
import { GetConfigurationsController } from './get-configurations/get-configurations.controller';
import { GetConfigurationsHandler } from './get-configurations/get-configurations.handler';

export const queryHandlers = [
  GetConfigurationsHandler,
  GetConfigurationByIdHandler,
];

export const queryControllers = [
  GetConfigurationsController,
  GetConfigurationByIdController,
];
