import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { FeatureFlagVersionTagRelationRepository } from '../../../../infrastructure/database/repositories/feature-flag-version-tag-relation/feature-flag-version-tag-relation.respository';
import { GetFeatureFlagsForVersionTagQuery } from './get-feature-flags-for-version-tag.query';
import { GetFeatureFlagsForVersionTagResponseDto } from './get-feature-flags-for-version-tag.response.dto';

@QueryHandler(GetFeatureFlagsForVersionTagQuery)
export class GetFeatureFlagsForVersionTagHandler
  implements IQueryHandler<GetFeatureFlagsForVersionTagQuery>
{
  constructor(
    private readonly featureFlagVersionTagRelationRepository: FeatureFlagVersionTagRelationRepository,
  ) {}

  async execute(
    query: GetFeatureFlagsForVersionTagQuery,
  ): Promise<PagedResponse<GetFeatureFlagsForVersionTagResponseDto>> {
    const result =
      await this.featureFlagVersionTagRelationRepository.getFeatureFlagsForVersionTag(
        query.tagId,
        query.skip,
        query.limit,
      );

    return {
      skip: result.skip,
      limit: result.limit,
      total: result.total,
      items: result.items.map((featureFlag) => ({
        id: featureFlag._id,
        flag: featureFlag.flag,
        type: featureFlag.type,
        name: featureFlag.name,
        enabledSinceVersionTagId: featureFlag.enabledSinceVersionTagId,
        disabledSinceVersionTagId: featureFlag.disabledSinceVersionTagId,
      })),
    };
  }
}
