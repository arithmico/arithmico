import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserGroupsResponseDto } from './get-user-groups.response.dto';
import { GetUserGroupsRequestQueryDto } from './get-user-groups.request.query.dto';
import { GetUserGroupsQuery } from './get-user-groups.query';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { GetUserGroupsWithAttachmentCheckResponseDto } from './get-user-groups-with-attachment-check.response.dto';
import { GetUserGroupsWithMembershipCheckResponseDto } from './get-user-groups-with-membership-check.response.dto';

@Controller()
export class GetUserGroupsController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  @SecurityAttributes(SecurityAttribute.UserGroupsRead)
  async getUserGroups(
    @Query() query: GetUserGroupsRequestQueryDto,
  ): Promise<
    | PagedResponse<GetUserGroupsResponseDto>
    | PagedResponse<GetUserGroupsWithAttachmentCheckResponseDto>
    | PagedResponse<GetUserGroupsWithMembershipCheckResponseDto>
  > {
    return await this.queryBus.execute(
      new GetUserGroupsQuery(
        query.skip,
        query.limit,
        query.checkSecurityPolicyAttachment,
        query.checkGroupMembership,
      ),
    );
  }
}
