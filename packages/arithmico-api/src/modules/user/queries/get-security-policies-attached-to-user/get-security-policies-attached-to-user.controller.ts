import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetSecurityPoliciesAttachedToUserQuery } from './get-security-policies-attached-to-user.query';
import { GetSecurityPoliciesAttachedToUserRequestDto } from './get-security-policies-attached-to-user.request.dto';
import { GetSecurityPoliciesAttachedToUserResponseDto } from './get-security-policies-attached-to-user.response.dto';

@Controller()
export class GetSecurityPoliciesAttachedToUserController {
  constructor(private queryBus: QueryBus) {}

  @Get(':userId/security-policies')
  async getSecurityPolicesAttachedToUser(
    @Param() params: GetSecurityPoliciesAttachedToUserRequestDto,
  ): Promise<GetSecurityPoliciesAttachedToUserResponseDto[]> {
    return this.queryBus.execute(
      new GetSecurityPoliciesAttachedToUserQuery(params.userId),
    );
  }
}
