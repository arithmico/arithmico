import { PlatformBuildJobPlatform } from '../../../../infrastructure/database/schemas/build-job/platform-build-job.schema';

export class AddPlatformBuildJobCommand {
  constructor(
    public readonly configurationId: string,
    public readonly configurationRevisionId: string,
    public readonly buildJobId: string,
    public readonly platform: PlatformBuildJobPlatform,
    public readonly webhookToken: string,
  ) {}
}
