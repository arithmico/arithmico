import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SecurityPolicyRepository } from '../../../../../infrastructure/database/repositories/security-policy/security-policy.repository';
import { DeleteSecurityPolicyCommand } from './delete-security-policy.command';

@CommandHandler(DeleteSecurityPolicyCommand)
export class DeleteSecurityPolicyHandler
  implements ICommandHandler<DeleteSecurityPolicyCommand>
{
  constructor(private securityPolicyRepository: SecurityPolicyRepository) {}

  async execute(command: DeleteSecurityPolicyCommand): Promise<void> {
    await this.securityPolicyRepository.delete(command.policyId);
  }
}
