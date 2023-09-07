import { CreateConfigurationController } from './create-configuration/create-configuration.controller';
import { CreateConfigurationHandler } from './create-configuration/create-configuration.handler';
import { CreateConfigurationRevisionController } from './create-configuration-revision/create-configuration-revision.controller';
import { CreateConfigurationRevisionHandler } from './create-configuration-revision/create-configuration-revision.handler';
import { DispatchBuildJobForConfigurationController } from './dispatch-build-job-for-configuration/dispatch-build-job-for-configuration.controller';
import { DispatchBuildJobForConfigurationHandler } from './dispatch-build-job-for-configuration/dispatch-build-job-for-configuration.handler';
import { AddPlatformBuildJobController } from './add-platform-build-job/add-platform-build-job.controller';
import { AddPlatformBuildJobHandler } from './add-platform-build-job/add-platform-build-job.handler';
import { UpdatePlatformBuildJobStatusController } from './update-platform-build-job-status/update-platform-build-job-status.controller';
import { UpdatePlatformBuildJobStatusHandler } from './update-platform-build-job-status/update-platform-build-job-status.handler';
import { PublishBuildJobController } from './publish-build-job/publish-build-job.controller';
import { PublishBuildJobHandler } from './publish-build-job/publish-build-job.handler';

export const commandHandlers = [
  CreateConfigurationHandler,
  CreateConfigurationRevisionHandler,
  DispatchBuildJobForConfigurationHandler,
  AddPlatformBuildJobHandler,
  UpdatePlatformBuildJobStatusHandler,
  PublishBuildJobHandler,
];

export const commandControllers = [
  CreateConfigurationController,
  CreateConfigurationRevisionController,
  DispatchBuildJobForConfigurationController,
  AddPlatformBuildJobController,
  UpdatePlatformBuildJobStatusController,
  PublishBuildJobController,
];
