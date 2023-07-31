import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { UserRepository } from '../../../../infrastructure/database/repositories/user/user.repository';
import { GetUsersAttachedToSecurityPolicyQuery } from './get-users-attached-to-security-policy.query';
import { GetUsersAttachedToSecurityPolicyResponseDto } from './get-users-attached-to-security-policy.response.dto';

@QueryHandler(GetUsersAttachedToSecurityPolicyQuery)
export class GetUsersAttachedToSecurityPolicyHandler
  implements IQueryHandler<GetUsersAttachedToSecurityPolicyQuery>
{
  constructor(private userRepository: UserRepository) {}

  async execute(
    query: GetUsersAttachedToSecurityPolicyQuery,
  ): Promise<PagedResponse<GetUsersAttachedToSecurityPolicyResponseDto>> {
    const result = await this.userRepository.getUsersForSecurityPolicy(
      query.policyId,
      query.skip,
      query.limit,
    );

    return {
      items: result.items.map((user) => ({
        id: user._id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
      })),
      total: result.total,
      skip: result.skip,
      limit: result.limit,
    };
  }
}
