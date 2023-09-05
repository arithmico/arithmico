import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import {
  PlatformBuildJobPlatform,
  PlatformBuildJobStatus,
} from '../../../../infrastructure/database/schemas/build-job/platform-build-job.schema';

export class UpdatePlatformBuildJobStatusRequestBodyDto {
  @IsString()
  @Length(1, 256)
  webhookToken: string;

  @IsString()
  @IsEnum(PlatformBuildJobPlatform)
  platform: PlatformBuildJobPlatform;

  @IsString()
  @IsEnum(PlatformBuildJobStatus)
  status: PlatformBuildJobStatus;

  @IsOptional()
  @IsString()
  @Length(1, 2048)
  artifactUrl?: string;
}
