import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateConfigurationResponseDto } from './create-configuration.response.dto';
import { CreateConfigurationRequestBodyDto } from './create-configuration.request.body.dto';
import { CreateConfigurationCommand } from './create-configuration.command';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';

@Controller()
export class CreateConfigurationController {
  constructor(private commandBus: CommandBus) {}

  @SecurityAttributes(SecurityAttribute.ConfigurationsWrite)
  @Post()
  async createConfiguration(
    @Body() body: CreateConfigurationRequestBodyDto,
  ): Promise<CreateConfigurationResponseDto> {
    return this.commandBus.execute(
      new CreateConfigurationCommand(body.name, body.autoBuild),
    );
  }
}
