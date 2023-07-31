import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetVersionTagsResponseDto } from './get-version-tags.response.dto';
import { GetVersionTagsRequestQueryDto } from './get-version-tags.request.query.dto';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { GetVersionTagsQuery } from './get-version-tags.query';

@Controller()
export class GetVersionTagsController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getVersionTags(
    @Query() query: GetVersionTagsRequestQueryDto,
  ): Promise<PagedResponse<GetVersionTagsResponseDto>> {
    return this.queryBus.execute(
      new GetVersionTagsQuery(query.skip, query.limit),
    );
  }
}
