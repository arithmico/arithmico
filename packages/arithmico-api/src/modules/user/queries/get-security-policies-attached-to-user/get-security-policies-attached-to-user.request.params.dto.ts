import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class GetSecurityPoliciesAttachedToUserRequestParamsDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  userId: string;
}
