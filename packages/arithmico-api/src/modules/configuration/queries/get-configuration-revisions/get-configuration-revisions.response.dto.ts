import { ConfigurationRevisionDto } from '../../common/configuration-revision.dto';

export class GetConfigurationRevisionsResponseDto extends ConfigurationRevisionDto {
  associatedFeatureFlags: number;
}
