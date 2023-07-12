import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../../infrastructure/database/repositories/user/user.repository';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { GetUserByIdResponseDto } from './get-user-by-id.response.dto';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private userRepository: UserRepository) {}

  async execute(query: GetUserByIdQuery): Promise<GetUserByIdResponseDto> {
    const userDocument = await this.userRepository.getUserByIdOrThrow(
      query.userId,
    );
    return {
      id: userDocument._id,
      email: userDocument.email,
      username: userDocument.username,
      createdAt: userDocument.createdAt,
    };
  }
}
