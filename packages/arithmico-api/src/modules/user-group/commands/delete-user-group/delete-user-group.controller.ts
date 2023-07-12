import { Controller, Delete, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { DeleteUserGroupCommand } from './delete-user-group.command';
import { DeleteUserGroupRequestParamsDto } from './delete-user-group.request.params.dto';

@Controller(':groupId')
export class DeleteUserGroupController {
  constructor(private commandBus: CommandBus) {}

  @Delete()
  @SecurityAttributes(SecurityAttribute.UserGroupsWrite)
  async deleteUserGroup(
    @Param() params: DeleteUserGroupRequestParamsDto,
  ): Promise<void> {
    await this.commandBus.execute(new DeleteUserGroupCommand(params.groupId));
  }
}
