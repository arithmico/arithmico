import { Controller, Get, Query, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserGroupsForSecurityPolicyResponseDto } from './get-user-groups-for-security-policy.response.dto';
import { GetUserGroupsForSecurityPolicyRequestQueryDto } from './get-user-groups-for-security-policy.request.query.dto';
import { GetUserGroupsForSecurityPolicyRequestParamsDto } from './get-user-groups-for-security-policy.request.params.dto';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { GetUserGroupsForSecurityPolicyQuery } from './get-user-groups-for-security-policy.query';

@Controller(':policyId/user-groups')
export class GetUserGroupsForSecurityPolicyController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getUserGroupsForSecurityPolicy(
    @Query() query: GetUserGroupsForSecurityPolicyRequestQueryDto,
    @Param() params: GetUserGroupsForSecurityPolicyRequestParamsDto,
  ): Promise<PagedResponse<GetUserGroupsForSecurityPolicyResponseDto>> {
    return this.queryBus.execute(
      new GetUserGroupsForSecurityPolicyQuery(
        query.skip,
        query.limit,
        params.policyId,
      ),
    );
  }
}
