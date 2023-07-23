import { Controller, Post, Param, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateConfigurationRevisionResponseDto } from './create-configuration-revision.response.dto';
import { CreateConfigurationRevisionRequestBodyDto } from './create-configuration-revision.request.body.dto';
import { CreateConfigurationRevisionRequestParamsDto } from './create-configuration-revision.request.params.dto';
import { CreateConfigurationRevisionCommand } from './create-configuration-revision.command';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';

@Controller(':configurationId/revisions')
export class CreateConfigurationRevisionController {
  constructor(private commandBus: CommandBus) {}

  @SecurityAttributes(SecurityAttribute.ConfigurationRevisionsWrite)
  @Post()
  async createConfigurationRevision(
    @Param() params: CreateConfigurationRevisionRequestParamsDto,
    @Body() body: CreateConfigurationRevisionRequestBodyDto,
  ): Promise<CreateConfigurationRevisionResponseDto> {
    return this.commandBus.execute(
      new CreateConfigurationRevisionCommand(
        params.configurationId,
        body.minimumVersionTagId,
        body.featureFlagIds,
      ),
    );
  }
}
