import { Controller, Put, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddUserToUserGroupResponseDto } from './add-user-to-user-group.response.dto';
import { AddUserToUserGroupRequestParamsDto } from './add-user-to-user-group.request.params.dto';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { AddUserToUserGroupCommand } from './add-user-to-user-group.command';

@Controller(':userId/user-groups/:groupId')
export class AddUserToUserGroupController {
  constructor(private commandBus: CommandBus) {}

  @Put()
  @SecurityAttributes(
    SecurityAttribute.UsersWrite,
    SecurityAttribute.UserGroupsWrite,
  )
  async addUserToUserGroup(
    @Param() params: AddUserToUserGroupRequestParamsDto,
  ): Promise<AddUserToUserGroupResponseDto> {
    return await this.commandBus.execute(
      new AddUserToUserGroupCommand(params.userId, params.groupId),
    );
  }
}
