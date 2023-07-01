import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { VersionTagRepository } from '../../../../infrastructure/database/repositories/version-tag/version-tag.repository';
import { GetVersionTagsQuery } from './get-version-tags.query';
import { GetVersionTagsResponseDto } from './get-version-tags.response.dto';

@QueryHandler(GetVersionTagsQuery)
export class GetVersionTagsHandler
  implements IQueryHandler<GetVersionTagsQuery>
{
  constructor(private versionTagRepository: VersionTagRepository) {}

  async execute(
    query: GetVersionTagsQuery,
  ): Promise<PagedResponse<GetVersionTagsResponseDto>> {
    const result = await this.versionTagRepository.getVersionTags(
      query.skip,
      query.limit,
    );

    return {
      skip: result.skip,
      limit: result.limit,
      total: result.total,
      items: result.items.map((versionTag) => ({
        id: versionTag._id,
        version: {
          major: versionTag.version.major,
          minor: versionTag.version.minor,
          patch: versionTag.version.patch,
        },
        configurable: versionTag.configurable,
      })),
    };
  }
}
