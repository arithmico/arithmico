import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ConfigurationRepository } from '../../../../infrastructure/database/repositories/configuration/configuration.repository';
import { GetConfigurationRevisionJsonExportQuery } from './get-configuration-revision-json-export.query';
import { GetConfigurationRevisionJsonExportResponseDto } from './get-configuration-revision-json-export.response.dto';

@QueryHandler(GetConfigurationRevisionJsonExportQuery)
export class GetConfigurationRevisionJsonExportHandler
  implements IQueryHandler<GetConfigurationRevisionJsonExportQuery>
{
  constructor(
    private readonly configurationRepository: ConfigurationRepository,
  ) {}

  async execute(
    query: GetConfigurationRevisionJsonExportQuery,
  ): Promise<GetConfigurationRevisionJsonExportResponseDto> {
    const configuration =
      await this.configurationRepository.getConfigurationByIdOrThrow(
        query.configurationId,
      );
    const revision =
      await this.configurationRepository.getRevisionByConfigurationIdAndRevisionIdOrThrow(
        query.configurationId,
        query.revisionId,
      );
    const features =
      await this.configurationRepository.aggregateFeatureFlagsByType(
        query.configurationId,
        query.revisionId,
      );

    return {
      data: {
        constants: features.constants,
        functions: features.functions,
        operators: features.operators,
        methods: features.methods,
        types: features.types,
      },
      filename: `${configuration.name}-revision-${revision.revision}.json`,
    };
  }
}
