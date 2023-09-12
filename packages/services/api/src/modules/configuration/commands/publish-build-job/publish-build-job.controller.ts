import { Controller, Post, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { PublishBuildJobCommand } from './publish-build-job.command';
import { PublishBuildJobRequestParamsDto } from './publish-build-job.request.params.dto';

@Controller(
  ':configurationId/revisions/:configurationRevisionId/build-jobs/:buildJobId/publish',
)
export class PublishBuildJobController {
  constructor(private commandBus: CommandBus) {}

  @SecurityAttributes(SecurityAttribute.BuildJobWrite)
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
