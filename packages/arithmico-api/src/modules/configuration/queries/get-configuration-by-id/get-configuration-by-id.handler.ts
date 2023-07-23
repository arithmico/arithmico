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
    const configurationDocument =
      await this.configurationRepository.getConfigurationByIdOrThrow(
        query.configurationId,
      );
    return {
      id: configurationDocument._id,
      name: configurationDocument.name,
      autoBuild: configurationDocument.autoBuild,
      revisions: configurationDocument.revisions,
    };
  }
}
