import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { ConfigurationRepository } from '../../../../infrastructure/database/repositories/configuration/configuration.repository';
import { FeatureFlagRepository } from '../../../../infrastructure/database/repositories/feature-flag/feature-flag.repository';
import { GetFeatureFlagsForConfigurationRevisionQuery } from './get-feature-flags-for-configuration-revision.query';
import { GetFeatureFlagsForConfigurationRevisionResponseDto } from './get-feature-flags-for-configuration-revision.response.dto';

@QueryHandler(GetFeatureFlagsForConfigurationRevisionQuery)
export class GetFeatureFlagsForConfigurationRevisionHandler
  implements IQueryHandler<GetFeatureFlagsForConfigurationRevisionQuery>
{
  constructor(
    private readonly configurationRepository: ConfigurationRepository,
    private readonly featureFlagRepository: FeatureFlagRepository,
  ) {}

  async execute(
    query: GetFeatureFlagsForConfigurationRevisionQuery,
  ): Promise<
    PagedResponse<GetFeatureFlagsForConfigurationRevisionResponseDto>
  > {
    await this.configurationRepository.getRevisionByConfigurationIdAndRevisionIdOrThrow(
      query.configurationId,
      query.revisionId,
    );

    const result =
      await this.featureFlagRepository.getFeatureFlagsForConfigurationRevision(
        query.revisionId,
        query.skip,
        query.limit,
      );

    return {
      skip: result.skip,
      limit: result.limit,
      total: result.total,
      items: result.items.map((item) => ({
        id: item._id,
        name: item.name,
        type: item.type,
        flag: item.flag,
        enabledSinceVersionTagId: item.enabledSinceVersionTagId,
        disabledSinceVersionTagId: item.disabledSinceVersionTagId,
      })),
    };
  }
}
