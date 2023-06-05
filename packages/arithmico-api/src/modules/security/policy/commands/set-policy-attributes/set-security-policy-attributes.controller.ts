import { Body, Controller, Param, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SecurityAttribute } from '../../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../../decorators/security-attributes.decorator';
import { SetSecurityPolicyAttributesCommand } from './set-security-policy-attributes.command';
import { SetSecurityPolicyAttributesRequestBodyDto } from './set-security-policy-attributes.request.body.dto';
import { SetSecurityPolicyAttributesRequestPathDto } from './set-security-policy-attributes.request.path.dto';
import { SetSecurityPolicyAttributesResponseDto } from './set-security-policy-attributes.response.dto';

@Controller(':policyId/attributes')
export class SetSecurityPolicyAttributesController {
  constructor(private commandBus: CommandBus) {}

  @Put()
  @SecurityAttributes(SecurityAttribute.SecurityPoliciesWrite)
  async setSecurityPolicyAttributes(
    @Param() params: SetSecurityPolicyAttributesRequestPathDto,
    @Body() body: SetSecurityPolicyAttributesRequestBodyDto,
  ): Promise<SetSecurityPolicyAttributesResponseDto> {
    return this.commandBus.execute(
      new SetSecurityPolicyAttributesCommand(params.policyId, body.attributes),
    );
  }
}
