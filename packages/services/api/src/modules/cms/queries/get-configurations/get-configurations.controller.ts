import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetConfigurationsResponseDto } from './get-configurations.response.dto';
import { GetConfigurationsRequestQueryDto } from './get-configurations.request.query.dto';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { GetConfigurationsQuery } from './get-configurations.query';
import { Public } from '../../../../decorators/public.decorator';

@Controller('configurations')
export class GetConfigurationsController {
  constructor(private queryBus: QueryBus) {}

  @Public()
  @Get()
  async getConfigurations(
    @Query() query: GetConfigurationsRequestQueryDto,
  ): Promise<PagedResponse<GetConfigurationsResponseDto>> {
    return this.queryBus.execute(
      new GetConfigurationsQuery(query.skip, query.limit),
    );
  }
}
