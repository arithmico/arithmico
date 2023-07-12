import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SecurityPolicyRepository } from '../../../../infrastructure/database/repositories/security-policy/security-policy.repository';
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
      await this.securityPolicyRepository.setSecurityPolicyAttributesOrThrow(
        command.policyId,
        command.attributes,
      );

    return {
      id: securityPolicyDocument._id,
      name: securityPolicyDocument.name,
      readonly: securityPolicyDocument.readonly,
      attributes: securityPolicyDocument.attributes,
      createdAt: securityPolicyDocument.createdAt,
    };
  }
}
