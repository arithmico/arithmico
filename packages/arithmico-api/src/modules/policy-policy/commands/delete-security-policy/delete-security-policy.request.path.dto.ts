import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class DeleteSecurityPolicyRequestPathDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  policyId: string;
}
