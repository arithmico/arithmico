import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ActivateUserRequestDto {
  @IsNotEmpty()
  @IsString()
  activationId: string;

  @IsNotEmpty()
  @IsString()
  @Length(8)
  password: string;
}
