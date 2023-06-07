import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { SecurityPolicyRepository } from '../../../../infrastructure/database/repositories/security-policy/security-policy.repository';
import { GetSecurityPoliciesAttachedToUserQuery } from './get-security-policies-attached-to-user.query';
import { GetSecurityPoliciesAttachedToUserResponseDto } from './get-security-policies-attached-to-user.response.dto';

@QueryHandler(GetSecurityPoliciesAttachedToUserQuery)
export class GetSecurityPoliciesAttachedToUserHandler
  implements IQueryHandler<GetSecurityPoliciesAttachedToUserQuery>
{
  constructor(private securityPolicyRepository: SecurityPolicyRepository) {}

  async execute(
    query: GetSecurityPoliciesAttachedToUserQuery,
  ): Promise<PagedResponse<GetSecurityPoliciesAttachedToUserResponseDto>> {
    const policies =
      await this.securityPolicyRepository.getPoliciesAttachedToUser(
        query.userId,
        query.skip,
        query.limit,
      );

    return {
      items: policies.items.map((policy) => ({
        id: policy._id,
        name: policy.name,
        attributes: policy.attributes,
      })),
      skip: policies.skip,
      limit: policies.limit,
      total: policies.total,
    };
  }
}
