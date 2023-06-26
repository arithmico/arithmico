import { IsOptional, IsString, Length } from 'class-validator';
import { PageParameterQueryDto } from '../../../../common/dtos/PageParameters.query.dto';

export class GetSecurityPoliciesRequestQueryDto extends PageParameterQueryDto {
  @IsOptional()
  @IsString()
  @Length(1, 256)
  checkAttachedToUserGroup: string;
}
