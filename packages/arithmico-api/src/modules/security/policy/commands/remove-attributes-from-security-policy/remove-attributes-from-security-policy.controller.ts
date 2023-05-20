import { Body, Controller, Delete, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SecurityAttribute } from '../../../../../common/types/security-attributes.enum';
import { SecurityAttributes } from '../../../../../decorators/security-attributes.decorator';
import { RemoveAttributeFromSecurityPolicyCommand } from './remove-attributes-from-security-policy.command';
import { RemoveAttributesFromSecurityPolicyRequestBodyDto } from './remove-attributes-from-security-policy.request.body.dto';
import { RemoveAttributesFromSecurityPolicyRequestPathDto } from './remove-attributes-from-security-policy.request.path.dto';
import { RemoveAttributeFromSecurityPolicyResponseDto } from './remove-attributes-from-security-policy.response.dto';

@Controller()
export class RemoveAttributeFromSecurityPolicyController {
  constructor(private commandBus: CommandBus) {}

  @Delete(':policyId/attributes')
  @SecurityAttributes(SecurityAttribute.SecurityPoliciesWrite)
  async removeAttributesFromSecurityPolicy(
    @Param()
    params: RemoveAttributesFromSecurityPolicyRequestPathDto,
    @Body()
    body: RemoveAttributesFromSecurityPolicyRequestBodyDto,
  ): Promise<RemoveAttributeFromSecurityPolicyResponseDto> {
    return this.commandBus.execute(
      new RemoveAttributeFromSecurityPolicyCommand(
        params.policyId,
        body.attributes,
      ),
    );
  }
}
