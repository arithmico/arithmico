import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { PageParameterQueryDto } from '../../../../common/dtos/PageParameters.query.dto';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { GetUsersQuery } from './get-users.query';

@Controller()
export class GetUsersController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  @SecurityAttributes(SecurityAttribute.UsersRead)
  async createUser(@Query() getUsersQueryDto: PageParameterQueryDto) {
    return this.queryBus.execute(
      new GetUsersQuery(getUsersQueryDto.skip, getUsersQueryDto.limit),
    );
  }
}
