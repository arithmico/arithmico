import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SecurityPolicyRepository } from '../../../../../infrastructure/database/repositories/security-policy.repository';
import { AddAttributesToSecurityPolicyCommand } from './add-attributes-to-security-policy.command';
import { AddAttributesToSecurityPolicyResponseDto } from './add-attributes-to-security-policy.response.dto';

@CommandHandler(AddAttributesToSecurityPolicyCommand)
export class AddAttributesToSecurityPolicyHandler
  implements ICommandHandler<AddAttributesToSecurityPolicyCommand>
{
  constructor(private securityPolicyRepository: SecurityPolicyRepository) {}

  async execute(
    command: AddAttributesToSecurityPolicyCommand,
  ): Promise<AddAttributesToSecurityPolicyResponseDto> {
    const policy = await this.securityPolicyRepository.addAttributes(
      command.policyId,
      command.attributes,
    );

    return {
      id: policy._id,
      name: policy.name,
      attributes: policy.attributes,
    };
  }
}
