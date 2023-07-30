import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { ConfigurationRepository } from '../../../../infrastructure/database/repositories/configuration/configuration.repository';
import { GetConfigurationRevisionsQuery } from './get-configuration-revisions.query';
import { GetConfigurationRevisionsResponseDto } from './get-configuration-revisions.response.dto';

@QueryHandler(GetConfigurationRevisionsQuery)
export class GetConfigurationRevisionsHandler
  implements IQueryHandler<GetConfigurationRevisionsQuery>
{
  constructor(
    private readonly configurationRepository: ConfigurationRepository,
  ) {}

  async execute(
    query: GetConfigurationRevisionsQuery,
  ): Promise<PagedResponse<GetConfigurationRevisionsResponseDto>> {
    const result = await this.configurationRepository.getConfigurationRevisions(
      query.configurationId,
      query.skip,
      query.limit,
    );
    return {
      skip: result.skip,
      limit: result.limit,
      total: result.total,
      items: result.items.map((item) => ({
        id: item._id,
        revision: item.revision,
        associatedFeatureFlags: item.associatedFeatureFlags,
        configurationId: item.configurationId,
        minimumVersion: {
          major: item.minimumVersion.major,
          minor: item.minimumVersion.minor,
          patch: item.minimumVersion.patch,
        },
      })),
    };
  }
}
