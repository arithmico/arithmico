import { IsNotEmpty, IsString, Length } from 'class-validator';

export class GetUserGroupsForUserRequestParamsDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  userId: string;
}
