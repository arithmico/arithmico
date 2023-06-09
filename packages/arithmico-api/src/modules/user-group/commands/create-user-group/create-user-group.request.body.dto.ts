import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserGroupRequestBodyDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  name: string;
}
