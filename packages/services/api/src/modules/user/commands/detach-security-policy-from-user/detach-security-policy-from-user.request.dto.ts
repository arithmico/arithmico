import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class DetachSecurityPolicyFromUserRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  policyId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  userId: string;
}
