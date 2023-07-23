import { Controller, Get, Query, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetFeatureFlagsForConfigurationRevisionResponseDto } from './get-feature-flags-for-configuration-revision.response.dto';
import { GetFeatureFlagsForConfigurationRevisionRequestQueryDto } from './get-feature-flags-for-configuration-revision.request.query.dto';
import { GetFeatureFlagsForConfigurationRevisionRequestParamsDto } from './get-feature-flags-for-configuration-revision.request.params.dto';
import { GetFeatureFlagsForConfigurationRevisionQuery } from './get-feature-flags-for-configuration-revision.query';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';

@Controller(':configurationId/revisions/:revisionId/feature-flags')
export class GetFeatureFlagsForConfigurationRevisionController {
  constructor(private queryBus: QueryBus) {}

  @SecurityAttributes(
    SecurityAttribute.ConfigurationRevisionsRead,
    SecurityAttribute.FeatureFlagsRead,
  )
  @Get()
  async getFeatureFlagsForConfigurationRevision(
    @Query() query: GetFeatureFlagsForConfigurationRevisionRequestQueryDto,
    @Param() params: GetFeatureFlagsForConfigurationRevisionRequestParamsDto,
  ): Promise<
    PagedResponse<GetFeatureFlagsForConfigurationRevisionResponseDto>
  > {
    return this.queryBus.execute(
      new GetFeatureFlagsForConfigurationRevisionQuery(
        params.configurationId,
        params.revisionId,
        query.skip,
        query.limit,
      ),
    );
  }
}
