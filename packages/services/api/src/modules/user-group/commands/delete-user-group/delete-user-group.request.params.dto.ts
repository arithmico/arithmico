import { IsNotEmpty, IsString, Length } from 'class-validator';

export class DeleteUserGroupRequestParamsDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  groupId: string;
}
