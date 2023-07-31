import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FeatureFlagRepository } from '../../../../infrastructure/database/repositories/feature-flag/feature-flag.repository';
import { UpdateFeatureFlagCommand } from './update-feature-flag.command';
import { UpdateFeatureFlagResponseDto } from './update-feature-flag.response.dto';

@CommandHandler(UpdateFeatureFlagCommand)
export class UpdateFeatureFlagHandler
  implements ICommandHandler<UpdateFeatureFlagCommand>
{
  constructor(private readonly featureFlagRepository: FeatureFlagRepository) {}

  async execute(
    command: UpdateFeatureFlagCommand,
  ): Promise<UpdateFeatureFlagResponseDto> {
    const featureFlag =
      await this.featureFlagRepository.updateFeatureFlagOrThrow(
        command.flagId,
        command.name,
        command.disabledSinceVersionTagId,
      );

    return {
      id: featureFlag._id,
      name: featureFlag.name,
      flag: featureFlag.flag,
      type: featureFlag.type,
      enabledSinceVersionTagId: featureFlag.enabledSinceVersionTagId,
      disabledSinceVersionTagId: featureFlag.disabledSinceVersionTagId,
    };
  }
}
