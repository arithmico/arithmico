import { ConfigurationDto } from '../../common/configuration-dto';

export class GetConfigurationsResponseDto extends ConfigurationDto {
  revisions: number;
}
