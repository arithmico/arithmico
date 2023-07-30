import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Public } from '../../../../decorators/public.decorator';
import { ActivateUserCommand } from './activate-user.command';
import { ActivateUserRequestDto } from './activate-user.request.dto';
import { ActivateUserResponseDto } from './activate-user.response.dto';

@Controller('/activate')
export class ActivateUserController {
  constructor(private commandBus: CommandBus) {}

  @Public()
  @HttpCode(200)
  @Post()
  async activateUser(
    @Body() activateUserRequestDto: ActivateUserRequestDto,
  ): Promise<ActivateUserResponseDto> {
    return this.commandBus.execute(
      new ActivateUserCommand(
        activateUserRequestDto.activationId,
        activateUserRequestDto.password,
      ),
    );
  }
}
