import { IsString, Length } from 'class-validator';

export class CreateConfigurationRevisionRequestParamsDto {
  @IsString()
  @Length(1, 256)
  configurationId: string;
}
