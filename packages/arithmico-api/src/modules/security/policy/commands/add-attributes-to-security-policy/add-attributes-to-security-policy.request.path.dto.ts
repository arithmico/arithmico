import { IsNotEmpty, IsString } from 'class-validator';

export class AddAttributesToSecurityPolicyRequestPathDto {
  @IsNotEmpty()
  @IsString()
  policyId: string;
}
