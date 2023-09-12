import {
  PlatformBuildJobPlatform,
  PlatformBuildJobStatus,
} from '../../../infrastructure/database/schemas/build-job/platform-build-job.schema';

export class BuildJobDto {
  id: string;
  name: string;
  isPublic: boolean;
  configurationId: string;
  configurationRevisionId: string;
  platforms: {
    status: PlatformBuildJobStatus;
    platform: PlatformBuildJobPlatform;
    artifactUrl?: string;
  }[];
}
