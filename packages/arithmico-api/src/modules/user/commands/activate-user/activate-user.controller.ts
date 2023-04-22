import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ActivateUserCommand } from './activate-user.command';
import { ActivateUserRequestDto } from './activate-user.request.dto';
import { ActivateUserResponseDto } from './activate-user.response.dto';

@Controller('/activate')
export class ActivateUserController {
  constructor(private commandBus: CommandBus) {}

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
