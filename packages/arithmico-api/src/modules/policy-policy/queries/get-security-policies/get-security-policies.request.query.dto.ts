import { IsArray, IsOptional, IsString, Length } from 'class-validator';
import { PageParameterQueryDto } from '../../../../common/dtos/PageParameters.query.dto';

export class GetSecurityPoliciesRequestQueryDto extends PageParameterQueryDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Length(1, 256, { each: true })
  exclude?: string[];
}
