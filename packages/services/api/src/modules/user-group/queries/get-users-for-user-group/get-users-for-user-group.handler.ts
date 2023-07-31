import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { UserRepository } from '../../../../infrastructure/database/repositories/user/user.repository';
import { GetUsersForUserGroupQuery } from './get-users-for-user-group.query';
import { GetUsersForUserGroupResponseDto } from './get-users-for-user-group.response.dto';

@QueryHandler(GetUsersForUserGroupQuery)
export class GetUsersForUserGroupHandler
  implements IQueryHandler<GetUsersForUserGroupQuery>
{
  constructor(private userRepository: UserRepository) {}

  async execute(
    query: GetUsersForUserGroupQuery,
  ): Promise<PagedResponse<GetUsersForUserGroupResponseDto>> {
    const result = await this.userRepository.getUsersForUserGroup(
      query.groupId,
      query.skip,
      query.limit,
    );

    return {
      items: result.items.map((user) => ({
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      })),
      skip: result.skip,
      limit: result.limit,
      total: result.total,
    };
  }
}
