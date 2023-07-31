import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateFeatureFlagRequestBodyDto {
  @IsOptional()
  @IsString()
  @Length(1, 256)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 256)
  disabledSinceVersionTagId?: string;
}
