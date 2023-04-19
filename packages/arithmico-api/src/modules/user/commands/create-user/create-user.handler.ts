import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../../infrastructure/database/repositories/user.repository';
import { CreateUserCommand } from './create-user.command';
import { CreateUserResponseDto } from './create-user.response.dto';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(private userRepository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<CreateUserResponseDto> {
    const result = await this.userRepository.create({
      username: command.username,
      email: command.email,
    });

    return { username: result.username };
  }
}
