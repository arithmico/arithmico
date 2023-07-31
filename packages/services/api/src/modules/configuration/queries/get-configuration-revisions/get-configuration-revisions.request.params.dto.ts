import { IsString, Length } from 'class-validator';

export class GetConfigurationRevisionsRequestParamsDto {
  @IsString()
  @Length(1, 256)
  configurationId: string;
}
