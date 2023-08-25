import { Controller, Get, Query, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAvailableVersionTagsForConfigurationRevisionResponseDto } from './get-available-version-tags-for-configuration-revision.response.dto';
import { GetAvailableVersionTagsForConfigurationRevisionRequestQueryDto } from './get-available-version-tags-for-configuration-revision.request.query.dto';
import { GetAvailableVersionTagsForConfigurationRevisionRequestParamsDto } from './get-available-version-tags-for-configuration-revision.request.params.dto';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { GetAvailableVersionTagsForConfigurationRevisionQuery } from './get-available-version-tags-for-configuration-revision.query';

@Controller(
  ':configurationId/revisions/:configurationRevisionId/available-version-tags',
)
export class GetAvailableVersionTagsForConfigurationRevisionController {
  constructor(private queryBus: QueryBus) {}

  @SecurityAttributes(
    SecurityAttribute.VersionTagsRead,
    SecurityAttribute.ConfigurationRevisionsRead,
  )
  @Get()
  async getAvailableVersionTagsForConfigurationRevision(
    @Query()
    query: GetAvailableVersionTagsForConfigurationRevisionRequestQueryDto,
    @Param()
    params: GetAvailableVersionTagsForConfigurationRevisionRequestParamsDto,
  ): Promise<
    PagedResponse<GetAvailableVersionTagsForConfigurationRevisionResponseDto>
  > {
    return this.queryBus.execute(
      new GetAvailableVersionTagsForConfigurationRevisionQuery(
        query.skip,
        query.limit,
        params.configurationId,
        params.configurationRevisionId,
      ),
    );
  }
}
