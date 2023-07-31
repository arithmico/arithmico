import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ConfigurationRepository } from '../../../../infrastructure/database/repositories/configuration/configuration.repository';
import { GetLatestConfigurationRevisionFeatureFlagIdsQuery } from './get-latest-configuration-revision-feature-flag-ids.query';
import { GetLatestConfigurationRevisionFeatureFlagIdsResponseDto } from './get-latest-configuration-revision-feature-flag-ids.response.dto';

@QueryHandler(GetLatestConfigurationRevisionFeatureFlagIdsQuery)
export class GetLatestConfigurationRevisionFeatureFlagIdsHandler
  implements IQueryHandler<GetLatestConfigurationRevisionFeatureFlagIdsQuery>
{
  constructor(
    private readonly configurationRepository: ConfigurationRepository,
  ) {}

  async execute(
    query: GetLatestConfigurationRevisionFeatureFlagIdsQuery,
  ): Promise<GetLatestConfigurationRevisionFeatureFlagIdsResponseDto> {
    const result =
      await this.configurationRepository.getLatestConfigurationRevisionFeatureFlags(
        query.configurationId,
      );

    if (!result) {
      return {
        featureFlagIds: [],
      };
    }

    return {
      featureFlagIds: result.map((featureFlag) => featureFlag._id),
    };
  }
}
