import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
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
  ): Promise<GetUserGroupsForUserResponseDto[]> {
    const userGroups = await this.userGroupRepository.getUserGroupsForUser(
      query.userId,
    );
    return userGroups.map((userGroup) => ({
      id: userGroup._id,
      name: userGroup.name,
      createdAt: userGroup.createdAt,
      readonly: userGroup.readonly,
    }));
  }
}
