import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BuildJobRepository } from '../../../../infrastructure/database/repositories/build-job/build-job.repository';
import { GetBuildJobByIdQuery } from './get-build-job-by-id.query';
import { GetBuildJobByIdResponseDto } from './get-build-job-by-id.response.dto';

@QueryHandler(GetBuildJobByIdQuery)
export class GetBuildJobByIdHandler
  implements IQueryHandler<GetBuildJobByIdQuery>
{
  constructor(private readonly buildJobRepository: BuildJobRepository) {}

  async execute(
    query: GetBuildJobByIdQuery,
  ): Promise<GetBuildJobByIdResponseDto> {
    const buildJobDocument =
      await this.buildJobRepository.getBuildJobByIdOrThrow(
        query.configurationId,
        query.configurationRevisionId,
        query.buildJobId,
      );
    return {
      id: buildJobDocument.id,
      name: buildJobDocument.name,
      isPublic: buildJobDocument.isPublic,
      platforms: buildJobDocument.platforms,
      configurationId: buildJobDocument.configurationId,
      configurationRevisionId: buildJobDocument.configurationRevisionId,
    };
  }
}
