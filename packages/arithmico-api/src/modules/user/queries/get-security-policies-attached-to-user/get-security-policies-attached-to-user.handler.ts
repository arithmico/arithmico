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
    const result =
      await this.securityPolicyRepository.getSecurityPoliciesAttachedToUser(
        query.skip,
        query.limit,
        query.userId,
      );

    return {
      skip: result.skip,
      limit: result.limit,
      total: result.total,
      items: result.items.map((policy) => ({
        id: policy._id,
        name: policy.name,
        attributes: policy.attributes,
        readonly: policy.readonly,
        createdAt: policy.createdAt,
      })),
    };
  }
}
