import { Controller, Delete, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { DetachSecurityPolicyFromUserCommand } from './detach-security-policy-from-user.command';
import { DetachSecurityPolicyFromUserRequestDto } from './detach-security-policy-from-user.request.dto';

@Controller()
export class DetachSecurityPolicyFromUserController {
  constructor(private commandBus: CommandBus) {}

  @Delete(':userId/security-policies/:policyId')
  @SecurityAttributes(
    SecurityAttribute.SecurityPoliciesWrite,
    SecurityAttribute.UsersWrite,
  )
  async detachSecurityPolicyFromUser(
    @Param() params: DetachSecurityPolicyFromUserRequestDto,
  ): Promise<void> {
    await this.commandBus.execute(
      new DetachSecurityPolicyFromUserCommand(params.userId, params.policyId),
    );
  }
}
