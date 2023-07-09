import { IsString, Length } from 'class-validator';

export class GetVersionTagsForFeatureFlagRequestParamsDto {
  @IsString()
  @Length(1, 256)
  flagId: string;
}
