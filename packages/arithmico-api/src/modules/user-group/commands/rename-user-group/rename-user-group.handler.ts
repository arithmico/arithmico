import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RenameUserGroupCommand } from './rename-user-group.command';
import { RenameUserGroupResponseDto } from './rename-user-group.response.dto';
import { UserGroupRepository } from '../../../../infrastructure/database/repositories/user-group/user-group.repository';

@CommandHandler(RenameUserGroupCommand)
export class RenameUserGroupHandler
  implements ICommandHandler<RenameUserGroupCommand>
{
  constructor(private userGroupRepository: UserGroupRepository) {}

  async execute(
    command: RenameUserGroupCommand,
  ): Promise<RenameUserGroupResponseDto> {
    const userGroupDocument =
      await this.userGroupRepository.renameUserGroupOrThrow(
        command.groupId,
        command.name,
      );

    return {
      id: userGroupDocument._id,
      name: userGroupDocument.name,
      createdAt: userGroupDocument.createdAt,
    };
  }
}
