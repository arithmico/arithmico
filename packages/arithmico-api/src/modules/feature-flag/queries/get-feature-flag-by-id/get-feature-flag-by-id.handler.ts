import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { FeatureFlagRepository } from '../../../../infrastructure/database/repositories/feature-flag/feature-flag.repository';
import { GetFeatureFlagByIdQuery } from './get-feature-flag-by-id.query';
import { GetFeatureFlagByIdResponseDto } from './get-feature-flag-by-id.response.dto';

@QueryHandler(GetFeatureFlagByIdQuery)
export class GetFeatureFlagByIdHandler
  implements IQueryHandler<GetFeatureFlagByIdQuery>
{
  constructor(private featureFlagRepository: FeatureFlagRepository) {}

  async execute(
    query: GetFeatureFlagByIdQuery,
  ): Promise<GetFeatureFlagByIdResponseDto> {
    const featureFlag =
      await this.featureFlagRepository.getFeatureFlagByIdOrThrow(query.flagId);

    return {
      id: featureFlag._id,
      flag: featureFlag.flag,
      type: featureFlag.type,
      name: featureFlag.name,
      enabledSinceVersion: featureFlag.enabledSinceVersion,
      disabledSinceVersion: featureFlag.disabledSinceVersion,
    };
  }
}
