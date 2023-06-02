import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SecurityPolicyRepository } from '../../../../../infrastructure/database/repositories/security-policy.repository';
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
    const securityPolicyDocument =
      await this.securityPolicyRepository.findByIdOrThrow(query.policyId);

    return {
      id: securityPolicyDocument._id,
      name: securityPolicyDocument.name,
      attributes: securityPolicyDocument.attributes,
    };
  }
}
