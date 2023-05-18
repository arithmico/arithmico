import { Body, Controller, Param, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddAttributesToSecurityPolicyCommand } from './add-attributes-to-security-policy.command';
import { AddAttributesToSecurityPolicyRequestBodyDto } from './add-attributes-to-security-policy.request.body.dto';
import { AddAttributesToSecurityPolicyRequestPathDto } from './add-attributes-to-security-policy.request.path.dto';
import { AddAttributesToSecurityPolicyResponseDto } from './add-attributes-to-security-policy.response.dto';

@Controller()
export class AddAttributesToSecurityPolicyController {
  constructor(private commandBus: CommandBus) {}

  @Put(':policyId/attributes')
  async addAttributesToSecurityPolicy(
    @Param()
    params: AddAttributesToSecurityPolicyRequestPathDto,
    @Body()
    body: AddAttributesToSecurityPolicyRequestBodyDto,
  ): Promise<AddAttributesToSecurityPolicyResponseDto> {
    return this.commandBus.execute(
      new AddAttributesToSecurityPolicyCommand(
        params.policyId,
        body.attributes,
      ),
    );
  }
}
