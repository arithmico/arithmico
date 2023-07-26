import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ConfigurationRepository } from '../../../../infrastructure/database/repositories/configuration/configuration.repository';
import { GetConfigurationRevisionByIdQuery } from './get-configuration-revision-by-id.query';
import { GetConfigurationRevisionByIdResponseDto } from './get-configuration-revision-by-id.response.dto';

@QueryHandler(GetConfigurationRevisionByIdQuery)
export class GetConfigurationRevisionByIdHandler
  implements IQueryHandler<GetConfigurationRevisionByIdQuery>
{
  constructor(
    private readonly configurationRepository: ConfigurationRepository,
  ) {}

  async execute(
    query: GetConfigurationRevisionByIdQuery,
  ): Promise<GetConfigurationRevisionByIdResponseDto> {
    const revisionDocument =
      await this.configurationRepository.getRevisionByConfigurationIdAndRevisionIdOrThrow(
        query.configurationId,
        query.revisionId,
      );

    return {
      id: revisionDocument._id,
      configurationId: revisionDocument.configurationId,
      revision: revisionDocument.revision,
    };
  }
}
