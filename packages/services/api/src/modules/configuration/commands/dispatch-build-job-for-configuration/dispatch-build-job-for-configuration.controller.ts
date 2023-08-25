import { Controller, Post, Param, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DispatchBuildJobForConfigurationResponseDto } from './dispatch-build-job-for-configuration.response.dto';
import { DispatchBuildJobForConfigurationRequestBodyDto } from './dispatch-build-job-for-configuration.request.body.dto';
import { DispatchBuildJobForConfigurationRequestParamsDto } from './dispatch-build-job-for-configuration.request.params.dto';
import { DispatchBuildJobForConfigurationCommand } from './dispatch-build-job-for-configuration.command';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';

@Controller(':configurationId/build-jobs')
export class DispatchBuildJobForConfigurationController {
  constructor(private commandBus: CommandBus) {}

  @SecurityAttributes(SecurityAttribute.BuildJobWrite)
  @Post()
  async dispatchBuildJobForConfiguration(
    @Param() params: DispatchBuildJobForConfigurationRequestParamsDto,
    @Body() body: DispatchBuildJobForConfigurationRequestBodyDto,
  ): Promise<DispatchBuildJobForConfigurationResponseDto> {
    return this.commandBus.execute(
      new DispatchBuildJobForConfigurationCommand(
        params.configurationId,
        body.configurationRevisionId,
        body.versionTagId,
      ),
    );
  }
}
