import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { GetSecurityPolicyByIdResponseDto } from './get-security-policy-by-id.response.dto';
import { GetSecurityPolicyByIdPathDto } from './get-security-policy-by-id.path.dto';
import { GetSecurityPolicyByIdQuery } from './get-security-policy-by-id.query';

@Controller()
export class GetSecurityPolicyByIdController {
  constructor(private queryBus: QueryBus) {}

  @Get(':policyId')
  @SecurityAttributes(SecurityAttribute.SecurityPoliciesRead)
  async getSecurityPolices(
    @Param() params: GetSecurityPolicyByIdPathDto,
  ): Promise<GetSecurityPolicyByIdResponseDto> {
    return this.queryBus.execute(
      new GetSecurityPolicyByIdQuery(params.policyId),
    );
  }
}
