import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserGroupsForUserResponseDto } from './get-user-groups-for-user.response.dto';
import { GetUserGroupsForUserRequestParamsDto } from './get-user-groups-for-user.request.params.dto';
import { GetUserGroupsForUserQuery } from './get-user-groups-for-user.query';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';

@Controller(':userId/user-groups')
export class GetUserGroupsForUserController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  @SecurityAttributes(
    SecurityAttribute.UsersRead,
    SecurityAttribute.UserGroupsRead,
  )
  async getUserGroupsForUser(
    @Param() params: GetUserGroupsForUserRequestParamsDto,
  ): Promise<GetUserGroupsForUserResponseDto[]> {
    return await this.queryBus.execute(
      new GetUserGroupsForUserQuery(params.userId),
    );
  }
}
