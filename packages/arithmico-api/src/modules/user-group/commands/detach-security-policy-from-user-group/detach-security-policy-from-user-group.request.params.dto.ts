import { IsNotEmpty, IsString, Length } from 'class-validator';

export class DetachSecurityPolicyFromUserGroupRequestParamsDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  groupId: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  policyId: string;
}
