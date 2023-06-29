import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { UserGroupRepository } from '../../../../infrastructure/database/repositories/user-group/user-group.repository';
import { GetUserGroupsWithAttachmentCheckResponseDto } from './get-user-groups-with-attachment-check.response.dto';
import { GetUserGroupsQuery } from './get-user-groups.query';
import { GetUserGroupsResponseDto } from './get-user-groups.response.dto';

@QueryHandler(GetUserGroupsQuery)
export class GetUserGroupsHandler implements IQueryHandler<GetUserGroupsQuery> {
  constructor(private userGroupRepository: UserGroupRepository) {}

  async execute(
    query: GetUserGroupsQuery,
  ): Promise<
    | PagedResponse<GetUserGroupsResponseDto>
    | PagedResponse<GetUserGroupsWithAttachmentCheckResponseDto>
  > {
    if (query.policyId) {
      return this.getUsersWithAttachmentCheck(
        query.skip,
        query.limit,
        query.policyId,
      );
    }

    return this.getUserGroups(query.skip, query.limit);
  }

  async getUsersWithAttachmentCheck(
    skip: number,
    limit: number,
    policyId: string,
  ): Promise<PagedResponse<GetUserGroupsWithAttachmentCheckResponseDto>> {
    const result =
      await this.userGroupRepository.getUserGroupsWithAttachmentCheck(
        skip,
        limit,
        policyId,
      );
    return {
      skip: result.skip,
      limit: result.limit,
      items: result.items.map((item) => ({
        id: item._id,
        name: item.name,
        createdAt: item.createdAt,
        isAttached: item.isAttached,
        readonly: item.readonly,
      })),
      total: result.total,
    };
  }

  async getUserGroups(
    skip: number,
    limit: number,
  ): Promise<PagedResponse<GetUserGroupsResponseDto>> {
    const result = await this.userGroupRepository.getUserGroups(skip, limit);
    return {
      skip: result.skip,
      limit: result.limit,
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
