import { IsString, Length } from 'class-validator';

export class GetAvailableVersionTagsForConfigurationRevisionRequestParamsDto {
  @IsString()
  @Length(1, 256)
  configurationId: string;

  @IsString()
  @Length(1, 256)
  configurationRevisionId: string;
}
