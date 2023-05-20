import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { GetUsersQuery } from './get-users.query';
import { GetUserQueryDto } from './get-users.query.dto';

@Controller()
export class GetUsersController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  @SecurityAttributes(SecurityAttribute.UsersRead)
  async createUser(@Query() getUsersQueryDto: GetUserQueryDto) {
    return this.queryBus.execute(
      new GetUsersQuery(getUsersQueryDto.skip, getUsersQueryDto.limit),
    );
  }
}
