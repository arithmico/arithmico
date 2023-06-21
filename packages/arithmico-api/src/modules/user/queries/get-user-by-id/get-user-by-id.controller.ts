import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserByIdResponseDto } from './get-user-by-id.response.dto';
import { GetUserByIdRequestParamsDto } from './get-user-by-id.request.params.dto';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';

@Controller(':userId')
export class GetUserByIdController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  @SecurityAttributes(SecurityAttribute.UsersRead)
  async getUserById(
    @Param() params: GetUserByIdRequestParamsDto,
  ): Promise<GetUserByIdResponseDto> {
    return await this.queryBus.execute(new GetUserByIdQuery(params.userId));
  }
}
