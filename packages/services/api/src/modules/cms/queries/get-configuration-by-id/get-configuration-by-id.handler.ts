import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ConfigurationRepository } from '../../../../infrastructure/database/repositories/configuration/configuration.repository';
import { GetConfigurationByIdQuery } from './get-configuration-by-id.query';
import { GetConfigurationByIdResponseDto } from './get-configuration-by-id.response.dto';

@QueryHandler(GetConfigurationByIdQuery)
export class GetConfigurationByIdHandler
  implements IQueryHandler<GetConfigurationByIdQuery>
{
  constructor(
    private readonly configurationRepository: ConfigurationRepository,
  ) {}

  async execute(
    query: GetConfigurationByIdQuery,
  ): Promise<GetConfigurationByIdResponseDto> {
    const configurationDetailsDocument =
      await this.configurationRepository.getPublicConfigurationByIdOrThrow(
        query.configurationId,
      );

    return {
      id: configurationDetailsDocument.id,
      name: configurationDetailsDocument.name,
      buildJobs: configurationDetailsDocument.buildJobs.map((buildJob) => ({
        buildJobId: buildJob.buildJobId,
        revision: buildJob.revision,
        version: {
          major: buildJob.version.major,
          minor: buildJob.version.minor,
          patch: buildJob.version.patch,
        },
        platforms: buildJob.platforms.map((platform) => ({
          platform: platform.platform,
          artifactUrl: platform.artifactUrl,
        })),
      })),
    };
  }
}
