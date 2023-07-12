import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserGroupRepository } from '../../../../infrastructure/database/repositories/user-group/user-group.repository';
import { DeleteUserGroupCommand } from './delete-user-group.command';

@CommandHandler(DeleteUserGroupCommand)
export class DeleteUserGroupHandler
  implements ICommandHandler<DeleteUserGroupCommand>
{
  constructor(private userGroupRepository: UserGroupRepository) {}

  async execute(command: DeleteUserGroupCommand): Promise<void> {
    await this.userGroupRepository.deleteUserGroup(command.groupId);
  }
}
