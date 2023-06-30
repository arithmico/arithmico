import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AddUserToUserGroupRequestParamsDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  groupId: string;
}
