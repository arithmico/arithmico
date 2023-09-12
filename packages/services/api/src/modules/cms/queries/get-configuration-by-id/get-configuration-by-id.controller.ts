import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetConfigurationByIdResponseDto } from './get-configuration-by-id.response.dto';
import { GetConfigurationByIdRequestParamsDto } from './get-configuration-by-id.request.params.dto';
import { GetConfigurationByIdQuery } from './get-configuration-by-id.query';
import { Public } from '../../../../decorators/public.decorator';

@Controller('configurations/:configurationId')
export class GetConfigurationByIdController {
  constructor(private queryBus: QueryBus) {}

  @Public()
  @Get()
  async getConfigurationById(
    @Param() params: GetConfigurationByIdRequestParamsDto,
  ): Promise<GetConfigurationByIdResponseDto> {
    return this.queryBus.execute(
      new GetConfigurationByIdQuery(params.configurationId),
    );
  }
}
