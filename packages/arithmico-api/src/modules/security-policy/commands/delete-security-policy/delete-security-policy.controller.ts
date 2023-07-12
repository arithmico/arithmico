import { Controller, Delete, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { DeleteSecurityPolicyCommand } from './delete-security-policy.command';
import { DeleteSecurityPolicyRequestPathDto } from './delete-security-policy.request.path.dto';

@Controller()
export class DeleteSecurityPolicyController {
  constructor(private commandBus: CommandBus) {}

  @Delete(':policyId')
  @SecurityAttributes(SecurityAttribute.SecurityPoliciesWrite)
  async deleteSecurityPolicy(
    @Param() params: DeleteSecurityPolicyRequestPathDto,
  ): Promise<void> {
    await this.commandBus.execute(
      new DeleteSecurityPolicyCommand(params.policyId),
    );
  }
}
