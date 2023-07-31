import { ConfigurationRevisionWithVersionDto } from '../../common/configuration-revision-with-version.dto';

export class GetConfigurationRevisionsResponseDto extends ConfigurationRevisionWithVersionDto {
  associatedFeatureFlags: number;
}
