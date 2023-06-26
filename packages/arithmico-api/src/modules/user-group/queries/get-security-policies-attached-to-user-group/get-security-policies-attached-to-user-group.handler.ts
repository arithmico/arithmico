import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { SecurityPolicyRepository } from '../../../../infrastructure/database/repositories/security-policy/security-policy.repository';
import { GetSecurityPoliciesAttachedToUserGroupQuery } from './get-security-policies-attached-to-user-group.query';
import { GetSecurityPoliciesAttachedToUserGroupResponseDto } from './get-security-policies-attached-to-user-group.response.dto';

@QueryHandler(GetSecurityPoliciesAttachedToUserGroupQuery)
export class GetSecurityPoliciesAttachedToUserGroupHandler
  implements IQueryHandler<GetSecurityPoliciesAttachedToUserGroupQuery>
{
  constructor(private securityPolicyRepository: SecurityPolicyRepository) {}

  async execute(
    query: GetSecurityPoliciesAttachedToUserGroupQuery,
  ): Promise<PagedResponse<GetSecurityPoliciesAttachedToUserGroupResponseDto>> {
    const result =
      await this.securityPolicyRepository.getSecurityPoliciesAttachedToUserGroup(
        query.groupId,
        query.skip,
        query.limit,
      );

    return {
      items: result.items.map((securityPolicy) => ({
        id: securityPolicy._id,
        name: securityPolicy.name,
        readonly: securityPolicy.readonly,
        createdAt: securityPolicy.createdAt,
        attributes: securityPolicy.attributes,
      })),
      total: result.total,
      skip: result.skip,
      limit: result.limit,
    };
  }
}
