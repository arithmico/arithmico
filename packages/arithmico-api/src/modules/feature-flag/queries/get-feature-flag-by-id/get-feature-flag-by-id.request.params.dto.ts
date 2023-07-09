import { IsString, Length } from 'class-validator';

export class GetFeatureFlagByIdRequestParamsDto {
  @IsString()
  @Length(1, 256)
  flagId: string;
}
