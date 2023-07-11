import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetFeatureFlagsResponseDto } from './get-feature-flags.response.dto';
import { GetFeatureFlagsRequestQueryDto } from './get-feature-flags.request.query.dto';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { GetFeatureFlagsQuery } from './get-feature-flags.query';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';

@Controller()
export class GetFeatureFlagsController {
  constructor(private queryBus: QueryBus) {}

  @SecurityAttributes(SecurityAttribute.FeatureFlagsRead)
  @Get()
  async getFeatureFlags(
    @Query() query: GetFeatureFlagsRequestQueryDto,
  ): Promise<PagedResponse<GetFeatureFlagsResponseDto>> {
    return this.queryBus.execute(
      new GetFeatureFlagsQuery(query.skip, query.limit),
    );
  }
}
