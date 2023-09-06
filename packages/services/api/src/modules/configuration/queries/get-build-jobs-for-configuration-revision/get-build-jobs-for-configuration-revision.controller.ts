import { Controller, Get, Query, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetBuildJobsForConfigurationRevisionResponseDto } from './get-build-jobs-for-configuration-revision.response.dto';
import { GetBuildJobsForConfigurationRevisionRequestQueryDto } from './get-build-jobs-for-configuration-revision.request.query.dto';
import { GetBuildJobsForConfigurationRevisionRequestParamsDto } from './get-build-jobs-for-configuration-revision.request.params.dto';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { GetBuildJobsForConfigurationRevisionQuery } from './get-build-jobs-for-configuration-revision.query';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';

@Controller(':configurationId/configurationRevisions/:revisionId/build-jobs')
export class GetBuildJobsForConfigurationRevisionController {
  constructor(private queryBus: QueryBus) {}

  @SecurityAttributes(
    SecurityAttribute.BuildJobRead,
    SecurityAttribute.ConfigurationRevisionsRead,
  )
  @Get()
  async getBuildJobsForConfigurationRevision(
    @Query() query: GetBuildJobsForConfigurationRevisionRequestQueryDto,
    @Param() params: GetBuildJobsForConfigurationRevisionRequestParamsDto,
  ): Promise<PagedResponse<GetBuildJobsForConfigurationRevisionResponseDto>> {
    return this.queryBus.execute(
      new GetBuildJobsForConfigurationRevisionQuery(
        params.configurationId,
        params.configurationRevisionId,
        query.skip,
        query.limit,
      ),
    );
  }
}
