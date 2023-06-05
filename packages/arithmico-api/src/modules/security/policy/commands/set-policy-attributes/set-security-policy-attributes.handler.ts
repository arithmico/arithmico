import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SecurityPolicyRepository } from '../../../../../infrastructure/database/repositories/security-policy.repository';
import { SetSecurityPolicyAttributesCommand } from './set-security-policy-attributes.command';
import { SetSecurityPolicyAttributesResponseDto } from './set-security-policy-attributes.response.dto';

@CommandHandler(SetSecurityPolicyAttributesCommand)
export class SetSecurityPolicyAttributesHandler
  implements ICommandHandler<SetSecurityPolicyAttributesCommand>
{
  constructor(private securityPolicyRepository: SecurityPolicyRepository) {}

  async execute(
    command: SetSecurityPolicyAttributesCommand,
  ): Promise<SetSecurityPolicyAttributesResponseDto> {
    const securityPolicyDocument =
      await this.securityPolicyRepository.setAttributesOrThrow(
        command.policyId,
        command.attributes,
      );

    return {
      id: securityPolicyDocument._id,
      name: securityPolicyDocument.name,
      attributes: securityPolicyDocument.attributes,
    };
  }
}
