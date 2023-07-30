import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SecurityPolicyRepository } from '../../../../infrastructure/database/repositories/security-policy/security-policy.repository';
import { DetachSecurityPolicyFromUserGroupCommand } from './detach-security-policy-from-user-group.command';
import { DetachSecurityPolicyFromUserGroupResponseDto } from './detach-security-policy-from-user-group.response.dto';

@CommandHandler(DetachSecurityPolicyFromUserGroupCommand)
export class DetachSecurityPolicyFromUserGroupHandler
  implements ICommandHandler<DetachSecurityPolicyFromUserGroupCommand>
{
  constructor(private securityPolicyRepository: SecurityPolicyRepository) {}

  async execute(
    command: DetachSecurityPolicyFromUserGroupCommand,
  ): Promise<DetachSecurityPolicyFromUserGroupResponseDto> {
    await this.securityPolicyRepository.detachSecurityPolicyFromUserGroup(
      command.policyId,
      command.groupId,
    );

    return {
      securityPolicyId: command.policyId,
      userGroupId: command.groupId,
    };
  }
}
