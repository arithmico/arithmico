import { IsOptional, IsString, Length } from 'class-validator';
import { PageParameterQueryDto } from '../../../../common/dtos/PageParameters.query.dto';

export class GetUserGroupsRequestQueryDto extends PageParameterQueryDto {
  @IsOptional()
  @IsString()
  @Length(1, 256)
  checkSecurityPolicyAttachment?: string;

  @IsOptional()
  @IsString()
  @Length(1, 256)
  checkGroupMembership?: string;
}
