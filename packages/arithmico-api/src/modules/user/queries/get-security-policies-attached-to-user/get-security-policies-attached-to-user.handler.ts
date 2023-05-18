import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SecurityPolicyRepository } from '../../../../infrastructure/database/repositories/security-policy.repository';
import { GetSecurityPoliciesAttachedToUserQuery } from './get-security-policies-attached-to-user.query';
import { GetSecurityPoliciesAttachedToUserResponseDto } from './get-security-policies-attached-to-user.response.dto';

@QueryHandler(GetSecurityPoliciesAttachedToUserQuery)
export class GetSecurityPoliciesAttachedToUserHandler
  implements IQueryHandler<GetSecurityPoliciesAttachedToUserQuery>
{
  constructor(private securityPolicyRepository: SecurityPolicyRepository) {}

  async execute(
    query: GetSecurityPoliciesAttachedToUserQuery,
  ): Promise<GetSecurityPoliciesAttachedToUserResponseDto[]> {
    const policies =
      await this.securityPolicyRepository.getPoliciesAttachedToUser(
        query.userId,
      );

    return policies.map((policy) => ({
      id: policy._id,
      name: policy.name,
      attributes: policy.attributes,
    }));
  }
}
