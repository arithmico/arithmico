import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SecurityPolicyRepository } from '../../../../infrastructure/database/repositories/security-policy/security-policy.repository';
import { AttachSecurityPolicyToUserGroupCommand } from './attach-security-policy-to-user-group.command';
import { AttachSecurityPolicyToUserGroupResponseDto } from './attach-security-policy-to-user-group.response.dto';

@CommandHandler(AttachSecurityPolicyToUserGroupCommand)
export class AttachSecurityPolicyToUserGroupHandler
  implements ICommandHandler<AttachSecurityPolicyToUserGroupCommand>
{
  constructor(private securityPolicyRepository: SecurityPolicyRepository) {}

  async execute(
    command: AttachSecurityPolicyToUserGroupCommand,
  ): Promise<AttachSecurityPolicyToUserGroupResponseDto> {
    const result =
      await this.securityPolicyRepository.attachSecurityPolicyToUserGroup(
        command.policyId,
        command.groupId,
      );

    return {
      securityPolicyId: result.policyId,
      userGroupId: result.attachedToId,
    };
  }
}
