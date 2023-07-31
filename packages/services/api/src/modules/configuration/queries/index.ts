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
];

export const queryControllers = [
  GetLatestConfigurationRevisionFeatureFlagIdsController,
  GetConfigurationsController,
  GetConfigurationByIdController,
  GetConfigurationRevisionsController,
  GetFeatureFlagsForConfigurationRevisionController,
  GetConfigurationRevisionJsonExportController,
  GetConfigurationRevisionByIdController,
];
