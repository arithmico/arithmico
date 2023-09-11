import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { ConfigurationRepository } from '../../../../infrastructure/database/repositories/configuration/configuration.repository';
import { GetConfigurationsQuery } from './get-configurations.query';
import { GetConfigurationsResponseDto } from './get-configurations.response.dto';

@QueryHandler(GetConfigurationsQuery)
export class GetConfigurationsHandler
  implements IQueryHandler<GetConfigurationsQuery>
{
  constructor(
    private readonly configurationRepository: ConfigurationRepository,
  ) {}

  async execute(
    query: GetConfigurationsQuery,
  ): Promise<PagedResponse<GetConfigurationsResponseDto>> {
    const result = await this.configurationRepository.getPublicConfigurations(
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
        latestBuildJob: {
          platforms: item.latestBuildJob.platforms,
          revision: item.latestBuildJob.revision,
          version: {
            major: item.latestBuildJob.version.major,
            minor: item.latestBuildJob.version.minor,
            patch: item.latestBuildJob.version.patch,
          },
        },
      })),
    };
  }
}
