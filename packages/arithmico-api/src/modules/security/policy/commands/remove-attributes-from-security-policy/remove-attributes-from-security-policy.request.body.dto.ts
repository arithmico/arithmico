import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveAttributesFromSecurityPolicyRequestBodyDto {
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  attributes: string[];
}
