import { IsString, Length } from 'class-validator';

export class GetUserGroupsForSecurityPolicyRequestParamsDto {
  @IsString()
  @Length(1, 256)
  policyId: string;
}
