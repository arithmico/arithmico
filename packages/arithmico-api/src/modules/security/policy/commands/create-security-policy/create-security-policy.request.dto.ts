import {
  ArrayMaxSize,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { SecurityAttribute } from '../../../../../common/constants/security-attributes.enum';

export class CreateSecurityPolicyRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  name: string;

  @ArrayMaxSize(1024)
  @IsEnum(SecurityAttribute, { each: true })
  attributes: SecurityAttribute[];
}
