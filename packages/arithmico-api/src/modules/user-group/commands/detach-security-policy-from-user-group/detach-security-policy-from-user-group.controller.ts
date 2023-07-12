import { Controller, Delete, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DetachSecurityPolicyFromUserGroupResponseDto } from './detach-security-policy-from-user-group.response.dto';
import { DetachSecurityPolicyFromUserGroupRequestParamsDto } from './detach-security-policy-from-user-group.request.params.dto';
import { DetachSecurityPolicyFromUserGroupCommand } from './detach-security-policy-from-user-group.command';

@Controller(':groupId/security-policies/:policyId')
export class DetachSecurityPolicyFromUserGroupController {
  constructor(private commandBus: CommandBus) {}

  @Delete()
  async detachSecurityPolicyFromUserGroup(
    @Param() params: DetachSecurityPolicyFromUserGroupRequestParamsDto,
  ): Promise<DetachSecurityPolicyFromUserGroupResponseDto> {
    return this.commandBus.execute(
      new DetachSecurityPolicyFromUserGroupCommand(
        params.groupId,
        params.policyId,
      ),
    );
  }
}
