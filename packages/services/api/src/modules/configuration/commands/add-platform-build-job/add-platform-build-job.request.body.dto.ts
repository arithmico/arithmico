import { IsEnum, IsString, Length } from 'class-validator';
import { PlatformBuildJobPlatform } from '../../../../infrastructure/database/schemas/build-job/platform-build-job.schema';

export class AddPlatformBuildJobRequestBodyDto {
  @IsString()
  @Length(1, 256)
  webhookToken: string;

  @IsString()
  @IsEnum(PlatformBuildJobPlatform)
  platform: PlatformBuildJobPlatform;
}
