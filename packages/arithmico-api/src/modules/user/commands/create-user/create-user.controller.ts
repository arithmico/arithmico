import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { CreateUserRequestDto } from './create-user.request.dto';

@Controller()
export class CreateUserController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async createUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    return this.commandBus.execute(
      new CreateUserCommand(
        createUserRequestDto.username,
        createUserRequestDto.email,
      ),
    );
  }
}
