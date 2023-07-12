import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserGroupByIdResponseDto } from './get-user-group-by-id.response.dto';
import { GetUserGroupByIdRequestParamsDto } from './get-user-group-by-id.request.params.dto';
import { GetUserGroupByIdQuery } from './get-user-group-by-id.query';

@Controller(':groupId')
export class GetUserGroupByIdController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getUserGroupById(
    @Param() params: GetUserGroupByIdRequestParamsDto,
  ): Promise<GetUserGroupByIdResponseDto> {
    return await this.queryBus.execute(
      new GetUserGroupByIdQuery(params.groupId),
    );
  }
}
