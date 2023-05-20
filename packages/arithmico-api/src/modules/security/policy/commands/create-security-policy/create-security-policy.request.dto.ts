import {
  ArrayMaxSize,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { SecurityAttribute } from '../../../../../common/types/security-attributes.enum';

export class CreateSecurityPolicyRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;

  @ArrayMaxSize(1024)
  @IsEnum(SecurityAttribute, { each: true })
  attributes: SecurityAttribute[];
}
