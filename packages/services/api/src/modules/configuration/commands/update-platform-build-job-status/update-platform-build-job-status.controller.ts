import { Controller, Put, Param, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Public } from '../../../../decorators/public.decorator';
import { UpdatePlatformBuildJobStatusCommand } from './update-platform-build-job-status.command';
import { UpdatePlatformBuildJobStatusRequestBodyDto } from './update-platform-build-job-status.request.body.dto';
import { UpdatePlatformBuildJobStatusRequestParamsDto } from './update-platform-build-job-status.request.params.dto';

@Controller(
  ':configurationId/revisions/:revisionId/build-jobs/:buildJobId/platforms',
)
export class UpdatePlatformBuildJobStatusController {
  constructor(private commandBus: CommandBus) {}

  @Public()
  @Put()
  async updatePlatformBuildJobStatus(
    @Param() params: UpdatePlatformBuildJobStatusRequestParamsDto,
    @Body() body: UpdatePlatformBuildJobStatusRequestBodyDto,
  ): Promise<void> {
    await this.commandBus.execute(
      new UpdatePlatformBuildJobStatusCommand(
        params.configurationId,
        params.configurationRevisionId,
        params.buildJobId,
        body.platform,
        body.webhookToken,
        body.status,
      ),
    );
  }
}
