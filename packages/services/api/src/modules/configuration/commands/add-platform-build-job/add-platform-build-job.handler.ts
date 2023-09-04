import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BuildJobRepository } from '../../../../infrastructure/database/repositories/build-job/build-job.repository';
import { AddPlatformBuildJobCommand } from './add-platform-build-job.command';

@CommandHandler(AddPlatformBuildJobCommand)
export class AddPlatformBuildJobHandler
  implements ICommandHandler<AddPlatformBuildJobCommand>
{
  constructor(private readonly buildJobRepository: BuildJobRepository) {}

  async execute(command: AddPlatformBuildJobCommand): Promise<void> {
    await this.buildJobRepository.addPlatformBuildJobOrThrow(
      command.platform,
      command.webhookToken,
      command.buildJobId,
      command.configurationId,
      command.configurationRevisionId,
    );
  }
}
