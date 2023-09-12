import { ConfigurationDocument } from '../../schemas/configuration/configuration.schema';
import { SemanticVersion } from '../../schemas/sematic-version/semantic-version.schema';

export type PublicConfigurationPreview = ConfigurationDocument & {
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

export type PublicConfigurationDetails = ConfigurationDocument & {
  buildJobs: {
    buildJobId: string;
    version: SemanticVersion;
    revision: number;
    platforms: {
      platform: string;
      artifactUrl: string;
    }[];
  }[];
};
