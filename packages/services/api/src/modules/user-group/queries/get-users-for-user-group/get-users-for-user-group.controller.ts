import { Controller, Get, Query, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUsersForUserGroupResponseDto } from './get-users-for-user-group.response.dto';
import { GetUsersForUserGroupRequestQueryDto } from './get-users-for-user-group.request.query.dto';
import { GetUsersForUserGroupRequestParamsDto } from './get-users-for-user-group.request.params.dto';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { GetUsersForUserGroupQuery } from './get-users-for-user-group.query';

@Controller(':groupId/users')
export class GetUsersForUserGroupController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getUsersForUserGroup(
    @Query() query: GetUsersForUserGroupRequestQueryDto,
    @Param() params: GetUsersForUserGroupRequestParamsDto,
  ): Promise<PagedResponse<GetUsersForUserGroupResponseDto>> {
    return await this.queryBus.execute(
      new GetUsersForUserGroupQuery(params.groupId, query.skip, query.limit),
    );
  }
}
