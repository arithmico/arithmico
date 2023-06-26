import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SecurityPolicyRepository } from '../../../../infrastructure/database/repositories/security-policy/security-policy.repository';
import { CreateSecurityPolicyCommand } from './create-security-policy.command';
import { CreateSecurityPolicyResponseDto } from './create-security-policy.response.dto';

@CommandHandler(CreateSecurityPolicyCommand)
export class CreateSecurityPolicyHandler
  implements ICommandHandler<CreateSecurityPolicyCommand>
{
  constructor(private securityPolicyRepository: SecurityPolicyRepository) {}

  async execute(
    command: CreateSecurityPolicyCommand,
  ): Promise<CreateSecurityPolicyResponseDto> {
    const newPolicy = await this.securityPolicyRepository.create(
      command.name,
      command.attributes,
      false,
    );

    return {
      id: newPolicy._id,
      name: newPolicy.name,
      readonly: newPolicy.readonly,
      attributes: newPolicy.attributes,
      createdAt: newPolicy.createdAt,
    };
  }
}
