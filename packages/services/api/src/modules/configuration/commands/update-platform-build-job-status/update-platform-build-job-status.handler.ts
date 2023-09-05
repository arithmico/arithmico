import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BuildJobRepository } from '../../../../infrastructure/database/repositories/build-job/build-job.repository';
import { UpdatePlatformBuildJobStatusCommand } from './update-platform-build-job-status.command';

@CommandHandler(UpdatePlatformBuildJobStatusCommand)
export class UpdatePlatformBuildJobStatusHandler
  implements ICommandHandler<UpdatePlatformBuildJobStatusCommand>
{
  constructor(private readonly buildJobRepository: BuildJobRepository) {}

  async execute(command: UpdatePlatformBuildJobStatusCommand): Promise<void> {
    await this.buildJobRepository.updatePlatformBuildJob(
      command.platform,
      command.webhookToken,
      command.buildJobId,
      command.configurationId,
      command.configurationRevisionId,
      command.status,
      command.artifactUrl,
    );
  }
}
