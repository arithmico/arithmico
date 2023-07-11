import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FeatureFlagRepository } from '../../../../infrastructure/database/repositories/feature-flag/feature-flag.repository';
import { CreateFeatureFlagCommand } from './create-feature-flag.command';
import { CreateFeatureFlagResponseDto } from './create-feature-flag.response.dto';

@CommandHandler(CreateFeatureFlagCommand)
export class CreateFeatureFlagHandler
  implements ICommandHandler<CreateFeatureFlagCommand>
{
  constructor(private featureFlagRepository: FeatureFlagRepository) {}

  async execute(
    command: CreateFeatureFlagCommand,
  ): Promise<CreateFeatureFlagResponseDto> {
    const result = await this.featureFlagRepository.createFeatureFlag(
      command.type,
      command.name,
      command.flag,
      command.enabledSinceVersionTagId,
    );

    return {
      id: result._id,
      type: result.type,
      name: result.name,
      flag: result.flag,
      enabledSinceVersionTagId: result.enabledSinceVersionTagId,
    };
  }
}
