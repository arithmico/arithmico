import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { FeatureFlagRepository } from '../../../../infrastructure/database/repositories/feature-flag/feature-flag.repository';
import { GetFeatureFlagsQuery } from './get-feature-flags.query';
import { GetFeatureFlagsResponseDto } from './get-feature-flags.response.dto';

@QueryHandler(GetFeatureFlagsQuery)
export class GetFeatureFlagsHandler
  implements IQueryHandler<GetFeatureFlagsQuery>
{
  constructor(private featureFlagRepository: FeatureFlagRepository) {}

  async execute(
    query: GetFeatureFlagsQuery,
  ): Promise<PagedResponse<GetFeatureFlagsResponseDto>> {
    const result = await this.featureFlagRepository.getFeatureFlags(
      query.skip,
      query.limit,
    );

    return {
      skip: result.skip,
      limit: result.limit,
      total: result.total,
      items: result.items.map((featureFlag) => ({
        id: featureFlag._id,
        type: featureFlag.type,
        flag: featureFlag.flag,
        name: featureFlag.name,
        enabledSinceVersion: {
          major: featureFlag.enabledSinceVersion.major,
          minor: featureFlag.enabledSinceVersion.minor,
          patch: featureFlag.enabledSinceVersion.patch,
        },
        disabledSinceVersion: featureFlag.disabledSinceVersion
          ? {
              major: featureFlag.disabledSinceVersion.major,
              minor: featureFlag.disabledSinceVersion.minor,
              patch: featureFlag.disabledSinceVersion.patch,
            }
          : undefined,
      })),
    };
  }
}
