import { ArrayMaxSize, ArrayMinSize, IsString, Length } from 'class-validator';

export class CreateConfigurationRevisionRequestBodyDto {
  @ArrayMaxSize(1024)
  @ArrayMinSize(1)
  @IsString({ each: true })
  @Length(1, 256, { each: true })
  featureFlagIds: string[];

  @IsString()
  @Length(1, 256)
  minimumVersionTagId;
}
