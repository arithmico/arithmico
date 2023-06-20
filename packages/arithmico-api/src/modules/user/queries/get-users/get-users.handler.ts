import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../../infrastructure/database/repositories/user/user.repository';
import { GetUsersQuery } from './get-users.query';
import { GetUsersResponseDto } from './get-users.response.dto';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private userRepository: UserRepository) {}

  async execute(query: GetUsersQuery): Promise<GetUsersResponseDto> {
    const result = await this.userRepository.getUsers({
      skip: query.skip,
      limit: query.limit,
    });
    return {
      items: result.items.map((user) => ({
        id: user._id,
        username: user.username,
        userGroups: user.userGroups,
        securityPolicies: user.securityPolicies,
        createdAt: user.createdAt,
      })),
      skip: result.skip,
      limit: result.limit,
      total: result.total,
    };
  }
}
