import { IsString, Length } from 'class-validator';

export class GetLatestConfigurationRevisionFeatureFlagIdsRequestParamsDto {
  @IsString()
  @Length(1, 256)
  configurationId: string;
}
