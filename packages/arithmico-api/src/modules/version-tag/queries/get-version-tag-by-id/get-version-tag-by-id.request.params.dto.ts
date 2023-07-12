import { IsString, Length } from 'class-validator';

export class GetVersionTagByIdRequestParamsDto {
  @IsString()
  @Length(1, 256)
  tagId: string;
}
