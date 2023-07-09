import { Controller, Get, Query, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetVersionTagsForFeatureFlagResponseDto } from './get-version-tags-for-feature-flag.response.dto';
import { GetVersionTagsForFeatureFlagRequestQueryDto } from './get-version-tags-for-feature-flag.request.query.dto';
import { GetVersionTagsForFeatureFlagRequestParamsDto } from './get-version-tags-for-feature-flag.request.params.dto';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { GetVersionTagsForFeatureFlagQuery } from './get-version-tags-for-feature-flag.query';

@Controller(':flagId/version-tags')
export class GetVersionTagsForFeatureFlagController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getVersionTagsForFeatureFlag(
    @Query() query: GetVersionTagsForFeatureFlagRequestQueryDto,
    @Param() params: GetVersionTagsForFeatureFlagRequestParamsDto,
  ): Promise<PagedResponse<GetVersionTagsForFeatureFlagResponseDto>> {
    return this.queryBus.execute(
      new GetVersionTagsForFeatureFlagQuery(
        params.flagId,
        query.skip,
        query.limit,
      ),
    );
  }
}
