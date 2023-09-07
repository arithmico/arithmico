import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BuildJobRepository } from '../../../../infrastructure/database/repositories/build-job/build-job.repository';
import { PublishBuildJobCommand } from './publish-build-job.command';

@CommandHandler(PublishBuildJobCommand)
export class PublishBuildJobHandler
  implements ICommandHandler<PublishBuildJobCommand>
{
  constructor(private readonly buildJobRepository: BuildJobRepository) {}

  async execute(command: PublishBuildJobCommand): Promise<void> {
    await this.buildJobRepository.publishBuildJobOrThrow(
      command.configurationId,
      command.configurationRevisionId,
      command.buildJobId,
    );
  }
}
