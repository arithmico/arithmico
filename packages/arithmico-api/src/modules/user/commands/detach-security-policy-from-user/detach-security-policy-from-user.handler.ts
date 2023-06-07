import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SecurityPolicyRepository } from '../../../../infrastructure/database/repositories/security-policy/security-policy.repository';
import { DetachSecurityPolicyFromUserCommand } from './detach-security-policy-from-user.command';

@CommandHandler(DetachSecurityPolicyFromUserCommand)
export class DetachSecurityPolicyFromUserHandler
  implements ICommandHandler<DetachSecurityPolicyFromUserCommand>
{
  constructor(private securityPolicyRepository: SecurityPolicyRepository) {}

  async execute(command: DetachSecurityPolicyFromUserCommand): Promise<void> {
    await this.securityPolicyRepository.detachFromUser(
      command.policyId,
      command.userId,
    );
  }
}
