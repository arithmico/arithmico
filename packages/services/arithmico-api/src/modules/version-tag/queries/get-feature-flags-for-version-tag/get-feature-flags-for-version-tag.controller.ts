import { Controller, Get, Query, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetFeatureFlagsForVersionTagResponseDto } from './get-feature-flags-for-version-tag.response.dto';
import { GetFeatureFlagsForVersionTagRequestQueryDto } from './get-feature-flags-for-version-tag.request.query.dto';
import { GetFeatureFlagsForVersionTagRequestParamsDto } from './get-feature-flags-for-version-tag.request.params.dto';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { GetFeatureFlagsForVersionTagQuery } from './get-feature-flags-for-version-tag.query';

@Controller(':tagId/feature-flags')
export class GetFeatureFlagsForVersionTagController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getFeatureFlagsForVersionTag(
    @Query() query: GetFeatureFlagsForVersionTagRequestQueryDto,
    @Param() params: GetFeatureFlagsForVersionTagRequestParamsDto,
  ): Promise<PagedResponse<GetFeatureFlagsForVersionTagResponseDto>> {
    return this.queryBus.execute(
      new GetFeatureFlagsForVersionTagQuery(
        params.tagId,
        query.skip,
        query.limit,
      ),
    );
  }
}
