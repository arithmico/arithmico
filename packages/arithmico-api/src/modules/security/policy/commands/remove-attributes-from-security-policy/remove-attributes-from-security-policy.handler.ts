import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SecurityPolicyRepository } from '../../../../../infrastructure/database/repositories/security-policy.repository';
import { RemoveAttributeFromSecurityPolicyCommand } from './remove-attributes-from-security-policy.command';
import { RemoveAttributeFromSecurityPolicyResponseDto } from './remove-attributes-from-security-policy.response.dto';

@CommandHandler(RemoveAttributeFromSecurityPolicyCommand)
export class RemoveAttributeFromSecurityPolicyHandler
  implements ICommandHandler<RemoveAttributeFromSecurityPolicyCommand>
{
  constructor(private securityPolicyRepository: SecurityPolicyRepository) {}

  async execute(
    command: RemoveAttributeFromSecurityPolicyCommand,
  ): Promise<RemoveAttributeFromSecurityPolicyResponseDto> {
    const updatedPolicy = await this.securityPolicyRepository.removeAttributes(
      command.policyId,
      command.attributes,
    );

    return {
      id: updatedPolicy._id,
      name: updatedPolicy.name,
      attributes: updatedPolicy.attributes,
    };
  }
}
