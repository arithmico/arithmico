import { Controller, Get, Query, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetConfigurationRevisionsResponseDto } from './get-configuration-revisions.response.dto';
import { GetConfigurationRevisionsRequestQueryDto } from './get-configuration-revisions.request.query.dto';
import { GetConfigurationRevisionsRequestParamsDto } from './get-configuration-revisions.request.params.dto';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { GetConfigurationRevisionsQuery } from './get-configuration-revisions.query';
import { PagedResponse } from '../../../../common/types/paged-response.dto';

@Controller(':configurationId/revisions')
export class GetConfigurationRevisionsController {
  constructor(private queryBus: QueryBus) {}

  @SecurityAttributes(SecurityAttribute.ConfigurationRevisionsRead)
  @Get()
  async getConfigurationRevisions(
    @Query() query: GetConfigurationRevisionsRequestQueryDto,
    @Param() params: GetConfigurationRevisionsRequestParamsDto,
  ): Promise<PagedResponse<GetConfigurationRevisionsResponseDto>> {
    return this.queryBus.execute(
      new GetConfigurationRevisionsQuery(
        query.skip,
        query.limit,
        params.configurationId,
      ),
    );
  }
}
