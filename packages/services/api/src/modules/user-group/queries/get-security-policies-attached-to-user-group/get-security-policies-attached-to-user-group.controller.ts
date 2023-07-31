import { Controller, Get, Query, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetSecurityPoliciesAttachedToUserGroupResponseDto } from './get-security-policies-attached-to-user-group.response.dto';
import { GetSecurityPoliciesAttachedToUserGroupRequestQueryDto } from './get-security-policies-attached-to-user-group.request.query.dto';
import { GetSecurityPoliciesAttachedToUserGroupRequestParamsDto } from './get-security-policies-attached-to-user-group.request.params.dto';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { GetSecurityPoliciesAttachedToUserGroupQuery } from './get-security-policies-attached-to-user-group.query';

@Controller(':groupId/security-policies')
export class GetSecurityPoliciesAttachedToUserGroupController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getSecurityPoliciesAttachedToUserGroup(
    @Query() query: GetSecurityPoliciesAttachedToUserGroupRequestQueryDto,
    @Param() params: GetSecurityPoliciesAttachedToUserGroupRequestParamsDto,
  ): Promise<PagedResponse<GetSecurityPoliciesAttachedToUserGroupResponseDto>> {
    return this.queryBus.execute(
      new GetSecurityPoliciesAttachedToUserGroupQuery(
        params.groupId,
        query.skip,
        query.limit,
      ),
    );
  }
}
