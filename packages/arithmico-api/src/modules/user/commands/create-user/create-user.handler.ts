import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../../infrastructure/database/repositories/user.repository';
import { SendActivationEmailEvent } from '../../../email/events/send-acitvation-email/send-activation-email.event';
import { CreateUserCommand } from './create-user.command';
import { CreateUserResponseDto } from './create-user.response.dto';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    private userRepository: UserRepository,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand): Promise<CreateUserResponseDto> {
    const result = await this.userRepository.create({
      username: command.username,
      email: command.email,
    });

    this.eventBus.publish(
      new SendActivationEmailEvent(command.email, command.username, '<url>'),
    );

    return { username: result.username };
  }
}
