import { Controller, Param, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AttachSecurityPolicyToUserCommand } from './attach-security-policy-to-user.command';
import { AttachSecurityPolicyToUserRequestDto } from './attach-security-policy-to-user.request.dto';
import { AttachSecurityPolicyToUserResponseDto } from './attach-security-policy-to-user.response.dto';

@Controller()
export class AttachSecurityPolicyToUserController {
  constructor(private commandBus: CommandBus) {}

  @Put(':userId/security-policies/:policyId')
  async attachSecurityPolicyToUser(
    @Param() params: AttachSecurityPolicyToUserRequestDto,
  ): Promise<AttachSecurityPolicyToUserResponseDto> {
    return this.commandBus.execute(
      new AttachSecurityPolicyToUserCommand(params.userId, params.policyId),
    );
  }
}
