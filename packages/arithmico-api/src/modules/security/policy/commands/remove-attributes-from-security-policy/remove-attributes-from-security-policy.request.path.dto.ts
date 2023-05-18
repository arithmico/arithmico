import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveAttributesFromSecurityPolicyRequestPathDto {
  @IsNotEmpty()
  @IsString()
  policyId: string;
}
