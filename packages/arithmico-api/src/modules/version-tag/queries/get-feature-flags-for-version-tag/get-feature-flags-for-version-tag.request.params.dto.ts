import { IsString, Length } from 'class-validator';

export class GetFeatureFlagsForVersionTagRequestParamsDto {
  @IsString()
  @Length(1, 256)
  tagId: string;
}
