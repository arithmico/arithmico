import { ArrayMaxSize, IsEnum } from 'class-validator';
import { SecurityAttribute } from '../../../../../common/constants/security-attributes.enum';

export class SetSecurityPolicyAttributesRequestBodyDto {
  @ArrayMaxSize(1024)
  @IsEnum(SecurityAttribute, { each: true })
  attributes: SecurityAttribute[];
}
