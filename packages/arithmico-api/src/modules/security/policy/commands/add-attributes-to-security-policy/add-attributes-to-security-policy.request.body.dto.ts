import { IsNotEmpty, IsString } from 'class-validator';

export class AddAttributesToSecurityPolicyRequestBodyDto {
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  attributes: string[];
}
