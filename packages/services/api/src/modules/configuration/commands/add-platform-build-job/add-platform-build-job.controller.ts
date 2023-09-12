import { Controller, Post, Param, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Public } from '../../../../decorators/public.decorator';
import { AddPlatformBuildJobCommand } from './add-platform-build-job.command';
import { AddPlatformBuildJobRequestBodyDto } from './add-platform-build-job.request.body.dto';
import { AddPlatformBuildJobRequestParamsDto } from './add-platform-build-job.request.params.dto';

@Controller(
  ':configurationId/revisions/:configurationRevisionId/build-jobs/:buildJobId/platforms',
)
export class AddPlatformBuildJobController {
  constructor(private commandBus: CommandBus) {}

  @Public()
  @Post()
  async addPlatformBuildJob(
    @Param() params: AddPlatformBuildJobRequestParamsDto,
    @Body() body: AddPlatformBuildJobRequestBodyDto,
  ): Promise<void> {
    await this.commandBus.execute(
      new AddPlatformBuildJobCommand(
        params.configurationId,
        params.configurationRevisionId,
        params.buildJobId,
        body.platform,
        body.webhookToken,
      ),
    );
  }
}
