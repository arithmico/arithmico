import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserGroupMembershipRepository } from '../../../../infrastructure/database/repositories/user-group-membership/user-group-membership.repository';
import { RemoveUserFromUserGroupCommand } from './remove-user-from-user-group.command';
import { RemoveUserFromUserGroupResponseDto } from './remove-user-from-user-group.response.dto';

@CommandHandler(RemoveUserFromUserGroupCommand)
export class RemoveUserFromUserGroupHandler
  implements ICommandHandler<RemoveUserFromUserGroupCommand>
{
  constructor(
    private userGroupMembershipRepository: UserGroupMembershipRepository,
  ) {}

  async execute(
    command: RemoveUserFromUserGroupCommand,
  ): Promise<RemoveUserFromUserGroupResponseDto> {
    const membershipDocument =
      await this.userGroupMembershipRepository.removeUserFromUserGroupOrThrow(
        command.groupId,
        command.userId,
      );

    return {
      groupId: membershipDocument.groupId,
      userId: membershipDocument.userId,
    };
  }
}
