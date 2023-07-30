import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetConfigurationByIdResponseDto } from './get-configuration-by-id.response.dto';
import { GetConfigurationByIdRequestParamsDto } from './get-configuration-by-id.request.params.dto';
import { GetConfigurationByIdQuery } from './get-configuration-by-id.query';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';

@Controller(':configurationId')
export class GetConfigurationByIdController {
  constructor(private queryBus: QueryBus) {}

  @SecurityAttributes(SecurityAttribute.ConfigurationsRead)
  @Get()
  async getConfigurationById(
    @Param() params: GetConfigurationByIdRequestParamsDto,
  ): Promise<GetConfigurationByIdResponseDto> {
    return this.queryBus.execute(
      new GetConfigurationByIdQuery(params.configurationId),
    );
  }
}
