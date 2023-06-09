import { IsNotEmpty, IsString } from 'class-validator';

export class GetSecurityPolicyByIdPathDto {
  @IsNotEmpty()
  @IsString()
  policyId: string;
}
