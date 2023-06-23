import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { UserRepository } from '../../../../infrastructure/database/repositories/user/user.repository';
import { GetUsersWithIsGroupMemberResponseDto } from './get-users-with-is-group-member.response.dto';
import { GetUsersQuery } from './get-users.query';
import { GetUsersResponseDto } from './get-users.response.dto';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private userRepository: UserRepository) {}

  async execute(
    query: GetUsersQuery,
  ): Promise<
    | PagedResponse<GetUsersResponseDto>
    | PagedResponse<GetUsersWithIsGroupMemberResponseDto>
  > {
    if (query.groupId) {
      return await this.getUsersWithIsGroupMember(
        query.skip,
        query.limit,
        query.groupId,
      );
    }

    return await this.getUsers(query.skip, query.limit);
  }

  async getUsersWithIsGroupMember(
    skip: number,
    limit: number,
    groupId: string,
  ): Promise<PagedResponse<GetUsersWithIsGroupMemberResponseDto>> {
    const result = await this.userRepository.getUsersWithIsGroupMember(
      skip,
      limit,
      groupId,
    );

    return {
      items: result.items.map((user) => ({
        id: user._id,
        username: user.username,
        email: user.email,
        isGroupMember: user.isGroupMember,
        createdAt: user.createdAt,
      })),
      skip: result.skip,
      limit: result.limit,
      total: result.total,
    };
  }

  async getUsers(
    skip: number,
    limit: number,
  ): Promise<PagedResponse<GetUsersResponseDto>> {
    const result = await this.userRepository.getUsers({
      skip,
      limit,
    });
    return {
      items: result.items.map((user) => ({
        id: user._id,
        username: user.username,
        userGroups: user.userGroups,
        securityPolicies: user.securityPolicies,
        createdAt: user.createdAt,
        email: user.email,
      })),
      skip: result.skip,
      limit: result.limit,
      total: result.total,
    };
  }
}
