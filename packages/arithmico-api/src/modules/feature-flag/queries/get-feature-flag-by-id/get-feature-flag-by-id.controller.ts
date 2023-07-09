import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetFeatureFlagByIdResponseDto } from './get-feature-flag-by-id.response.dto';
import { GetFeatureFlagByIdRequestParamsDto } from './get-feature-flag-by-id.request.params.dto';
import { GetFeatureFlagByIdQuery } from './get-feature-flag-by-id.query';

@Controller(':flagId')
export class GetFeatureFlagByIdController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getFeatureFlalgById(
    @Param() params: GetFeatureFlagByIdRequestParamsDto,
  ): Promise<GetFeatureFlagByIdResponseDto> {
    return this.queryBus.execute(new GetFeatureFlagByIdQuery(params.flagId));
  }
}
