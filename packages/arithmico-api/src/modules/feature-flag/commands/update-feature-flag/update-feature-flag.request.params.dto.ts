import { IsString, Length } from 'class-validator';

export class UpdateFeatureFlagRequestParamsDto {
  @IsString()
  @Length(1, 256)
  flagId: string;
}
