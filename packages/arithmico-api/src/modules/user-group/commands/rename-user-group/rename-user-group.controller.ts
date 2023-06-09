import { Controller, Put, Param, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RenameUserGroupResponseDto } from './rename-user-group.response.dto';
import { RenameUserGroupRequestBodyDto } from './rename-user-group.request.body.dto';
import { RenameUserGroupRequestParamsDto } from './rename-user-group.request.params.dto';
import { RenameUserGroupCommand } from './rename-user-group.command';

@Controller(':groupId')
export class RenameUserGroupController {
  constructor(private commandBus: CommandBus) {}

  @Put()
  async renameUserGroup(
    @Param() params: RenameUserGroupRequestParamsDto,
    @Body() body: RenameUserGroupRequestBodyDto,
  ): Promise<RenameUserGroupResponseDto> {
    return this.commandBus.execute(
      new RenameUserGroupCommand(params.groupId, body.name),
    );
  }
}
