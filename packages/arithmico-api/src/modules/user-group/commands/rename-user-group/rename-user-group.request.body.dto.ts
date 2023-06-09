import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RenameUserGroupRequestBodyDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  name: string;
}
