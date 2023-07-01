import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetFeatureFlagsResponseDto } from './get-feature-flags.response.dto';
import { GetFeatureFlagsRequestQueryDto } from './get-feature-flags.request.query.dto';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { GetFeatureFlagsQuery } from './get-feature-flags.query';

@Controller()
export class GetFeatureFlagsController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getFeatureFlags(
    @Query() query: GetFeatureFlagsRequestQueryDto,
  ): Promise<PagedResponse<GetFeatureFlagsResponseDto>> {
    return this.queryBus.execute(
      new GetFeatureFlagsQuery(query.skip, query.limit),
    );
  }
}
