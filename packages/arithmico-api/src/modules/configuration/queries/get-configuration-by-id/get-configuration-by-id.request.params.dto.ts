import { IsString, Length } from 'class-validator';

export class GetConfigurationByIdRequestParamsDto {
  @IsString()
  @Length(1, 256)
  configurationId: string;
}
