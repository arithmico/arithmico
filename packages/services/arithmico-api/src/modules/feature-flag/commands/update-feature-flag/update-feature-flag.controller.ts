import { Controller, Patch, Param, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateFeatureFlagResponseDto } from './update-feature-flag.response.dto';
import { UpdateFeatureFlagRequestBodyDto } from './update-feature-flag.request.body.dto';
import { UpdateFeatureFlagRequestParamsDto } from './update-feature-flag.request.params.dto';
import { UpdateFeatureFlagCommand } from './update-feature-flag.command';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';

@Controller(':flagId')
export class UpdateFeatureFlagController {
  constructor(private commandBus: CommandBus) {}

  @SecurityAttributes(SecurityAttribute.FeatureFlagsWrite)
  @Patch()
  async updateFeatureFlag(
    @Param() params: UpdateFeatureFlagRequestParamsDto,
    @Body() body: UpdateFeatureFlagRequestBodyDto,
  ): Promise<UpdateFeatureFlagResponseDto> {
    return this.commandBus.execute(
      new UpdateFeatureFlagCommand(
        params.flagId,
        body.name,
        body.disabledSinceVersionTagId,
      ),
    );
  }
}
