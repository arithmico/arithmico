import { GetAvailableVersionTagsForConfigurationRevisionController } from './get-available-version-tags-for-configuration-revision/get-available-version-tags-for-configuration-revision.controller';
import { GetAvailableVersionTagsForConfigurationRevisionHandler } from './get-available-version-tags-for-configuration-revision/get-available-version-tags-for-configuration-revision.handler';
import { GetBuildJobByIdController } from './get-build-job-by-id/get-build-job-by-id.controller';
import { GetBuildJobByIdHandler } from './get-build-job-by-id/get-build-job-by-id.handler';
import { GetBuildJobsForConfigurationRevisionController } from './get-build-jobs-for-configuration-revision/get-build-jobs-for-configuration-revision.controller';
import { GetBuildJobsForConfigurationRevisionHandler } from './get-build-jobs-for-configuration-revision/get-build-jobs-for-configuration-revision.handler';
import { GetConfigurationByIdController } from './get-configuration-by-id/get-configuration-by-id.controller';
import { GetConfigurationByIdHandler } from './get-configuration-by-id/get-configuration-by-id.handler';
import { GetConfigurationRevisionByIdController } from './get-configuration-revision-by-id/get-configuration-revision-by-id.controller';
import { GetConfigurationRevisionByIdHandler } from './get-configuration-revision-by-id/get-configuration-revision-by-id.handler';
import { GetConfigurationRevisionJsonExportController } from './get-configuration-revision-json-export/get-configuration-revision-json-export.controller';
import { GetConfigurationRevisionJsonExportHandler } from './get-configuration-revision-json-export/get-configuration-revision-json-export.handler';
import { GetConfigurationRevisionsController } from './get-configuration-revisions/get-configuration-revisions.controller';
import { GetConfigurationRevisionsHandler } from './get-configuration-revisions/get-configuration-revisions.handler';
import { GetConfigurationsController } from './get-configurations/get-configurations.controller';
import { GetConfigurationsHandler } from './get-configurations/get-configurations.handler';
import { GetFeatureFlagsForConfigurationRevisionController } from './get-feature-flags-for-configuration-revision/get-feature-flags-for-configuration-revision.controller';
import { GetFeatureFlagsForConfigurationRevisionHandler } from './get-feature-flags-for-configuration-revision/get-feature-flags-for-configuration-revision.handler';
import { GetLatestConfigurationRevisionFeatureFlagIdsController } from './get-latest-configuration-revision-feature-flag-ids/get-latest-configuration-revision-feature-flag-ids.controller';
import { GetLatestConfigurationRevisionFeatureFlagIdsHandler } from './get-latest-configuration-revision-feature-flag-ids/get-latest-configuration-revision-feature-flag-ids.handler';

export const queryHandlers = [
  GetLatestConfigurationRevisionFeatureFlagIdsHandler,
  GetConfigurationsHandler,
  GetConfigurationByIdHandler,
  GetConfigurationRevisionsHandler,
  GetFeatureFlagsForConfigurationRevisionHandler,
  GetConfigurationRevisionJsonExportHandler,
  GetConfigurationRevisionByIdHandler,
  GetAvailableVersionTagsForConfigurationRevisionHandler,
  GetBuildJobsForConfigurationRevisionHandler,
  GetBuildJobByIdHandler,
];

export const queryControllers = [
  GetLatestConfigurationRevisionFeatureFlagIdsController,
  GetConfigurationsController,
  GetConfigurationByIdController,
  GetConfigurationRevisionsController,
  GetFeatureFlagsForConfigurationRevisionController,
  GetConfigurationRevisionJsonExportController,
  GetConfigurationRevisionByIdController,
  GetAvailableVersionTagsForConfigurationRevisionController,
  GetBuildJobsForConfigurationRevisionController,
  GetBuildJobByIdController,
];
