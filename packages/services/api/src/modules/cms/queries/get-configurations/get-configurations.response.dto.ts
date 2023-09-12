import { SemanticVersion } from '../../../../infrastructure/database/schemas/sematic-version/semantic-version.schema';

export class GetConfigurationsResponseDto {
  id: string;
  name: string;
  latestBuildJob: {
    version: SemanticVersion;
    revision: number;
    platforms: {
      platform: string;
      artifactUrl: string;
    }[];
  };
}
