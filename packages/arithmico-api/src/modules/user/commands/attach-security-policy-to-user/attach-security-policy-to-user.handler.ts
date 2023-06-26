import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SecurityPolicyRepository } from '../../../../infrastructure/database/repositories/security-policy/security-policy.repository';
import { AttachSecurityPolicyToUserCommand } from './attach-security-policy-to-user.command';
import { AttachSecurityPolicyToUserResponseDto } from './attach-security-policy-to-user.response.dto';

@CommandHandler(AttachSecurityPolicyToUserCommand)
export class AttachSecurityPolicytouserHandler
  implements ICommandHandler<AttachSecurityPolicyToUserCommand>
{
  constructor(private securityPolicyRepository: SecurityPolicyRepository) {}

  async execute(
    command: AttachSecurityPolicyToUserCommand,
  ): Promise<AttachSecurityPolicyToUserResponseDto> {
    const attachment =
      await this.securityPolicyRepository.attachSecurityPolicyToUser(
        command.policyId,
        command.userId,
      );

    return {
      policyId: attachment.policyId,
      userId: attachment.attachedToId,
    };
  }
}
