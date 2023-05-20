import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class GetSecurityPoliciesAttachedToUserPathDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  userId: string;
}
