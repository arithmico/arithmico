import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { FeatureFlagVersionTagRelationRepository } from '../../../../infrastructure/database/repositories/feature-flag-version-tag-relation/feature-flag-version-tag-relation.respository';
import { GetVersionTagsForFeatureFlagQuery } from './get-version-tags-for-feature-flag.query';
import { GetVersionTagsForFeatureFlagResponseDto } from './get-version-tags-for-feature-flag.response.dto';

@QueryHandler(GetVersionTagsForFeatureFlagQuery)
export class GetVersionTagsForFeatureFlagHandler
  implements IQueryHandler<GetVersionTagsForFeatureFlagQuery>
{
  constructor(
    private featureFlagVersionTagRelationRepository: FeatureFlagVersionTagRelationRepository,
  ) {}

  async execute(
    query: GetVersionTagsForFeatureFlagQuery,
  ): Promise<PagedResponse<GetVersionTagsForFeatureFlagResponseDto>> {
    const result =
      await this.featureFlagVersionTagRelationRepository.getVersionTagsForFeatureFlag(
        query.flagId,
        query.skip,
        query.limit,
      );

    return {
      skip: result.skip,
      limit: result.limit,
      total: result.total,
      items: result.items.map((versionTag) => ({
        id: versionTag._id,
        configurable: versionTag.configurable,
        version: {
          major: versionTag.version.major,
          minor: versionTag.version.minor,
          patch: versionTag.version.patch,
        },
      })),
    };
  }
}
