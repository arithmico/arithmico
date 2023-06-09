import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SetSecurityPolicyAttributesRequestPathDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256, { each: true })
  policyId: string;
}
