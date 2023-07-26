import { IsString, Length } from 'class-validator';

export class GetConfigurationRevisionByIdRequestParamsDto {
  @IsString()
  @Length(1, 256)
  configurationId: string;

  @IsString()
  @Length(1, 256)
  revisionId: string;
}
