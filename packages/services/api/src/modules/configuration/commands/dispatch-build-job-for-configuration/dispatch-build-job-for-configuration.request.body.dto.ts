import { IsString, Length } from 'class-validator';

export class DispatchBuildJobForConfigurationRequestBodyDto {
  @IsString()
  @Length(1, 256)
  configurationRevisionId: string;

  @IsString()
  @Length(1, 256)
  versionTagId: string;
}
