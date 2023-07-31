import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { VersionTagRepository } from '../../../../infrastructure/database/repositories/version-tag/version-tag.repository';
import { GetVersionTagByIdQuery } from './get-version-tag-by-id.query';
import { GetVersionTagByIdResponseDto } from './get-version-tag-by-id.response.dto';

@QueryHandler(GetVersionTagByIdQuery)
export class GetVersionTagByIdHandler
  implements IQueryHandler<GetVersionTagByIdQuery>
{
  constructor(private versionTagRepository: VersionTagRepository) {}

  async execute(
    query: GetVersionTagByIdQuery,
  ): Promise<GetVersionTagByIdResponseDto> {
    const versionTag = await this.versionTagRepository.getVersionTagByIdOrThrow(
      query.tagId,
    );

    return {
      id: versionTag._id,
      configurable: versionTag.configurable,
      version: {
        major: versionTag.version.major,
        minor: versionTag.version.minor,
        patch: versionTag.version.patch,
      },
    };
  }
}
