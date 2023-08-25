import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { ConfigurationRepository } from '../../../../infrastructure/database/repositories/configuration/configuration.repository';
import { VersionTagRepository } from '../../../../infrastructure/database/repositories/version-tag/version-tag.repository';
import { GetAvailableVersionTagsForConfigurationRevisionQuery } from './get-available-version-tags-for-configuration-revision.query';
import { GetAvailableVersionTagsForConfigurationRevisionResponseDto } from './get-available-version-tags-for-configuration-revision.response.dto';

@QueryHandler(GetAvailableVersionTagsForConfigurationRevisionQuery)
export class GetAvailableVersionTagsForConfigurationRevisionHandler
  implements
    IQueryHandler<GetAvailableVersionTagsForConfigurationRevisionQuery>
{
  constructor(
    private readonly configurationRepository: ConfigurationRepository,
    private readonly versionTagRepository: VersionTagRepository,
  ) {}

  async execute(
    query: GetAvailableVersionTagsForConfigurationRevisionQuery,
  ): Promise<
    PagedResponse<GetAvailableVersionTagsForConfigurationRevisionResponseDto>
  > {
    const configurationRevisionDocument =
      await this.configurationRepository.getRevisionByConfigurationIdAndRevisionIdOrThrow(
        query.configurationId,
        query.configurationRevisionId,
      );
    const versionTagDocument =
      await this.versionTagRepository.getVersionTagByIdOrThrow(
        configurationRevisionDocument.minimumVersionTagId,
      );
    const availableVersionTags =
      await this.versionTagRepository.getVersionTagsGreaterThanOrEquals(
        versionTagDocument.version,
        query.skip,
        query.limit,
      );

    return {
      skip: availableVersionTags.skip,
      limit: availableVersionTags.limit,
      total: availableVersionTags.total,
      items: availableVersionTags.items.map((versionTag) => ({
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
