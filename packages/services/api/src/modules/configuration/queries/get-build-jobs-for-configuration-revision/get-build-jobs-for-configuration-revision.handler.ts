import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { BuildJobRepository } from '../../../../infrastructure/database/repositories/build-job/build-job.repository';
import { GetBuildJobsForConfigurationRevisionQuery } from './get-build-jobs-for-configuration-revision.query';
import { GetBuildJobsForConfigurationRevisionResponseDto } from './get-build-jobs-for-configuration-revision.response.dto';

@QueryHandler(GetBuildJobsForConfigurationRevisionQuery)
export class GetBuildJobsForConfigurationRevisionHandler
  implements IQueryHandler<GetBuildJobsForConfigurationRevisionQuery>
{
  constructor(private readonly buildJobRepository: BuildJobRepository) {}

  async execute(
    query: GetBuildJobsForConfigurationRevisionQuery,
  ): Promise<PagedResponse<GetBuildJobsForConfigurationRevisionResponseDto>> {
    const result =
      await this.buildJobRepository.getBuildJobsForConfigurationRevision(
        query.configurationId,
        query.configurationRevisionId,
        query.skip,
        query.limit,
      );

    return {
      skip: result.skip,
      limit: result.limit,
      total: result.total,
      items: result.items.map((buildJobDocument) => ({
        id: buildJobDocument._id,
        name: buildJobDocument.name,
        isPublic: buildJobDocument.isPublic,
        configurationId: buildJobDocument.configurationId,
        configurationRevisionId: buildJobDocument.configurationRevisionId,
        platforms: buildJobDocument.platforms,
      })),
    };
  }
}
