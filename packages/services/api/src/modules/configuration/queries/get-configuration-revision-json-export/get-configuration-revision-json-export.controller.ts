import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetConfigurationRevisionJsonExportResponseDto } from './get-configuration-revision-json-export.response.dto';
import { GetConfigurationRevisionJsonExportRequestParamsDto } from './get-configuration-revision-json-export.request.params.dto';
import { GetConfigurationRevisionJsonExportQuery } from './get-configuration-revision-json-export.query';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';

@Controller(':configurationId/revisions/:revisionId/json-export')
export class GetConfigurationRevisionJsonExportController {
  constructor(private queryBus: QueryBus) {}

  @SecurityAttributes(
    SecurityAttribute.ConfigurationRevisionsRead,
    SecurityAttribute.FeatureFlagsRead,
  )
  @Get()
  async getConfigurationRevisionJsonExport(
    @Param() params: GetConfigurationRevisionJsonExportRequestParamsDto,
  ): Promise<GetConfigurationRevisionJsonExportResponseDto> {
    return this.queryBus.execute(
      new GetConfigurationRevisionJsonExportQuery(
        params.configurationId,
        params.revisionId,
      ),
    );
  }
}
