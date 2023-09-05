import {
  PlatformBuildJobPlatform,
  PlatformBuildJobStatus,
} from '../../../../infrastructure/database/schemas/build-job/platform-build-job.schema';

export class UpdatePlatformBuildJobStatusCommand {
  constructor(
    public readonly configurationId: string,
    public readonly configurationRevisionId: string,
    public readonly buildJobId: string,
    public readonly platform: PlatformBuildJobPlatform,
    public readonly webhookToken: string,
    public readonly status: PlatformBuildJobStatus,
  ) {}
}
