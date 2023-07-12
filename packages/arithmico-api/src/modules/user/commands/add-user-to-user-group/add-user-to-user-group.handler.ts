import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserGroupMembershipRepository } from '../../../../infrastructure/database/repositories/user-group-membership/user-group-membership.repository';
import { AddUserToUserGroupCommand } from './add-user-to-user-group.command';
import { AddUserToUserGroupResponseDto } from './add-user-to-user-group.response.dto';

@CommandHandler(AddUserToUserGroupCommand)
export class AddUserToUserGroupHandler
  implements ICommandHandler<AddUserToUserGroupCommand>
{
  constructor(
    private userGroupMembershipRepository: UserGroupMembershipRepository,
  ) {}

  async execute(
    command: AddUserToUserGroupCommand,
  ): Promise<AddUserToUserGroupResponseDto> {
    const membershipDocument =
      await this.userGroupMembershipRepository.addUserToUserGroup(
        command.groupId,
        command.userId,
      );

    return {
      groupId: membershipDocument.groupId,
      userId: membershipDocument.userId,
    };
  }
}
