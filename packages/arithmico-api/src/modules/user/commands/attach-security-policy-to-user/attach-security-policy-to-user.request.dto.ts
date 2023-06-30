import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AttachSecurityPolicyToUserRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  policyId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  userId: string;
}
