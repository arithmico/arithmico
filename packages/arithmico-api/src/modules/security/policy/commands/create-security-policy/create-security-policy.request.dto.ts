import { ArrayMaxSize, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSecurityPolicyRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;

  @IsString({ each: true })
  @MaxLength(256, { each: true })
  @ArrayMaxSize(1024)
  attributes: string[];
}
