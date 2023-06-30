import { BadRequestException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { UserRepository } from '../../../../infrastructure/database/repositories/user/user.repository';
import { GetUsersWithIsAttachedResponseDto } from './get-users-with-is-attached.response.dto';
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
    | PagedResponse<GetUsersWithIsAttachedResponseDto>
  > {
    if (query.groupId && query.policyId) {
      throw new BadRequestException(
        'cannot perform to checks at the same time',
      );
    }

    if (query.policyId) {
      return this.getUsersWithIsAttachedCheck(
        query.skip,
        query.limit,
        query.policyId,
      );
    }

    if (query.groupId) {
      return this.getUsersWithIsMemberCheck(
        query.skip,
        query.limit,
        query.groupId,
      );
    }

    return this.getUsers(query.skip, query.limit);
  }

  async getUsersWithIsAttachedCheck(
    skip: number,
    limit: number,
    policyId: string,
  ): Promise<PagedResponse<GetUsersWithIsAttachedResponseDto>> {
    const result =
      await this.userRepository.getUsersWithSecurityPolicyAttachmentCheck(
        skip,
        limit,
        policyId,
      );
    return {
      items: result.items.map((user) => ({
        id: user._id,
        username: user.username,
        email: user.email,
        isAttached: user.isAttached,
        createdAt: user.createdAt,
      })),
      skip: result.skip,
      limit: result.limit,
      total: result.total,
    };
  }

  async getUsersWithIsMemberCheck(
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
        isMember: user.isMember,
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
