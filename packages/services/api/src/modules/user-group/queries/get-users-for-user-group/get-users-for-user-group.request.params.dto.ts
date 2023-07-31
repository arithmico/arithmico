import { IsNotEmpty, IsString, Length } from 'class-validator';

export class GetUsersForUserGroupRequestParamsDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  groupId: string;
}
