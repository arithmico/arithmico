import { IsString, Length } from 'class-validator';

export class DispatchBuildJobForConfigurationRequestParamsDto {
  @IsString()
  @Length(1, 256)
  configurationId: string;
}
