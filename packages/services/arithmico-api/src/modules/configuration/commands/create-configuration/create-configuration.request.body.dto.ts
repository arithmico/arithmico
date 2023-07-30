import { IsBoolean, IsString, Length } from 'class-validator';

export class CreateConfigurationRequestBodyDto {
  @IsString()
  @Length(1, 256)
  name: string;

  @IsBoolean()
  autoBuild: boolean;
}
