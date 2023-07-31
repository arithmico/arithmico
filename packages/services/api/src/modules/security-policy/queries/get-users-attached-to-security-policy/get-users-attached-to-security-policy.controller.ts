import { Controller, Get, Query, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUsersAttachedToSecurityPolicyResponseDto } from './get-users-attached-to-security-policy.response.dto';
import { GetUsersAttachedToSecurityPolicyRequestQueryDto } from './get-users-attached-to-security-policy.request.query.dto';
import { GetUsersAttachedToSecurityPolicyRequestParamsDto } from './get-users-attached-to-security-policy.request.params.dto';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { GetUsersAttachedToSecurityPolicyQuery } from './get-users-attached-to-security-policy.query';

@Controller(':policyId/users')
export class GetUsersAttachedToSecurityPolicyController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getUsersAttachedToSecurityPolicy(
    @Query() query: GetUsersAttachedToSecurityPolicyRequestQueryDto,
    @Param() params: GetUsersAttachedToSecurityPolicyRequestParamsDto,
  ): Promise<PagedResponse<GetUsersAttachedToSecurityPolicyResponseDto>> {
    return this.queryBus.execute(
      new GetUsersAttachedToSecurityPolicyQuery(
        params.policyId,
        query.skip,
        query.limit,
      ),
    );
  }
}
