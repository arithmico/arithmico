import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../../common/types/paged-response.dto';
import { SecurityPolicyRepository } from '../../../../../infrastructure/database/repositories/security-policy/security-policy.repository';
import { GetSecurityPoliciesQuery } from './get-security-policies.query';
import { GetSecurityPoliciesResponseDto } from './get-security-policies.response.dto';

@QueryHandler(GetSecurityPoliciesQuery)
export class GetSecurityPoliciesHandler
  implements IQueryHandler<GetSecurityPoliciesQuery>
{
  constructor(private securityPolicyRepository: SecurityPolicyRepository) {}

  async execute(
    query: GetSecurityPoliciesQuery,
  ): Promise<PagedResponse<GetSecurityPoliciesResponseDto>> {
    const {
      items: policies,
      skip,
      limit,
      total,
    } = await this.securityPolicyRepository.getPolicies(
      query.skip,
      query.limit,
    );

    return {
      items: policies.map((policy) => ({
        id: policy._id,
        name: policy.name,
        readonly: policy.readonly,
        attributes: policy.attributes,
        principals: policy.principals,
        createdAt: policy.createdAt,
      })),
      skip,
      limit,
      total,
    };
  }
}
