import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetConfigurationRevisionByIdResponseDto } from './get-configuration-revision-by-id.response.dto';
import { GetConfigurationRevisionByIdRequestParamsDto } from './get-configuration-revision-by-id.request.params.dto';
import { GetConfigurationRevisionByIdQuery } from './get-configuration-revision-by-id.query';

@Controller(':configurationId/revisions/:revisionId')
export class GetConfigurationRevisionByIdController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getConfigurationRevisionById(
    @Param() params: GetConfigurationRevisionByIdRequestParamsDto,
  ): Promise<GetConfigurationRevisionByIdResponseDto> {
    return this.queryBus.execute(
      new GetConfigurationRevisionByIdQuery(
        params.configurationId,
        params.revisionId,
      ),
    );
  }
}
