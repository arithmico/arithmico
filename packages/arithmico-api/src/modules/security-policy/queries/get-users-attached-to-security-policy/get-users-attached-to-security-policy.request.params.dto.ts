import { IsNotEmpty, IsString, Length } from 'class-validator';

export class GetUsersAttachedToSecurityPolicyRequestParamsDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  policyId: string;
}
