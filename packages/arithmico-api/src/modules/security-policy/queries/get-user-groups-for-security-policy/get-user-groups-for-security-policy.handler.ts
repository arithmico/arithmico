import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { UserGroupRepository } from '../../../../infrastructure/database/repositories/user-group/user-group.repository';
import { GetUserGroupsForSecurityPolicyQuery } from './get-user-groups-for-security-policy.query';
import { GetUserGroupsForSecurityPolicyResponseDto } from './get-user-groups-for-security-policy.response.dto';

@QueryHandler(GetUserGroupsForSecurityPolicyQuery)
export class GetUserGroupsForSecurityPolicyHandler
  implements IQueryHandler<GetUserGroupsForSecurityPolicyQuery>
{
  constructor(private userGroupRepository: UserGroupRepository) {}

  async execute(
    query: GetUserGroupsForSecurityPolicyQuery,
  ): Promise<PagedResponse<GetUserGroupsForSecurityPolicyResponseDto>> {
    const result =
      await this.userGroupRepository.getUsersGroupsForSecurityPolicy(
        query.skip,
        query.limit,
        query.policyId,
      );

    return {
      skip: result.skip,
      limit: result.limit,
      total: result.total,
      items: result.items.map((userGroup) => ({
        id: userGroup._id,
        name: userGroup.name,
        readonly: userGroup.readonly,
        createdAt: userGroup.createdAt,
      })),
    };
  }
}
