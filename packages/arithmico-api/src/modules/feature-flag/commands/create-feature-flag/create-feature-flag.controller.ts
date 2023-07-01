import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateFeatureFlagResponseDto } from './create-feature-flag.response.dto';
import { CreateFeatureFlagRequestBodyDto } from './create-feature-flag.request.body.dto';
import { CreateFeatureFlagCommand } from './create-feature-flag.command';

@Controller()
export class CreateFeatureFlagController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async createFeatureFlag(
    @Body() body: CreateFeatureFlagRequestBodyDto,
  ): Promise<CreateFeatureFlagResponseDto> {
    return this.commandBus.execute(
      new CreateFeatureFlagCommand(
        body.type,
        body.name,
        body.flag,
        body.enabledSinceVersionTagId,
      ),
    );
  }
}
