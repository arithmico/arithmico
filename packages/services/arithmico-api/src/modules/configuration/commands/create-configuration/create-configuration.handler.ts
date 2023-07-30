import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfigurationRepository } from '../../../../infrastructure/database/repositories/configuration/configuration.repository';
import { CreateConfigurationCommand } from './create-configuration.command';
import { CreateConfigurationResponseDto } from './create-configuration.response.dto';

@CommandHandler(CreateConfigurationCommand)
export class CreateConfigurationHandler
  implements ICommandHandler<CreateConfigurationCommand>
{
  constructor(
    private readonly configurationRepository: ConfigurationRepository,
  ) {}

  async execute(
    command: CreateConfigurationCommand,
  ): Promise<CreateConfigurationResponseDto> {
    const configurationDocument =
      await this.configurationRepository.createConfiguration(
        command.name,
        command.autoBuild,
      );
    return { id: configurationDocument._id };
  }
}
