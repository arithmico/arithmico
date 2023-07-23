import { ConfigurationDto } from '../../common/configuration-dto';

export class GetConfigurationByIdResponseDto extends ConfigurationDto {
  revisions: number;
}
