import { ConfigService } from '@nestjs/config';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserActivationRepository } from '../../../../infrastructure/database/repositories/user-activation/user-activation.repository';
import { UserRepository } from '../../../../infrastructure/database/repositories/user/user.repository';
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
    private configService: ConfigService,
  ) {}

  async execute(command: CreateUserCommand): Promise<CreateUserResponseDto> {
    const userDocument = await this.userRepository.create({
      username: command.username,
      email: command.email,
    });

    const userActivationDocument = await this.userActivationRepository.create(
      userDocument._id,
    );

    this.eventBus.publish(
      new SendActivationEmailEvent(
        command.email,
        command.username,
        `${this.configService.getOrThrow('app.frontendBaseUrl')}/activate/${
          userActivationDocument._id
        }`,
      ),
    );

    return {
      username: userDocument.username,
      id: userDocument.id,
      createdAt: userDocument.createdAt,
    };
  }
}
