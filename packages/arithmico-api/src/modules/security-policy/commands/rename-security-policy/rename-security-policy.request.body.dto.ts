import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RenameSecurityPolicyRequestBodyDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  name: string;
}
