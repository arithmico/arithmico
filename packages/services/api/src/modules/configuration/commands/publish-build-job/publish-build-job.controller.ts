import { Controller, Post, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { PublishBuildJobCommand } from './publish-build-job.command';
import { PublishBuildJobRequestParamsDto } from './publish-build-job.request.params.dto';

@Controller(
  ':configurationId/revisions/:configurationRevisionId/build-jobs/:buildJobId/publish',
)
export class PublishBuildJobController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async publishBuildJob(
    @Param() params: PublishBuildJobRequestParamsDto,
  ): Promise<void> {
    return this.commandBus.execute(
      new PublishBuildJobCommand(
        params.configurationId,
        params.configurationRevisionId,
        params.buildJobId,
      ),
    );
  }
}
