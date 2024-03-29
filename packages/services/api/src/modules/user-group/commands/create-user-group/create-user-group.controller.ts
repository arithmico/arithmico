import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserGroupResponseDto } from './create-user-group.response.dto';
import { CreateUserGroupRequestBodyDto } from './create-user-group.request.body.dto';
import { CreateUserGroupCommand } from './create-user-group.command';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { DuplicateKeyFilter } from '../../../../filters/duplicate-key/duplicate-key.filter';

@Controller()
export class CreateUserGroupController {
  constructor(private commandBus: CommandBus) {}

  @UseFilters(DuplicateKeyFilter)
  @Post()
  @SecurityAttributes(SecurityAttribute.UserGroupsWrite)
  async createUserGroup(
    @Body() body: CreateUserGroupRequestBodyDto,
  ): Promise<CreateUserGroupResponseDto> {
    return this.commandBus.execute(new CreateUserGroupCommand(body.name));
  }
}
