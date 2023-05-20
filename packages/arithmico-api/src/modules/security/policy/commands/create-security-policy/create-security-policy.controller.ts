import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SecurityAttribute } from '../../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../../decorators/security-attributes.decorator';
import { CreateSecurityPolicyCommand } from './create-security-policy.command';
import { CreateSecurityPolicyRequestDto } from './create-security-policy.request.dto';
import { CreateSecurityPolicyResponseDto } from './create-security-policy.response.dto';

@Controller()
export class CreateSecurityPolicyController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  @SecurityAttributes(SecurityAttribute.SecurityPoliciesWrite)
  async createSecurityPolicy(
    @Body() createSecurityPolicyRequestDto: CreateSecurityPolicyRequestDto,
  ): Promise<CreateSecurityPolicyResponseDto> {
    return this.commandBus.execute(
      new CreateSecurityPolicyCommand(
        createSecurityPolicyRequestDto.name,
        createSecurityPolicyRequestDto.attributes,
      ),
    );
  }
}
