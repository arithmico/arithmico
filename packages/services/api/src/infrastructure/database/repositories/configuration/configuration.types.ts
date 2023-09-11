import { ConfigurationDocument } from '../../schemas/configuration/configuration.schema';
import { SemanticVersion } from '../../schemas/sematic-version/semantic-version.schema';

export type ConfigurationBuildJobsAndVersions = ConfigurationDocument & {
  latestBuildJob: {
    buildJobId: string;
    version: SemanticVersion;
    revision: number;
    platforms: {
      platform: string;
      artifactUrl: string;
    }[];
  };
};
