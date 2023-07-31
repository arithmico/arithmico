import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetLatestConfigurationRevisionFeatureFlagIdsResponseDto } from './get-latest-configuration-revision-feature-flag-ids.response.dto';
import { GetLatestConfigurationRevisionFeatureFlagIdsRequestParamsDto } from './get-latest-configuration-revision-feature-flag-ids.request.params.dto';
import { GetLatestConfigurationRevisionFeatureFlagIdsQuery } from './get-latest-configuration-revision-feature-flag-ids.query';

@Controller(':configurationId/revisions/latest/feature-flag-ids')
export class GetLatestConfigurationRevisionFeatureFlagIdsController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getLatestConfigurationRevisionFeatureFlagIds(
    @Param()
    params: GetLatestConfigurationRevisionFeatureFlagIdsRequestParamsDto,
  ): Promise<GetLatestConfigurationRevisionFeatureFlagIdsResponseDto> {
    return this.queryBus.execute(
      new GetLatestConfigurationRevisionFeatureFlagIdsQuery(
        params.configurationId,
      ),
    );
  }
}
