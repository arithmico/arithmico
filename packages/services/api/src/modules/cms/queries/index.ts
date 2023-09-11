import { GetConfigurationsController } from './get-configurations/get-configurations.controller';
import { GetConfigurationsHandler } from './get-configurations/get-configurations.handler';

export const queryHandlers = [GetConfigurationsHandler];

export const queryControllers = [GetConfigurationsController];
