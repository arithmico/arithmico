import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetSecurityPoliciesAttachedToUserQuery } from './get-security-policies-attached-to-user.query';
import { GetSecurityPoliciesAttachedToUserPathDto } from './get-security-policies-attached-to-user.path.dto';
import { GetSecurityPoliciesAttachedToUserResponseDto } from './get-security-policies-attached-to-user.response.dto';
import { GetSecurityPoliciesAttachedToUserQueryDto } from './get-security-policies-attached-to-user.query.dto';

@Controller()
export class GetSecurityPoliciesAttachedToUserController {
  constructor(private queryBus: QueryBus) {}

  @Get(':userId/security-policies')
  async getSecurityPolicesAttachedToUser(
    @Param() params: GetSecurityPoliciesAttachedToUserPathDto,
    @Query() query: GetSecurityPoliciesAttachedToUserQueryDto,
  ): Promise<GetSecurityPoliciesAttachedToUserResponseDto[]> {
    return this.queryBus.execute(
      new GetSecurityPoliciesAttachedToUserQuery(
        params.userId,
        query.skip,
        query.limit,
      ),
    );
  }
}
