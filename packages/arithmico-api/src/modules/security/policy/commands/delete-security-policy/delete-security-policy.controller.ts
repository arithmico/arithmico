import { Controller, Delete, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DeleteSecurityPolicyCommand } from './delete-security-policy.command';
import { DeleteSecurityPolicyRequestPathDto } from './delete-security-policy.request.path.dto';

@Controller()
export class DeleteSecurityPolicyController {
  constructor(private commandBus: CommandBus) {}

  @Delete(':policyId')
  async deleteSecurityPolicy(
    @Param() params: DeleteSecurityPolicyRequestPathDto,
  ): Promise<void> {
    await this.commandBus.execute(
      new DeleteSecurityPolicyCommand(params.policyId),
    );
  }
}
