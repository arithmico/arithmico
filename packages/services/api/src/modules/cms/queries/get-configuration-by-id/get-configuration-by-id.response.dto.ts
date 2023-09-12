import { SemanticVersion } from '../../../../infrastructure/database/schemas/sematic-version/semantic-version.schema';

export class GetConfigurationByIdResponseDto {
  id: string;
  name: string;
  buildJobs: {
    buildJobId: string;
    version: SemanticVersion;
    revision: number;
    platforms: {
      platform: string;
      artifactUrl: string;
    }[];
  }[];
}
