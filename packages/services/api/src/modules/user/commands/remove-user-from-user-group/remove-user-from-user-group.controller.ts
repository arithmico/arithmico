import { Controller, Delete, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RemoveUserFromUserGroupResponseDto } from './remove-user-from-user-group.response.dto';
import { RemoveUserFromUserGroupRequestParamsDto } from './remove-user-from-user-group.request.params.dto';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { RemoveUserFromUserGroupCommand } from './remove-user-from-user-group.command';

@Controller(':userId/user-groups/:groupId')
export class RemoveUserFromUserGroupController {
  constructor(private commandBus: CommandBus) {}

  @Delete()
  @SecurityAttributes(
    SecurityAttribute.UsersWrite,
    SecurityAttribute.UserGroupsWrite,
  )
  async removeUserFromUserGroup(
    @Param() params: RemoveUserFromUserGroupRequestParamsDto,
  ): Promise<RemoveUserFromUserGroupResponseDto> {
    return this.commandBus.execute(
      new RemoveUserFromUserGroupCommand(params.userId, params.groupId),
    );
  }
}
