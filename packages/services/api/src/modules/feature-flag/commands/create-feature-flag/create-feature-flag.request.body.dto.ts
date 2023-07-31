import { IsEnum, IsString, Length } from 'class-validator';
import { FeatureFlagType } from '../../../../infrastructure/database/schemas/feature-flag/feature-flag.schema';

export class CreateFeatureFlagRequestBodyDto {
  @IsString()
  @IsEnum(FeatureFlagType)
  type: FeatureFlagType;

  @IsString()
  @Length(1, 512)
  name: string;

  @IsString()
  @Length(1, 512)
  flag: string;

  @IsString()
  @Length(1, 256)
  enabledSinceVersionTagId: string;
}
