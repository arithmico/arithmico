import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SecurityPolicyRepository } from '../../../../infrastructure/database/repositories/security-policy/security-policy.repository';
import { GetSecurityPolicyByIdQuery } from './get-security-policy-by-id.query';
import { GetSecurityPolicyByIdResponseDto } from './get-security-policy-by-id.response.dto';

@QueryHandler(GetSecurityPolicyByIdQuery)
export class GetSecurityPolicyByIdHandler
  implements IQueryHandler<GetSecurityPolicyByIdQuery>
{
  constructor(private securityPolicyRepository: SecurityPolicyRepository) {}

  async execute(
    query: GetSecurityPolicyByIdQuery,
  ): Promise<GetSecurityPolicyByIdResponseDto> {
    const securityPolicyWithStatisticsDocument =
      await this.securityPolicyRepository.findSecurityPolicyByIdWithPrincipalStatisticsOrThrow(
        query.policyId,
      );

    return {
      id: securityPolicyWithStatisticsDocument._id,
      name: securityPolicyWithStatisticsDocument.name,
      readonly: securityPolicyWithStatisticsDocument.readonly,
      attributes: securityPolicyWithStatisticsDocument.attributes,
      createdAt: securityPolicyWithStatisticsDocument.createdAt,
      principals: {
        total: securityPolicyWithStatisticsDocument.principals.total,
        users: securityPolicyWithStatisticsDocument.principals.users,
        groups: securityPolicyWithStatisticsDocument.principals.groups,
      },
    };
  }
}
