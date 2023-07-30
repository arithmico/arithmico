import { Controller, Put, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AttachSecurityPolicyToUserGroupResponseDto } from './attach-security-policy-to-user-group.response.dto';
import { AttachSecurityPolicyToUserGroupRequestParamsDto } from './attach-security-policy-to-user-group.request.params.dto';
import { AttachSecurityPolicyToUserGroupCommand } from './attach-security-policy-to-user-group.command';

@Controller(':groupId/security-policies/:policyId')
export class AttachSecurityPolicyToUserGroupController {
  constructor(private commandBus: CommandBus) {}

  @Put()
  async attachSecurityPolicyToUserGroup(
    @Param() params: AttachSecurityPolicyToUserGroupRequestParamsDto,
  ): Promise<AttachSecurityPolicyToUserGroupResponseDto> {
    return this.commandBus.execute(
      new AttachSecurityPolicyToUserGroupCommand(
        params.groupId,
        params.policyId,
      ),
    );
  }
}
