import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserGroupRepository } from '../../../../infrastructure/database/repositories/user-group/user-group.repository';
import { GetUserGroupByIdQuery } from './get-user-group-by-id.query';
import { GetUserGroupByIdResponseDto } from './get-user-group-by-id.response.dto';

@QueryHandler(GetUserGroupByIdQuery)
export class GetUserGroupByIdHandler
  implements IQueryHandler<GetUserGroupByIdQuery>
{
  constructor(private userGroupRepository: UserGroupRepository) {}

  async execute(
    query: GetUserGroupByIdQuery,
  ): Promise<GetUserGroupByIdResponseDto> {
    const userGroupDocumentWithDetails =
      await this.userGroupRepository.getUserGroupByIdWithDetailsOrThrow(
        query.groupId,
      );

    return {
      id: userGroupDocumentWithDetails.id,
      name: userGroupDocumentWithDetails.name,
      members: userGroupDocumentWithDetails.members,
      readonly: userGroupDocumentWithDetails.readonly,
      createdAt: userGroupDocumentWithDetails.createdAt,
    };
  }
}
