import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfigurationRepository } from '../../../../infrastructure/database/repositories/configuration/configuration.repository';
import { CreateConfigurationRevisionCommand } from './create-configuration-revision.command';
import { CreateConfigurationRevisionResponseDto } from './create-configuration-revision.response.dto';

@CommandHandler(CreateConfigurationRevisionCommand)
export class CreateConfigurationRevisionHandler
  implements ICommandHandler<CreateConfigurationRevisionCommand>
{
  constructor(
    private readonly configurationRepository: ConfigurationRepository,
  ) {}

  async execute(
    command: CreateConfigurationRevisionCommand,
  ): Promise<CreateConfigurationRevisionResponseDto> {
    const revisionDocument =
      await this.configurationRepository.createConfigurationRevision(
        command.configurationId,
        command.featureFlagIds,
        command.minimumVersionTagId,
      );

    return { id: revisionDocument._id };
  }
}
