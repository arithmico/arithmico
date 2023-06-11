import { Controller, Put, Param, Body, UseFilters } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RenameUserGroupResponseDto } from './rename-user-group.response.dto';
import { RenameUserGroupRequestBodyDto } from './rename-user-group.request.body.dto';
import { RenameUserGroupRequestParamsDto } from './rename-user-group.request.params.dto';
import { RenameUserGroupCommand } from './rename-user-group.command';
import { DuplicateKeyFilter } from '../../../../filters/duplicate-key/duplicate-key.filter';

@Controller(':groupId')
export class RenameUserGroupController {
  constructor(private commandBus: CommandBus) {}

  @Put()
  @UseFilters(DuplicateKeyFilter)
  async renameUserGroup(
    @Param() params: RenameUserGroupRequestParamsDto,
    @Body() body: RenameUserGroupRequestBodyDto,
  ): Promise<RenameUserGroupResponseDto> {
    return this.commandBus.execute(
      new RenameUserGroupCommand(params.groupId, body.name),
    );
  }
}
