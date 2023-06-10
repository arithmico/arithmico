import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { UserGroupRepository } from '../../../../infrastructure/database/repositories/user-group/user-group.repository';
import { GetUserGroupsQuery } from './get-user-groups.query';
import { GetUserGroupsResponseDto } from './get-user-groups.response.dto';

@QueryHandler(GetUserGroupsQuery)
export class GetUserGroupsHandler implements IQueryHandler<GetUserGroupsQuery> {
  constructor(private userGroupRepository: UserGroupRepository) {}

  async execute(
    query: GetUserGroupsQuery,
  ): Promise<PagedResponse<GetUserGroupsResponseDto>> {
    const result = await this.userGroupRepository.getUserGroups(
      query.skip,
      query.limit,
    );

    return {
      skip: query.skip,
      limit: query.skip,
      items: result.items.map((item) => ({
        id: item._id,
        name: item.name,
        createdAt: item.createdAt,
        members: item.members,
        readonly: item.readonly,
      })),
      total: result.total,
    };
  }
}
