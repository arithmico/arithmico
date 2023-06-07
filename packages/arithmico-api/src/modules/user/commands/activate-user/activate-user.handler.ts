import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserActivationRepository } from '../../../../infrastructure/database/repositories/user-activation/user-activation.repository';
import { UserRepository } from '../../../../infrastructure/database/repositories/user/user.repository';
import { ActivateUserCommand } from './activate-user.command';
import * as bcrypt from 'bcrypt';
import { ActivateUserResponseDto } from './activate-user.response.dto';

@CommandHandler(ActivateUserCommand)
export class ActivateUserCommandHandler
  implements ICommandHandler<ActivateUserCommand>
{
  constructor(
    private userActivationRepository: UserActivationRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(
    command: ActivateUserCommand,
  ): Promise<ActivateUserResponseDto> {
    const { userId } = await this.userActivationRepository.findAndDelete(
      command.activationId,
    );
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(command.password, salt);
    await this.userRepository.setPasswordHash(userId, hash);
    const userDocument = await this.userRepository.activateUserOrThrow(userId);
    return { userId: userDocument._id };
  }
}
