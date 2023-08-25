import { CreateConfigurationController } from './create-configuration/create-configuration.controller';
import { CreateConfigurationHandler } from './create-configuration/create-configuration.handler';
import { CreateConfigurationRevisionController } from './create-configuration-revision/create-configuration-revision.controller';
import { CreateConfigurationRevisionHandler } from './create-configuration-revision/create-configuration-revision.handler';
import { DispatchBuildJobForConfigurationController } from './dispatch-build-job-for-configuration/dispatch-build-job-for-configuration.controller';
import { DispatchBuildJobForConfigurationHandler } from './dispatch-build-job-for-configuration/dispatch-build-job-for-configuration.handler';

export const commandHandlers = [
  CreateConfigurationHandler,
  CreateConfigurationRevisionHandler,
  DispatchBuildJobForConfigurationHandler,
];

export const commandControllers = [
  CreateConfigurationController,
  CreateConfigurationRevisionController,
  DispatchBuildJobForConfigurationController,
];
