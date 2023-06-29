import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { UserGroupRepository } from '../../../../infrastructure/database/repositories/user-group/user-group.repository';
import { GetUserGroupsForUserQuery } from './get-user-groups-for-user.query';
import { GetUserGroupsForUserResponseDto } from './get-user-groups-for-user.response.dto';

@QueryHandler(GetUserGroupsForUserQuery)
export class GetUserGroupsForUserHandler
  implements IQueryHandler<GetUserGroupsForUserQuery>
{
  constructor(private userGroupRepository: UserGroupRepository) {}

  async execute(
    query: GetUserGroupsForUserQuery,
  ): Promise<PagedResponse<GetUserGroupsForUserResponseDto>> {
    const result = await this.userGroupRepository.getUserGroupsForUser(
      query.skip,
      query.limit,
      query.userId,
    );

    return {
      skip: result.skip,
      limit: result.limit,
      total: result.total,
      items: result.items.map((userGroup) => ({
        id: userGroup._id,
        name: userGroup.name,
        createdAt: userGroup.createdAt,
        readonly: userGroup.readonly,
      })),
    };
  }
}
