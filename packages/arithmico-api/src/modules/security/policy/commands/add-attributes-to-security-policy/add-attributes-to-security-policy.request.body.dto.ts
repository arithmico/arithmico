import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AddAttributesToSecurityPolicyRequestBodyDto {
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @MaxLength(256, { each: true })
  attributes: string[];
}
