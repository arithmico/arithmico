import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class GetSecurityPoliciesAttachedToUserRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  userId: string;
}
