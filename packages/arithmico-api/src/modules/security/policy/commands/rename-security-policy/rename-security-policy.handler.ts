import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SecurityPolicyRepository } from '../../../../../infrastructure/database/repositories/security-policy/security-policy.repository';
import { RenameSecurityPolicyCommand } from './rename-security-policy.command';
import { RenameSecurityPolicyResponseDto } from './rename-security-policy.response.dto';

@CommandHandler(RenameSecurityPolicyCommand)
export class RenameSecurityPolicyHandler
  implements ICommandHandler<RenameSecurityPolicyCommand>
{
  constructor(private securityPolicyRepository: SecurityPolicyRepository) {}

  async execute(
    command: RenameSecurityPolicyCommand,
  ): Promise<RenameSecurityPolicyResponseDto> {
    const secuirtyPolicyDocument =
      await this.securityPolicyRepository.setNameOrThrow(
        command.policyId,
        command.name,
      );

    return {
      id: secuirtyPolicyDocument._id,
      name: secuirtyPolicyDocument.name,
      readonly: secuirtyPolicyDocument.readonly,
      attributes: secuirtyPolicyDocument.attributes,
    };
  }
}
