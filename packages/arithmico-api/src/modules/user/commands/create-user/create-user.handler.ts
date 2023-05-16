import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserActivationRepository } from '../../../../infrastructure/database/repositories/user-activation.repository';
import { UserRepository } from '../../../../infrastructure/database/repositories/user.repository';
import { SendActivationEmailEvent } from '../../../backoffice/email/events/send-acitvation-email/send-activation-email.event';
import { CreateUserCommand } from './create-user.command';
import { CreateUserResponseDto } from './create-user.response.dto';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    private userRepository: UserRepository,
    private userActivationRepository: UserActivationRepository,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand): Promise<CreateUserResponseDto> {
    const user = await this.userRepository.create({
      username: command.username,
      email: command.email,
    });

    const userActivationDocument = await this.userActivationRepository.create(
      user._id,
    );

    this.eventBus.publish(
      new SendActivationEmailEvent(
        command.email,
        command.username,
        userActivationDocument._id,
      ),
    );

    return { username: user.username };
  }
}
