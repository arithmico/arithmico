import { IsString, Length } from 'class-validator';

export class UpdatePlatformBuildJobStatusRequestParamsDto {
  @IsString()
  @Length(1, 256)
  configurationId: string;

  @IsString()
  @Length(1, 256)
  configurationRevisionId: string;

  @IsString()
  @Length(1, 256)
  buildJobId: string;
}
