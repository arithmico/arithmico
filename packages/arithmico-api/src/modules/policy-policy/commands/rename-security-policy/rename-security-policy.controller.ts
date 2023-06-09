import { Body, Controller, Param, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { RenameSecurityPolicyCommand } from './rename-security-policy.command';
import { RenameSecurityPolicyRequestBodyDto } from './rename-security-policy.request.body.dto';
import { RenameSecurityPolicyRequestPathDto } from './rename-security-policy.request.path.dto';
import { RenameSecurityPolicyResponseDto } from './rename-security-policy.response.dto';

@Controller(':policyId/name')
export class RenameSecurityPolicyController {
  constructor(private commandBus: CommandBus) {}

  @Put()
  @SecurityAttributes(SecurityAttribute.SecurityPoliciesWrite)
  async renameSecurityPolicy(
    @Param() params: RenameSecurityPolicyRequestPathDto,
    @Body() body: RenameSecurityPolicyRequestBodyDto,
  ): Promise<RenameSecurityPolicyResponseDto> {
    return this.commandBus.execute(
      new RenameSecurityPolicyCommand(params.policyId, body.name),
    );
  }
}
