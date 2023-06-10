import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserGroupCommand } from './create-user-group.command';
import { CreateUserGroupResponseDto } from './create-user-group.response.dto';
import { UserGroupRepository } from '../../../../infrastructure/database/repositories/user-group/user-group.repository';

@CommandHandler(CreateUserGroupCommand)
export class CreateUserGroupHandler
  implements ICommandHandler<CreateUserGroupCommand>
{
  constructor(private userGroupRepository: UserGroupRepository) {}

  async execute(
    command: CreateUserGroupCommand,
  ): Promise<CreateUserGroupResponseDto> {
    const userGroupDocument = await this.userGroupRepository.createUserGroup(
      command.name,
      false,
    );

    return {
      id: userGroupDocument._id,
      name: userGroupDocument.name,
      createdAt: userGroupDocument.createdAt,
      readonly: userGroupDocument.readonly,
    };
  }
}
